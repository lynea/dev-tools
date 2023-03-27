"use client";

import { Team } from "@/app/onboarding/team-select/page";
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

export const Page: FunctionComponent = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);

  return (
    <>
      <div className=" mb-12 flex justify-between ">
        <SqaureButton
          active={selectedTeam === Team.snails}
          onClick={() => setSelectedTeam(Team.snails)}
          className="w-40 h-40 text-white text-3xl font-bold border-pink border-2 rounded-md mr-8"
        >
          <h3> Turbo Snails</h3>
          <p className="text-sm mt-4">(Sales)</p>
        </SqaureButton>
        <SqaureButton
          active={selectedTeam === Team.bees}
          onClick={() => setSelectedTeam(Team.bees)}
          className="w-40 h-40 text-purple-200 text-3xl font-bold border-pink border-2 rounded-md mr-8   bg-gradient-to-t from-gradientEnd to-gradientStart"
        >
          <h3> Brilliant Bees</h3>
          <p className="text-sm mt-4">(business)</p>
        </SqaureButton>
        <SqaureButton
          active={selectedTeam === Team.ducks}
          onClick={() => setSelectedTeam(Team.ducks)}
          value={Team.ducks}
          className="w-40 h-40 text-white text-3xl font-bold border-pink border-2 rounded-md flex flex-col justify-center items-center "
        >
          <h3>
            {" "}
            Pro <br></br> Ducks
          </h3>
          <p className="text-sm mt-4">(products)</p>
        </SqaureButton>
      </div>

      {selectedTeam && (
        <>
          <p className="text-white  text-2xl mt-6">
            {" "}
            Great choise ! now lets learn more about the company
          </p>
          <Link href={`/onboarding/${selectedTeam}/0/0`}>
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
