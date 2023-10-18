import { NextRequest, NextResponse } from "next/server";
import { Message } from "ai";
import { callChain } from "@/lib/langchain";

export const runtime = "edge";

const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const messages: Message[] = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;

  try {
    const streamingTextResponse = callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
    });

    return streamingTextResponse;
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
}
