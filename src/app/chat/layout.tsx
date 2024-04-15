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
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
