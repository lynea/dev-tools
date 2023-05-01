import { Title } from "@/components/Title/Title";

import { TeamSelect } from "@/components/TeamSelect/TeamSelect";
import { getClient } from "@/graphql/client";
import { allTeamsInfoQuery } from "@/graphql/queries/teams";
import { AllTeamsInfoQuery } from "@/generated/graphql";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { team: string };
}) {
  const { team } = searchParams;
  const client = getClient();
  //TODO make id dynamic
  const { data }: { data: AllTeamsInfoQuery } = await client.query({
    query: allTeamsInfoQuery,
  });

  if (!data.teamCollection?.items) {
    return <div> oop something went wrong </div>;
  }

  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <Title size="xl"> The teams </Title>
      <h2 className="text-white font-bold text-4xl mt-6 mb-8">
        {team ? `You are in team ${team}` : "Please select a team"}
      </h2>
      <TeamSelect teams={data?.teamCollection?.items!} />
    </section>
  );
}
