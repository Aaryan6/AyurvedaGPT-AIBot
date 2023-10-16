import { scrollToBottom } from "@/lib/scrollToBottom";
import { Message } from "ai";
import { useEffect, useRef } from "react";
import { Robot, User } from "../Avatars";

interface ChatsProps {
  messages: Message[];
  error: any;
}

const Chats = ({ messages, error }: ChatsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  return (
    <div
      className={`${
        messages?.length <= 0
          ? "h-[calc(100vh-28rem)]"
          : "h-[calc(100vh-12rem)] sm:h-[calc(100vh-17rem)]"
      } overflow-y-scroll scrolldiv flex flex-col`}
      ref={containerRef}
    >
      <p className="text-red-400">{error}</p>
      {messages?.map((mess: any) => (
        <div
          key={mess.id}
          className={`${
            mess.role === "user"
              ? "bg-transparent"
              : "bg-lowlight dark:bg-primary"
          } text-secondar dark:text-lowlight px-3 py-3 rounded-md my-1 w-full`}
        >
          {mess.role === "user" ? (
            <div className="flex items-start gap-x-3">
              <User />
              <p className="pt-2 text-gray-900 dark:text-gray-300">
                {mess.content}
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-x-3 py-2">
              <Robot />
              <p className="whitespace-pre-wrap leading-relaxed text-gray-900 dark:text-gray-300 pt-2 flex-1">
                {mess.content.trimStart()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chats;
