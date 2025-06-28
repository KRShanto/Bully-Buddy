import { redirect } from "next/navigation";
import { auth } from "../auth";
import Sidebar from "./Sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex w-full justify-center max-[1100px]:ml-14">
        {children}
      </div>
    </div>
  );
}
