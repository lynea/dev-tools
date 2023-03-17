"use client";
import { useLottie } from "lottie-react";
import { FunctionComponent } from "react";
import confettiAnimation from "../../public/fireworks.json";

export const FireWorks: FunctionComponent = () => {
  const animationOptions = {
    animationData: confettiAnimation,
    loop: false,
  };

  const { View } = useLottie(animationOptions);

  return <>{View}</>;
};
