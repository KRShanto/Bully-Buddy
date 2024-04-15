import React from "react";
import { Iceberg } from "next/font/google";
import Image from "next/image";
import BullyBuddy from "@/../public/Bot.png";

const iceberg = Iceberg({
  weight: "400",
  subsets: ["latin"],
});

export default function Logo({ width = 50 }: { width?: number }) {
  return (
    <span
      className="yellow-gradient flex items-center font-bold"
      style={iceberg.style}
    >
      <Image src={BullyBuddy} width={width} height={width} alt="Bully Buddy" />
      Bully Buddy
    </span>
  );
}
