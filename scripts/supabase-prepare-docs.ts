import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";

// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
const openAIApiKey = process.env.OPENAI_API_KEY;
if (!openAIApiKey) throw new Error(`Expected env var OPENAI_API_KEY`);

const privateKey = process.env.SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

const client = createClient(url, privateKey);

(async () => {
  try {
    const embeddings = new OpenAIEmbeddings({ openAIApiKey });

    const store = new SupabaseVectorStore(embeddings, {
      client,
      tableName: "ayurveda",
    });

    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF();

    console.log(`Loading ${docs.length} chunks into supabase...`);
    await store.addDocuments(docs);

    console.log("Data embedded and stored in supabase");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
})();
