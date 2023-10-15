import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const openAIApiKey = process.env.OPENAI_API_KEY;
if (!openAIApiKey) throw new Error(`Expected env var OPENAI_API_KEY`);

const privateKey = process.env.SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

export const storeVectorData = async () => {
  const client = createClient(url, privateKey);

  console.log("pdf loading...");
  const loader = new PDFLoader("docs/the_ayurveda_encyclopedia.pdf");
  const docs = await loader.load();

  const embeddings = new OpenAIEmbeddings({ openAIApiKey });

  console.log("vector storing...");
  const vectorStore = await SupabaseVectorStore.fromDocuments(
    docs,
    embeddings,
    {
      client,
      tableName: "ayurveda",
      queryName: "match_documents",
    }
  );

  console.log("getting result");
  const result = await vectorStore.similaritySearch("what is ayurveda?");

  console.log("result", result);
};

// in the route.ts
// console.log("function called");
//     await storeVectorData();
//     console.log("process completed");
