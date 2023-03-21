import { FunctionComponent, useState } from "react";
import { ConfettiAnimation } from "../Confetti/Confetti";
import { Graph } from "../Graph/Graph";
import { getFilterValues } from "./helpers/graphFilterHerlpers";
import type { GraphFilterProps, Score } from "./types";

export const GraphFilter: FunctionComponent<GraphFilterProps> = ({
  scoreRuns,
}) => {
  const firstRun = scoreRuns.at(0);
  const secondRun = scoreRuns.at(1);

  const filterValues = firstRun ? getFilterValues(firstRun, secondRun) : [];

  //state
  const [shouldCompare, setShouldCompare] = useState(false);
  const [filter, setFilter] = useState<string[]>(filterValues);

  const isPartyTime = firstRun?.scores.some((score) => score.value === 100);

  const handleTeamFilter = (selectedValue: string) => {
    if (!selectedValue) return;
    if (filter.includes(selectedValue)) {
      const dub = [...filter];

      const removed = dub.filter((item) => item !== selectedValue);
      setFilter([...removed]);
    } else {
      setFilter([...filter, selectedValue]);
    }
  };

  return (
    <div>
      <h2 className="text-white font-bold text-2xl opacity-70 mb-5">
        {firstRun?.name} {secondRun?.name ? `vs ${secondRun.name}` : ""}
      </h2>
      <input
        type="checkbox"
        id="compare"
        className="mb-5"
        onChange={() => setShouldCompare(!shouldCompare)}
      />
      <label className="text-white" htmlFor="compare">
        {" "}
        compare to previous run
      </label>{" "}
      {isPartyTime ? (
        <div className="absolute top-0 ">
          <ConfettiAnimation />
        </div>
      ) : null}
      <Graph scoreRuns={[firstRun?.scores ?? [], secondRun?.scores ?? []]} />
      <div className="mt-6 flex flex-col items-center w-full ">
        <p className="text-white"> filter by team</p>
        <div className="flex justify-center mt-2 ">
          {filterValues?.map((filterValue, index) => (
            <button
              key={filterValue + index}
              className={`mr-5  rounded-sm px-2 py-1 font-bold ${
                filterValue && filter.includes(filterValue)
                  ? "bg-pink text-white"
                  : "bg-white text-purple-200"
              } `}
              onClick={() => handleTeamFilter(filterValue!!)}
            >
              {filterValue}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
