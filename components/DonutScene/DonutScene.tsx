"use client";
import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));
import Image from "next/image";
import profilePic from "../../public/donut.png";
export const DonutScene = () => {
  const [isLoaded, setIsloaded] = React.useState(false);

  return (
    <>
      {!isLoaded && (
        // <div className="border border-blue-300 h-96 shadow rounded-md p-4 bg-purple-100  w-96 mx-auto animate-pulse mt-8"></div>
        <Image src={profilePic} alt="guy sitting working on his laptop" />
      )}
      <Suspense>
        <Spline
          scene="https://prod.spline.design/8-XX3fWBmbcS9if7/scene.splinecode"
          onLoad={() => setIsloaded(true)}
        />
      </Suspense>
    </>
  );
};
