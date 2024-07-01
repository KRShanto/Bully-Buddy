"use client";

import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";
import { openAISend } from "../../actions/openAISend";
import { Message, Room, User } from "@prisma/client";
import Image from "next/image";
import BotImage from "@/../public/Bot.png";
import UserImage from "@/../public/User.png";
import { IoSend } from "react-icons/io5";
import { send } from "@/app/actions/send";
import { ThreeDots } from "react-loader-spinner";

export default function Chat({
  user,
  room,
  messages,
}: {
  user: User;
  room: Room;
  messages: Message[];
}) {
  const [messageList, setMessages] =
    useState<{ role: string; content: string }[]>(messages);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const messageBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom
    messageBox.current?.scrollTo({
      top: messageBox.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageList]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!text) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: "USER", content: text }]);
    setText("");

    const res = (await send({ text, roomId: room.id })) as string;

    setMessages((prev) => [...prev, { role: "ASSISTANT", content: res }]);
    setLoading(false);
  }

  return (
    <div className="h-full w-[800px] overflow-hidden">
      <div className="h-[85%] overflow-scroll pb-5" ref={messageBox}>
        {messageList.map((message, index) => (
          <div key={index} className="mt-5">
            <div
              className={cn(
                {
                  "text-yellow-500": message.role === "ASSISTANT",
                  "text-green-500": message.role === "USER",
                },
                "flex items-center gap-2 text-xl font-semibold",
              )}
            >
              <Image
                src={message.role === "ASSISTANT" ? BotImage : UserImage}
                width={40}
                height={40}
                alt={message.role}
                className={cn("rounded-full border", {
                  "border-yellow-500": message.role === "ASSISTANT",
                  "border-green-500": message.role === "USER",
                })}
              />
              {message.role === "ASSISTANT" ? "Bully Buddy" : user.name}
            </div>
            <p className="ml-3 mt-1 text-lg text-slate-300">
              {message.content}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <form className="relative mt-5 flex items-center">
        <input
          type="text"
          className="w-full rounded-md border border-slate-500 bg-transparent px-5 py-3 pr-20 text-xl text-slate-300 focus:border-slate-700 focus:outline-none"
          placeholder="Type your message here..."
          autoFocus
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="absolute right-3 text-3xl text-slate-300 hover:text-slate-500"
          onClick={handleSubmit}
        >
          {loading ? (
            <ThreeDots color="#d1d5db" height={30} width={30} />
          ) : (
            <IoSend />
          )}
        </button>
      </form>
    </div>
  );
}
