import { Title } from "@/components/Title/Title";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { TeamSelect } from "@/components/TeamSelect/TeamSelect";

export enum Team {
  snails = "snails",
  bees = "bees",
  ducks = "ducks",
}

export default async function Page({
  searchParams,
}: {
  searchParams: { team: string };
}) {
  const { team } = searchParams;

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <Title size="xl"> The teams </Title>
      <h2 className="text-white font-bold text-4xl mt-6 mb-8">
        {team ? `You are in team ${team}` : "Please select a team"}
      </h2>
      <TeamSelect />
    </section>
  );
}
