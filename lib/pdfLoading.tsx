import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const privateKey = process.env.SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const client = createClient(url, privateKey);

export default async function PDFLoading() {
  const loader = new PDFLoader("../docs/life.pdf", {
    splitPages: false,
  });
  const docs = await loader.load();

  const vectorStore = await SupabaseVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings(),
    {
      client,
      tableName: "life",
      queryName: "",
    }
  );

  return;
}
