import React from "react";
import { Iceberg } from "next/font/google";
import { auth } from "../auth";
import SuggestionButton from "./SuggestionButton";
import { IoSend } from "react-icons/io5";
import { newChat } from "../actions/newChat";
import Logo from "@/components/Logo";
import SendButton from "./SendButton";

const iceberg = Iceberg({
  subsets: ["latin"],
  weight: "400",
});

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex h-screen flex-col items-center justify-end py-10">
      {/* Header */}
      <h1
        className="flex items-center gap-4 text-5xl font-bold"
        style={iceberg.style}
      >
        Welcome to <Logo width={70} />
      </h1>

      {/* Subheader */}
      <h2 className="mt-5 text-xl font-semibold text-slate-300">
        Hey <span className="font-bold text-white">{session?.user?.name}</span>,
        what&apos;s on your mind today?
      </h2>

      {/* Suggestions */}
      <div className="mt-14 grid grid-cols-2 gap-6">
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
          className="w-[700px] rounded-md border border-slate-500 bg-transparent px-5 py-3 pr-20 text-xl text-slate-300 focus:border-slate-700 focus:outline-none"
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
