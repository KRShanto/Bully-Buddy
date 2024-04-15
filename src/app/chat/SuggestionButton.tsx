import React from "react";

export default function SuggestionButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="rounded-md border border-slate-700 px-5 py-3 text-lg text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
      {children}
    </button>
  );
}
