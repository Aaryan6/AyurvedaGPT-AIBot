import { createClient } from "@supabase/supabase-js";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import {
  StreamingTextResponse,
  experimental_StreamData,
  LangChainStream,
} from "ai";

type callChainArgs = {
  question: string;
  chatHistory: string;
};

export async function callChain({ question, chatHistory }: callChainArgs) {
  console.log("function called");
  try {
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const privateKey = process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY;
    if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url) throw new Error(`Expected env var SUPABASE_URL`);

    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });

    const model = new ChatOpenAI({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const client = createClient(url, privateKey);

    const data = new experimental_StreamData();

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

    chain.call(
      {
        question: sanitizedQuestion,
        chat_history: chatHistory,
      },
      [handlers]
    );

    // Return the readable stream
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.error(e);
    throw new Error("Call chain method failed to execute successfully!!");
  }
}
