"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import ErrorAnimation from "@/../public/404Animtion.json";

export default function Animation() {
  return (
    <>
      <Lottie
        className="h-[500px]"
        animationData={ErrorAnimation}
        loop={true}
        autoplay={true}
      />

      <h1 className="text-center text-8xl font-bold text-gray-300">404</h1>
      <p className="text-center text-2xl text-gray-300">
        The page you are looking for does not exist.
      </p>
    </>
  );
}
