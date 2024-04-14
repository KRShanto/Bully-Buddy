import SubmitButton from "./SubmitButton";
import Link from "next/link";
import Input from "@/components/Input";

export default function Page() {
  return (
    <>
      <form className="mx-auto mt-44 max-w-lg rounded-lg  border-slate-700 p-6">
        {/* Title */}
        <h1 className="mb-8 text-center text-3xl font-semibold">
          Login at <span className="yellow-gradient text-4xl">Bully Buddy</span>
        </h1>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block">
            Email
          </label>
          <Input
            name="email"
            type="email"
            required
            autoFocus
            className="w-full rounded-md border border-slate-600 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block">
            Password
          </label>
          <Input
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-slate-600 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Link
          href="/register"
          className="mt-4 block rounded-md text-center text-sm text-gray-400 underline hover:text-gray-600"
        >
          Don&rsquo;t have an account? Register
        </Link>

        <SubmitButton />
      </form>
    </>
  );
}
