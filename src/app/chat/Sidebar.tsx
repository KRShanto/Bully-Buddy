import React from "react";
import { db } from "@/lib/db";
import { auth } from "../auth";
import SidebarClient from "./SidebarClient";

export default async function Sidebar() {
  const session = await auth();

  // Get the rooms
  const rooms = await db.room.findMany({
    where: { users: { some: { id: session?.user?.id } } },
  });

  return <SidebarClient rooms={rooms} />;
}
