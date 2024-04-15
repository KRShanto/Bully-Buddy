"use server";

import { db } from "@/lib/db";
import { auth } from "../auth";
import moment from "moment";
import { openAISend } from "./openAISend";
import { redirect } from "next/navigation";

// Create a new chat room with the user
// Then save the new chat message and send it to OpenAI
// Then redirect the user to the chat room
// WARNING: This function assumes that the user is logged in
export async function newChat(formData: FormData) {
  const text = formData.get("text") as string;
  const session = await auth();

  // Check if the user has a chat room which was created today
  const previousRooms = await db.room.findMany({
    where: {
      users: {
        some: {
          id: session?.user?.id,
        },
      },
      createdAt: {
        gte: new Date(moment().startOf("day").toISOString()),
      },
    },
  });

  let name;

  if (previousRooms.length > 0) {
    name = moment().format(`Do MMMM, YYYY - ${previousRooms.length + 1}`);
  } else {
    name = moment().format(`Do MMMM, YYYY - 0`);
  }

  // Create a new chat room with the user
  const room = await db.room.create({
    data: {
      name,
      users: {
        connect: {
          id: session?.user?.id,
        },
      },
    },
  });

  // Send the new chat message to OpenAI
  const resText = (await openAISend([
    {
      role: "user",
      content: text,
    },
  ])) as string;

  // Save these messages to the database
  await db.message.createMany({
    data: [
      {
        content: text,
        role: "USER",
        roomId: room.id,
        userId: session?.user?.id as string,
      },
      {
        content: resText,
        role: "ASSISTANT",
        roomId: room.id,
        userId: session?.user?.id as string, // NOTE: it doesn't matter
      },
    ],
  });

  // Redirect the user to the chat room
  redirect(`/chat/${room.id}`);
}
