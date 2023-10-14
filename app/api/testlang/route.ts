import { chain } from "@/lib/getChat";
import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

export const runtime = "edge";

const model = new ChatOpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.
 
Current conversation:
{chat_history}
 
User: {input}
AI:`;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    console.table(body, messages);

    const stream = await (
      await chain
    ).stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }

  // try {
  //   const res = await chain.call({
  //     question: question,
  //     chat_history: [],
  //   });
  //   // const result = await getChat(question);
  // return NextResponse.json({ result: res, status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ message: "Not getting result", status: 404 });
  // }
}
