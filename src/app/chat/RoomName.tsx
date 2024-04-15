"use client";

import { cn } from "@/lib/cn";
import { Room } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiTrash, BiEdit, BiSave } from "react-icons/bi";
import { editChat } from "../actions/editChat";
import { deleteChat } from "../actions/deleteChat";
import { TailSpin } from "react-loader-spinner";

export default function RoomList({ room }: { room: Room }) {
  const [editChatId, setEditChatId] = useState<string | null>(null);
  const [isHoverd, setIsHoverd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(room.name);
  const pathname = usePathname();

  const splitPath = pathname.split("/");

  let activeRoomId = "";
  if (splitPath.length > 2) {
    activeRoomId = splitPath[2];
  }

  async function handleSave(e: any) {
    e.preventDefault();

    if (!name) return;

    setLoading(true);

    await editChat({ id: editChatId!, name });

    setLoading(false);
    setEditChatId(null);
  }

  async function handleDelete() {
    setLoading(true);
    await deleteChat(room.id);
    setLoading(false);
  }

  return (
    <div
      className={cn(
        "mt-2 flex w-[260px] cursor-pointer items-center justify-between rounded-md px-5 py-3 transition-colors duration-200 ease-in-out hover:bg-slate-800",
        { "bg-slate-800": room.id === activeRoomId },
      )}
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
    >
      {editChatId ? (
        <form className="flex items-center gap-3" onSubmit={handleSave}>
          <input
            type="text"
            className="w-[190px] rounded-sm border border-slate-500 bg-transparent p-1 text-white focus:outline-none"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="text-xl">
            {loading ? (
              <TailSpin width={20} height={20} color="white" />
            ) : (
              <BiSave />
            )}
          </button>
        </form>
      ) : (
        <Link href={`/chat/${room.id}`}>
          {room.name.length > 20 ? room.name.slice(0, 20) + "..." : room.name}
        </Link>
      )}

      {!editChatId && isHoverd && (
        <div className="flex items-center gap-2">
          <button onClick={() => setEditChatId(room.id)}>
            <BiEdit />
          </button>
          <button onClick={handleDelete}>
            {loading ? (
              <TailSpin width={20} height={20} color="red" />
            ) : (
              <BiTrash color="red" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
