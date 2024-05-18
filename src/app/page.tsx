import Link from "next/link";
import Animation from "./Animation";
import { auth } from "./auth";
import { Iceberg } from "next/font/google";
import { BsChatText } from "react-icons/bs";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";

const iceberg = Iceberg({
  subsets: ["latin"],
  weight: "400",
});

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
