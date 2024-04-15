import React from "react";
import { newChat } from "../actions/newChat";

export default function SuggestionButton({ text }: { text: string }) {
  return (
    <form
      action={newChat}
      className="rounded-md border border-slate-700 text-lg text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
    >
      <input type="hidden" name="text" value={text} />
      <button className="h-full w-full rounded-md px-5 py-3">{text}</button>
    </form>
  );
}
