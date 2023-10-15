import { callChain } from "@/lib/getChat";
import { NextRequest, NextResponse } from "next/server";
import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  LangChainStream,
  experimental_StreamData,
  Message,
} from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { createClient } from "@supabase/supabase-js";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { storeVectorData } from "@/lib/storeVectorData";

const QA_TEMPLATE = `You are an enthusiastic AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {question}
Helpful answer in markdown:`;

const STANDALONE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const fasterModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  verbose: true,
  maxTokens: 2000,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // init envs
    const privateKey = process.env.SUPABASE_PRIVATE_KEY;
    if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

    const url = process.env.SUPABASE_URL;
    if (!url) throw new Error(`Expected env var SUPABASE_URL`);

    console.log("route called");

    const body = await req.json();
    const messages: Message[] = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const question = messages[messages.length - 1].content;

    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });

    const data = new experimental_StreamData();
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      verbose: true,
      streaming: true,
      maxTokens: 2000,
    });

    const client = createClient(url, privateKey);

    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        verbose: true,
      }),
      {
        client,
        tableName: "ayurveda",
        queryName: "match_documents",
      }
    );

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_TEMPLATE,
        questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
        questionGeneratorChainOptions: {
          llm: fasterModel,
        },
      }
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
        data.append({
          response: res,
        });
        data.close();
      });

    return new StreamingTextResponse(stream, {}, data);
  } catch (e) {
    console.error(e);
    throw new Error("Call chain method failed to execute successfully!!");
  }
}
