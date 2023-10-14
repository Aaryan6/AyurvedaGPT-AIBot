"use client";

import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({});

  return (
    <main className="flex min-h-screen flex-col items-center p-24 text-white">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask question..."
          value={input}
          onChange={handleInputChange}
          className="border-2 border-white px-4 py-1.5 bg-transparent text-white"
        />
        <button type="submit" className="text-black bg-white py-2 px-6 mt-5">
          Test
        </button>
      </form>
      <div className="max-w-4xl mx-auto mt-20">
        {messages.map((m) => (
          <div key={m.id}>
            {m.role}: {m.content}
          </div>
        ))}
      </div>
    </main>
  );
}
