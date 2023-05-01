"use client";

import { FunctionComponent, useState } from "react";

export const LinkGenerator: FunctionComponent = () => {
  const [team, setTeam] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label htmlFor="fname" className="text-white mb-3">
        First name:
      </label>
      <input
        type="text"
        id="fname"
        name="fname"
        onChange={(e) => setName(e.target.value.trim())}
      />

      <label htmlFor="team" className="text-white my-3 ">
        {" "}
        which team will he/she join?
      </label>
      <select name="team" id="team" onChange={(e) => setTeam(e.target.value)}>
        <option value="snails">turbo Snails</option>
        <option value="bees">Bees</option>
        <option value="ducks">Ducks</option>
      </select>

      {name?.length && name.length > 0 && team ? (
        <>
          <p className="text-white mt-6">your link: </p>
          <a
            href={`/onboarding?name=${name}&team=${team}`}
            className="text-white"
          >{`/onboarding?name=${name}&team=${team}`}</a>
        </>
      ) : null}
    </div>
  );
};
