"use client";

import { useState } from "react";
import { newRoom } from "../actions/newRoom";
import { ThreeDots } from "react-loader-spinner";

export default function CreateRoomButton() {
  const [loading, setLoading] = useState(false);

  async function handler(e: any) {
    e.preventDefault();
    setLoading(true);

    await newRoom();

    setLoading(false);
  }

  return (
    <button
      className="mt-5 flex h-10 w-full items-center justify-center rounded-md bg-slate-800 text-white transition-colors duration-200 ease-in-out hover:bg-slate-700 active:scale-95"
      onClick={handler}
    >
      {loading ? (
        <ThreeDots color="#ffffff" height={30} width={30} />
      ) : (
        "Create Room"
      )}
    </button>
  );
}
