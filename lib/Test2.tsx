import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ConversationalRetrievalQAChain,
  RetrievalQAChain,
  loadQARefineChain,
} from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BufferMemory } from "langchain/memory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const fasterModel = new ChatOpenAI({
  modelName: "text-embedding-ada-002",
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
if (!openAIApiKey) throw new Error(`Expected env var OPENAI_API_KEY`);

export async function Run() {
  const privateKey = process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY;
  if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error(`Expected env var SUPABASE_URL`);

  console.log("start");
  const loader = new PDFLoader("docs/short.pdf");
  console.log("pdf loading...");
  const docs = await loader.load();
  const client = createClient(url, privateKey);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  console.log("splitting doc...");
  try {
    const chain = loadQARefineChain(fasterModel);
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey,
      modelName: "text-embedding-ada-002",
    });

    // const chunkedDocs = await textSplitter.splitDocuments(docs);
    // const store = new SupabaseVectorStore(embeddings, {
    //   client,
    //   tableName: "documents",
    // });

    console.log("making chain...");
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

    const question = "What is life?";
    // const relevantDocs = await store.similaritySearch(question);

    // Call the chain
    const res = await chain.call({
      input_documents: store.asRetriever(),
      question,
    });

    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}
