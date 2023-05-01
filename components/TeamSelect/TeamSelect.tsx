"use client";

import { Team } from "./types";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { clsx } from "clsx";

type SquareButtonProps = {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SqaureButton: FunctionComponent<SquareButtonProps> = ({
  children,
  onClick,
  active,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-40 h-40  text-3xl font-bold  border-2 rounded-md mr-8 transition-all duration-200 ease-in",
        {
          "bg-gradient-to-t from-gradientEnd to-gradientStart text-purple-200 ":
            active,
          "text-white border-pink": !active,
        }
      )}
    >
      {children}
    </button>
  );
};

type TeamSelectProps = {
  teams: ({
    __typename?: "Team" | undefined;
    name?: string | null | undefined;
    alias?: string | null | undefined;
  } | null)[];
};

export const TeamSelect: FunctionComponent<TeamSelectProps> = ({ teams }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      <div className=" mb-12 flex justify-between ">
        {teams.map((team) => (
          <SqaureButton
            key={team?.alias}
            active={selectedTeam === team?.name}
            onClick={() => setSelectedTeam(team?.name ?? undefined)}
            className="w-40 h-40 text-white text-3xl font-bold border-pink border-2 rounded-md mr-8"
          >
            <h3> {team?.alias}</h3>
            <p className="text-sm mt-4">({team?.name})</p>
          </SqaureButton>
        ))}
      </div>

      {selectedTeam && (
        <>
          <p className="text-white  text-2xl mt-6">
            {" "}
            Great choise ! now lets learn more about the company
          </p>
          <Link href={`/onboarding/${selectedTeam}/1/1`}>
            <button className="bg-pink text-white rounded-md px-6 py-3 font-bold mt-9 text-xl">
              {" "}
              i am ready
            </button>
          </Link>
        </>
      )}
    </>
  );
};
