import { createClient } from "@supabase/supabase-js";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";

import {
  LangChainStream,
  StreamingTextResponse,
  experimental_StreamData,
} from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { QA_TEMPLATE, STANDALONE_QUESTION_TEMPLATE } from "./prompt-templates";

const gptModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
  verbose: true,
});

export async function callChain({ question, chatHistory }: any) {
  try {
    const privateKey = process.env.SUPABASE_PRIVATE_KEY;
    if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

    const url = process.env.SUPABASE_URL;
    if (!url) throw new Error(`Expected env var SUPABASE_URL`);

    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });

    const data = new experimental_StreamData();
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      verbose: true,
      streaming: true,
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
        queryName: "match_doc",
      }
    );

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_TEMPLATE,
        questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
        questionGeneratorChainOptions: {
          llm: gptModel,
        },
      }
    );

    chain
      .call(
        {
          question: sanitizedQuestion,
          chat_history: chatHistory,
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
