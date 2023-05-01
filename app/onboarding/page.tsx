import { DonutScene } from "@/components/DonutScene/DonutScene";
import { Alert } from "@/components/Notification/Notification";
import { Title } from "@/components/Title/Title";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/api";

export default async function Page({
  searchParams,
}: {
  searchParams: { team: string };
}) {
  const { team } = searchParams;

  const user: User | null = await currentUser();

  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <div className="absolute top-11">
        <Alert>
          This project is currently in alfa if you encounter any problems please
          report them to Rene van Dijk or your team lead
        </Alert>
      </div>

      <Title size="xl"> My onboarding </Title>
      <h2 className="text-white font-bold text-4xl mt-6 mb-2">
        {" "}
        Welcome {user?.firstName}!{" "}
      </h2>
      <h2 className="text-white font-bold text-3xl">
        {" "}
        And congrats on your first day at Mijndomein{" "}
      </h2>

      <div className="h-96 mb-12">
        <DonutScene />
      </div>
      <p className="text-white  text-2xl mt-6">
        {" "}
        We will get you ready to write some awesome code in no time{" "}
      </p>
      <Link href={team ? `/onboarding/${team}/1/1` : "/onboarding/team-select"}>
        <button className="bg-pink text-white rounded-md px-6 py-3 font-bold mt-9 text-xl">
          {" "}
          Just click here
        </button>
      </Link>
    </section>
  );
}
