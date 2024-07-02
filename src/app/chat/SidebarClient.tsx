"use client";

import RoomName from "./RoomName";
import CreateRoomButton from "./CreateRoomButton";
import { useEffect, useRef, useState } from "react";
import { LuPanelRightOpen } from "react-icons/lu";
import { LuPanelLeftOpen } from "react-icons/lu";
import { useMediaQuery } from "react-responsive";
import { Room } from "@prisma/client";
import { cn } from "@/lib/cn";

export default function SidebarClient({ rooms }: { rooms: Room[] }) {
  const [isOpen, setIsOpen] = useState(true);
  const is1100px = useMediaQuery({ query: "(max-width: 1100px)" });

  useEffect(() => {
    if (is1100px) {
      setIsOpen(false);
    }
  }, [is1100px]);

  return (
    <div
      className={cn(
        "z-10 h-screen border-r border-slate-800 bg-slate-950",
        isOpen ? "w-80 p-10" : "w-14",
        is1100px ? "absolute" : "relative",
      )}
    >
      {/* Sidebar toggle button */}
      <button
        className="absolute right-3 top-3 text-slate-500 transition-colors hover:text-slate-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <LuPanelLeftOpen size={30} />
        ) : (
          <LuPanelRightOpen size={30} />
        )}
      </button>

      {isOpen && (
        <>
          <CreateRoomButton />

          {/* Sidebar Content */}
          <div className="mt-5">
            <h3 className="font-bold uppercase text-slate-500">
              Previous Chats
            </h3>
            <div className="mt-3 flex flex-col">
              {rooms.map((room) => (
                <RoomName room={room} key={room.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
