"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteChat(roomId: string) {
  await db.room.delete({
    where: { id: roomId },
  });

  revalidatePath("/chat");

  return true;
}
