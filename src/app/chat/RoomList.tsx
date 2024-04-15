"use client";

import { cn } from "@/lib/cn";
import { Room } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RoomList({ rooms }: { rooms: Room[] }) {
  const pathname = usePathname();

  console.log(pathname);

  const splitPath = pathname.split("/");
  console.log(splitPath);

  let activeRoomId = "";

  if (splitPath.length > 2) {
    activeRoomId = splitPath[2];
  }

  return (
    <div className="mt-3 flex flex-col">
      {rooms.map((room) => (
        <Link
          key={room.id}
          className={cn(
            "mt-2 rounded-md px-5 py-3 transition-colors duration-200 ease-in-out hover:bg-slate-800",
            { "bg-slate-800": room.id === activeRoomId },
          )}
          href={`/chat/${room.id}`}
        >
          {room.name}
        </Link>
      ))}
    </div>
  );
}
