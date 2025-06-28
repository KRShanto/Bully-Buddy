import React from "react";
import Chat from "./Chat";
import { auth } from "@/app/auth";
import { notFound, redirect } from "next/navigation";
import { User } from "@prisma/client";
import Logo from "@/components/Logo";
import { db } from "@/lib/db";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with our AI to start a conversation.",
};

export default async function Page({ params }: { params: { id: string } }) {
  // Get the session
  const session = await auth();

  if (!session || !session.user) redirect("/login");

  // Get the room
  const room = await db.room.findUnique({
    where: { id: params.id },
  });

  if (!room) notFound();

  // Get messages
  const messages = await db.message.findMany({
    where: { roomId: room.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex h-screen flex-col items-center p-5">
      {/* Header */}
      <Link className="text-4xl" href="/">
        <Logo />
      </Link>

      {/* Line */}
      <div className="mt-2 h-[1px] w-[250px] bg-slate-500"></div>

      <Chat user={session.user as User} room={room} messages={messages} />
    </div>
  );
}
