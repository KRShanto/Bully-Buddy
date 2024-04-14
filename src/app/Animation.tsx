"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import AIAnimation from "@/../public/AIAnimation.json";

export default function Animation() {
  return (
    <Lottie
      className="h-[700px]"
      animationData={AIAnimation}
      loop={true}
      autoplay={true}
    />
  );
}
