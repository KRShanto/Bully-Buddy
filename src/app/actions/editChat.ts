"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function editChat({ id, name }: { id: string; name: string }) {
  if (!name) return { error: "Name is required" };

  // wait for 5 secs
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await db.room.update({
    where: { id },
    data: { name },
  });

  revalidatePath("/chat");

  return { success: true };
}
