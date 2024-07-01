"use client";

import { useFormStatus } from "react-dom";
import { newChat } from "../actions/newChat";
import { ThreeDots } from "react-loader-spinner";

export default function SuggestionButton({ text }: { text: string }) {
  return (
    <form
      action={newChat}
      className="rounded-md border border-slate-700 text-lg text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
    >
      <input type="hidden" name="text" value={text} />
      <SuggestionSubmitButton text={text} />
    </form>
  );
}

function SuggestionSubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button className="flex h-full w-full justify-center rounded-md px-5 py-3">
      {pending ? (
        <ThreeDots color="#d1d5db" height={30} width={30} />
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
}
