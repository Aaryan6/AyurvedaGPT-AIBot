import { scrollToBottom } from "@/lib/scrollToBottom";
import { Sparkle } from "lucide-react";

interface DisplayContentProps {
  answer: string;
  loading: boolean;
}

const DisplayContent = ({ messages, error }: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  return (
    <div
      className={`${
        messages?.length <= 0
          ? "h-[calc(100vh-21rem)]"
          : "h-[calc(100vh-15rem)]"
      } overflow-y-scroll scrolldiv`}
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
          } text-secondar dark:text-lowlight px-3 py-2 rounded-md my-2 w-full`}
        >
          {mess.role === "user" ? (
            <div className="flex items-start gap-x-3">
              <User />
              <p className="pt-2 text-secondary dark:text-light">
                {mess.content}
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-x-3">
              <Robot />
              <p className="whitespace-pre-wrap leading-relaxed text-secondary dark:text-light pt-2 flex-1">
                {mess.content.trimStart()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayContent;

import { User as UserIcon } from "lucide-react";
import { useEffect, useRef } from "react";

const User = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lowlight text-primary dark:bg-primary dark:text-white">
      <UserIcon size={24} />
    </div>
  );
};

const Robot = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-lowlight text-primary dark:bg-primary dark:text-white">
      <Sparkle size={24} />
    </div>
  );
};
