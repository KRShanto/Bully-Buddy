import Input from "@/components/Input";
import SubmitButton from "./SubmitButton";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <form className="mx-auto mt-44 max-w-lg rounded-lg  border-slate-700 p-6">
        <h1 className="mb-8 text-center text-3xl font-semibold">
          Register at{" "}
          <span className="yellow-gradient text-4xl">Bully Buddy</span>
        </h1>

        <div>
          <label htmlFor="name" className="mb-2 block">
            Name
          </label>

          <Input
            type="text"
            name="name"
            className="w-full rounded-md border border-slate-600 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoFocus
          />
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="mb-2 block">
            Email
          </label>

          <Input
            type="email"
            name="email"
            className="w-full rounded-md border border-slate-600 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="mb-2 block">
            Password
          </label>

          <Input
            type="password"
            name="password"
            className="w-full rounded-md border border-slate-600 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <Link
          href="/login"
          className="mt-4 block rounded-md text-center text-sm text-gray-400 underline hover:text-gray-600"
        >
          Already registered?
        </Link>

        <SubmitButton />
      </form>
    </>
  );
}
