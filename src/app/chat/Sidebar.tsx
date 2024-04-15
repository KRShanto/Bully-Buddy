import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "../auth";
import CreateRoomButton from "./CreateRoomButton";
import RoomName from "./RoomName";

export default async function Sidebar() {
  const session = await auth();

  // Get the rooms
  const rooms = await db.room.findMany({
    where: { users: { some: { id: session?.user?.id } } },
  });

  return (
    <div className="absolute h-screen border-r border-slate-800 bg-slate-950 p-10">
      <CreateRoomButton />

      <div className="mt-5">
        <h3 className="font-bold uppercase text-slate-500">Previous Chats</h3>
        {/* <RoomList rooms={rooms} /> */}
        <div className="mt-3 flex flex-col">
          {rooms.map((room) => (
            <RoomName room={room} key={room.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
