"use server";

import { db } from "@/lib/db";
import { auth } from "../auth";
import moment from "moment";
import { redirect } from "next/navigation";

export async function newRoom() {
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

  redirect(`/chat/${room.id}`);
}
