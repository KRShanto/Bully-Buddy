import { auth } from "./auth";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    return <h2 className="text-red-500">You are not logged in</h2>;
  }

  return (
    <div>
      <h2>Welcome {session.user.name}</h2>
      <p>Your email is {session.user.email}</p>
    </div>
  );
}
