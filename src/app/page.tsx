import Link from "next/link";
import Animation from "./Animation";
import { auth } from "./auth";
import { BsChatText } from "react-icons/bs";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Best AI to start a conversation if you feel lonely or need someone to talk to.",
};

export default async function Page() {
  const session = await auth();

  if (session && session.user) redirect("/chat");

  return (
    <div className="flex h-screen flex-col items-center justify-between px-2 lg:flex-row lg:px-56">
      <div>
        <h1 className="text-2xl lg:text-8xl">
          <Logo width={150} />
        </h1>
        <p className="mt-8 text-2xl text-gray-300">
          Best AI to start a conversation if you feel lonely or need someone to
          talk to.
        </p>

        <Link className="start-btn" href="/register">
          <BsChatText />
          Start Chatting
        </Link>
      </div>

      <Animation />
    </div>
  );
}
