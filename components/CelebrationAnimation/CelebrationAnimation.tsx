"use client";
import { useLottie } from "lottie-react";
import { FunctionComponent } from "react";
import celebrationAnimation from "../../public/celebrate.json";

export const CelebrationAnimation: FunctionComponent = () => {
  const animationOptions = {
    animationData: celebrationAnimation,
    loop: false,
  };

  const { View } = useLottie(animationOptions);

  return <>{View}</>;
};
