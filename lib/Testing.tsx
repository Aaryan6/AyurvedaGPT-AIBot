import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

// First, follow set-up instructions at
// https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase

const openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
if (!openAIApiKey) throw new Error(`Expected env var OPENAI_API_KEY`);

const privateKey = process.env.NEXT_PUBLIC_SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

export const Run = async () => {
  const client = createClient(url, privateKey);

  const loader = new PDFLoader("docs/short.pdf");
  const docs = await loader.load();

  const embeddings = new OpenAIEmbeddings({ openAIApiKey });

  const store = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
  });

  // Also takes an additional {ids: []} parameter for upsertion
  //    const ids = await store.addDocuments(docs);

  //   const vectorStore = await SupabaseVectorStore.fromDocuments(
  //     docs,
  //     new OpenAIEmbeddings({ openAIApiKey }),
  //     {
  //       client,
  //       tableName: "documents",
  //       queryName: "match_documents",
  //     }
  //   );

  const resultA = store.asRetriever();
  console.log(resultA);

  //   const resultOne = await vectorStore.similaritySearch("Hello world", 1);

  //   console.log(resultOne);
};
