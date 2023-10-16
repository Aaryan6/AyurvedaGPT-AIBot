"use client";
import InputBox from "./ChatSection/InputBox";
import Chats from "./ChatSection/Chats";
import { useChat } from "ai/react";

import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ChatBox = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({});

  return (
    <section className="flex-1 sm:pt-4 sm:pb-8 sm:px-4">
      <div className="bg-light dark:bg-secondary relative sm:mx-auto w-full sm:rounded-xl p-4 pt-2 sm:px-10 py-8 flex flex-col justify-end h-full">
        {messages?.length <= 0 && (
          <div className="mt-16">
            <h3
              className={`${outfit.className} text-center font-semibold tracking-wide text-4xl text-gray-800 dark:text-gray-200`}
            >
              Ayurveda GPT
            </h3>
            <p className="text-center mt-5 text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
              Experience the wisdom of Ayurveda in the modern world as
              AyurvedaGPT guides you on your path to a healthier and more
              balanced life through friendly and informative conversations.
            </p>
          </div>
        )}
        <div className={`flex flex-col justify-end w-full`}>
          <Chats messages={messages} error={error} />
          <InputBox
            isLoading={isLoading}
            input={input}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
