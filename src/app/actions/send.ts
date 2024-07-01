"use server";

import { db } from "@/lib/db";
import { openAISend } from "./openAISend";
import { auth } from "../auth";

export async function send({ text, roomId }: { text: string; roomId: string }) {
  const session = await auth();
  // Get other messages from the room
  const messages = await db.message.findMany({
    where: { roomId },
    orderBy: { createdAt: "asc" },
    select: { role: true, content: true },
  });

  // convert messages.role to lowercase
  const newMessages = messages.map((message) => {
    return {
      role: message.role.toLowerCase(),
      content: message.content,
    };
  });

  // Add the new message to the list
  newMessages.push({
    role: "user",
    content: text,
  });

  // Send the messages to OpenAI
  // @ts-ignore
  const resText = (await openAISend(newMessages)) as string;

  // Save the new message to the database
  await db.message.createMany({
    data: [
      {
        content: text,
        role: "USER",
        roomId,
        userId: session?.user?.id as string,
      },
      {
        content: resText,
        role: "ASSISTANT",
        roomId,
        userId: session?.user?.id as string, // NOTE: it doesn't matter
      },
    ],
  });

  return resText;
}
