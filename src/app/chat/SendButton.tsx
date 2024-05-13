"use client";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import { newChat } from "../actions/newChat";
import { useFormStatus } from "react-dom";

export default function SendButton() {
  const { pending } = useFormStatus();

  const handleSubmit = async (data: FormData) => {
    const text = data.get("text") as string;

    if (!text) return;

    await newChat(data);
  };

  return (
    <button
      className="absolute right-3 text-3xl text-slate-300 hover:text-slate-500"
      formAction={handleSubmit}
    >
      {pending ? (
        <ThreeDots color="#d1d5db" height={30} width={30} />
      ) : (
        <IoSend />
      )}
    </button>
  );
}
