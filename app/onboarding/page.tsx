import { DonutScene } from "@/components/DonutScene/DonutScene";
import { Title } from "@/components/Title/Title";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/api";
import { AllGobalChaptersInfoQuery } from "@/generated/graphql";
import { allGobalChaptersInfoQuery } from "@/graphql/queries/globalChapter";
import { getClient } from "@/lib/client";

export default async function Page({
  searchParams,
}: {
  searchParams: { team: string };
}) {
  const client = getClient();

  const { data }: { data: AllGobalChaptersInfoQuery } = await client.query({
    query: allGobalChaptersInfoQuery,
  });

  console.log(data.chapterCollection?.items);

  const getFirstStep = async () => {
    //get the first step of the first chapter of the selected team
    // setLoading(true);
    if (!data.chapterCollection?.items) return;

    const sortedChapters = [...(data?.chapterCollection?.items ?? [])]?.sort(
      (a, b) => a?.id! - b?.id!
    );

    if (sortedChapters.length < 1) {
      return;
    }

    const firstChapter = sortedChapters.at(0);

    if (!firstChapter?.sys.id) return;

    //TODO: sorting is duplicated should move to util
    const sortedSteps = [
      ...(firstChapter?.linkedFrom?.onboardStepCollection?.items ?? []),
    ]?.sort((a, b) => a?.step! - b?.step!);

    const firstStep = sortedSteps.at(0)?.sys?.id;

    return `/onboarding/global/${firstChapter?.sys?.id}/${firstStep}`;
  };

  const user: User | null = await currentUser();

  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <div className="absolute top-11">
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-bold">
            This project is currently in alfa if you encounter any problems
            please report them to Rene van Dijk or your team lead{" "}
          </span>
        </div>
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
      <Link href={(await getFirstStep()) || ""}>
        <button className="bg-pink-600 text-white rounded-md px-6 py-3 font-bold mt-9 text-xl">
          {" "}
          Just click here
        </button>
      </Link>
    </section>
  );
}
