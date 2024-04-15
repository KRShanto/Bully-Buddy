import React from "react";
import { Iceberg } from "next/font/google";
import { auth } from "../auth";
import SuggestionButton from "./SuggestionButton";
import { IoSend } from "react-icons/io5";
import ChatInput from "./ChatInput";
import { newChat } from "../actions/newChat";

const iceberg = Iceberg({
  subsets: ["latin"],
  weight: "400",
});

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex h-screen flex-col items-center justify-end py-10">
      <h1 className="text-5xl font-bold" style={iceberg.style}>
        Welcome to{" "}
        <span className="yellow-gradient" style={iceberg.style}>
          Bully Buddy
        </span>
      </h1>

      <h2 className="mt-5 text-xl font-semibold text-slate-300">
        Hey <span className="font-bold text-white">{session?.user?.name}</span>,
        what&apos;s on your mind today?
      </h2>

      <div className="mt-14 grid grid-cols-2 gap-6">
        <SuggestionButton text="I feel so lonely" />
        <SuggestionButton text="Hey buddy, I need help" />
        <SuggestionButton text="What's the capital of Bangladesh?" />
        <SuggestionButton text="I need someone to talk to" />
        <SuggestionButton text="What you know about AI?" />
        <SuggestionButton text="I want to learn something new" />
      </div>

      <ChatInput action={newChat} />
    </div>
  );
}
