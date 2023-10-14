import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { NextRequest, NextResponse } from "next/server";
import { HNSWLib } from "langchain/vectorstores/hnswlib";

// First, follow set-up instructions at
// https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase

const openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
if (!openAIApiKey) throw new Error(`Expected env var OPENAI_API_KEY`);

const privateKey = process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const client = createClient(url, privateKey);

const loader = new PDFLoader("docs/short.pdf");

const embeddings = new OpenAIEmbeddings({
  openAIApiKey,
  modelName: "text-embedding-ada-002",
});

const store = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
});

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const result = await store.asRetriever();
    return NextResponse.json({ result: result, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Not getting result", status: 404 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const docs = await loader.load();
  const ids = await store.addDocuments(docs);

  const vectorStore = await SupabaseVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey, modelName: "text-embedding-ada-002" }),
    {
      client,
      tableName: "documents",
    }
  );

  // try {
  //   const result = await store.similaritySearch("hello");
  //   return NextResponse.json({ result: result, status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ message: "Not getting result", status: 404 });
  // }
}
