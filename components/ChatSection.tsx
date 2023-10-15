"use client";
import SearchBox from "./ContentSection/SearchBox";
import DisplayContent from "./ContentSection/DisplayContent";
import { useChat } from "ai/react";

const ChatSection = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({});

  return (
    <section className="flex-1 sm:pt-4 sm:pb-8 sm:px-4">
      <div className="bg-light dark:bg-secondary relative sm:mx-auto w-full sm:rounded-xl p-4 pt-2 sm:px-10 py-8 flex flex-col justify-between">
        {messages?.length <= 0 && (
          <div className="mt-10">
            <h3 className="text-center uppercase font-semibold text-2xl text-primary dark:text-light">
              Ayurveda GPT
            </h3>
            <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
              Unlocking Ayurvedic Wisdom through AI-Powered Insights.
            </p>
          </div>
        )}
        <div className={`flex flex-col justify-end w-full`}>
          <DisplayContent messages={messages} error={error} />
          <SearchBox
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

export default ChatSection;
