"use client";

import { FunctionComponent } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FireWorks } from "../FireWorks/FireWorks";

type BadgeProps = {
  imageUrl: string;
  text: string;
  best?: boolean;
  label: string;
};

export const Badge: FunctionComponent<BadgeProps> = ({
  imageUrl,
  text,
  best,
  label,
}) => {
  return (
    <div
      className={`flex  text-${
        best ? "gold" : "white"
      } flex-col items-center relative group `}
    >
      {best && (
        <>
          <div className="absolute top-0 w-60 h-60">
            <FireWorks></FireWorks>
          </div>
          <FontAwesomeIcon
            icon={faCrown}
            className=" text-l h-10 mb-2 text-gold"
          />
        </>
      )}
      <div className="relative flex justify-center w-fit">
        <Image
          className="rounded-full"
          alt="winner"
          src={imageUrl}
          width={100}
          height={100}
        />
        <span className=" font-bold absolute top-7 scale-0 transition-all block rounded bg-white p-2 text-lg text-purple-200 group-hover:scale-100 whitespace-nowrap">
          ✨ {label}
        </span>
      </div>

      <p className="font-bold text-2xl mt-3">{text}</p>
    </div>
  );
};
