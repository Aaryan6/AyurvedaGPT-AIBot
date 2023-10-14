import { callChain } from "@/lib/getChat";
import { NextRequest, NextResponse } from "next/server";
import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  LangChainStream,
  experimental_StreamData,
} from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { createClient } from "@supabase/supabase-js";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";

export const runtime = "edge";
/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // init envs
    const privateKey = process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY;
    if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url) throw new Error(`Expected env var SUPABASE_URL`);

    console.log("route called");

    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const question = messages[messages.length - 1].content;

    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });
    const data = new experimental_StreamData();
    const model = new ChatOpenAI({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const client = createClient(url, privateKey);

    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      }),
      {
        client,
        tableName: "documents",
        queryName: "match_documents",
      }
    );

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever()
    );

    console.log("chain called ");
    chain
      .call(
        {
          question: sanitizedQuestion,
          chat_history: formattedPreviousMessages.join("\n"),
        },
        [handlers]
      )
      .then((res) => {
        console.log("res", res);
        data.append({
          text: res.text,
        });
        data.close();
      });

    return new StreamingTextResponse(stream, {}, data);
  } catch (e) {
    console.error(e);
    throw new Error("Call chain method failed to execute successfully!!");
  }
}

// const streamingTextResponse = callChain({
//   question,
//   chatHistory: formattedPreviousMessages.join("\n"),
// });
