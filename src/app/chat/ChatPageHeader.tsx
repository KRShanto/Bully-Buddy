"use client";

import Logo from "@/components/Logo";
import { Iceberg } from "next/font/google";
import { useMediaQuery } from "react-responsive";

const iceberg = Iceberg({
  subsets: ["latin"],
  weight: "400",
});

export default function ChatPageHeader() {
  const is900px = useMediaQuery({ query: "(max-width: 900px)" });

  return (
    <h1
      className="flex items-center gap-4 text-5xl font-bold max-[900px]:text-4xl max-[600px]:text-3xl"
      style={iceberg.style}
    >
      Welcome to <Logo width={is900px ? 50 : 70} />
    </h1>
  );
}
