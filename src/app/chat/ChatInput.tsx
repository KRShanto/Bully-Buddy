import React from "react";
import { IoSend } from "react-icons/io5";

export default function ChatInput({
  action,
}: {
  action: (formData: FormData) => void;
}) {
  return (
    <form className="relative mt-20 flex items-center" action={action}>
      <input
        type="text"
        className="w-[700px] rounded-md border border-slate-500 bg-transparent px-5 py-3 pr-20 text-xl text-slate-300 focus:border-slate-700 focus:outline-none"
        placeholder="Type your message here..."
        autoFocus
        name="input"
        id="input"
      />
      <button className="absolute right-3 text-3xl text-slate-300 hover:text-slate-500">
        <IoSend />
      </button>
    </form>
  );
}
