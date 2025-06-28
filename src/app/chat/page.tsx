import React from "react";
import { Iceberg } from "next/font/google";
import { auth } from "../auth";
import SuggestionButton from "./SuggestionButton";
import { newChat } from "../actions/newChat";
import Logo from "@/components/Logo";
import SendButton from "./SendButton";
import { Metadata } from "next";
import ChatPageHeader from "./ChatPageHeader";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with our AI to start a conversation.",
};

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex h-screen flex-col items-center justify-end py-10">
      {/* Header */}
      <ChatPageHeader />

      {/* Subheader */}
      <h2 className="mt-5 text-xl font-semibold text-slate-300 max-[900px]:text-lg max-[600px]:text-base">
        Hey <span className="font-bold text-white">{session?.user?.name}</span>,
        what&apos;s on your mind today?
      </h2>

      {/* Suggestions */}
      <div className="mt-14 grid grid-cols-2 gap-6 max-[900px]:mt-7 max-[900px]:grid-cols-1 max-[600px]:gap-4">
        <SuggestionButton text="I feel so lonely" />
        <SuggestionButton text="Hey buddy, I need help" />
        <SuggestionButton text="What's the capital of Bangladesh?" />
        <SuggestionButton text="I need someone to talk to" />
        <SuggestionButton text="What you know about AI?" />
        <SuggestionButton text="I want to learn something new" />
      </div>

      {/* Input */}
      <form className="relative mt-20 flex items-center" action={newChat}>
        <input
          type="text"
          className="w-[700px] rounded-md border border-slate-500 bg-transparent px-5 py-3 pr-20 text-xl text-slate-300 focus:border-slate-700 focus:outline-none max-[900px]:w-[500px] max-[900px]:px-3 max-[900px]:text-lg max-[600px]:w-[300px] max-[600px]:text-base"
          placeholder="Type your message here..."
          autoFocus
          name="text"
          id="text"
        />

        <SendButton />
      </form>
    </div>
  );
}
