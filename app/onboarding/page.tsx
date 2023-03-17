import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { name: string; team: string };
}) {
  const { name, team } = searchParams;

  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <h1 className="text-white font-bold text-6xl"> My onboarding </h1>
      <h2 className="text-white font-bold text-4xl mt-6"> Welcome {name}! </h2>
      <h2 className="text-white font-bold text-4xl">
        {" "}
        And congrats on your first day at mijndomein{" "}
      </h2>
      <p className="text-white font-bold text-2xl mt-6">
        {" "}
        we have put together a onboarding tool to get you started in no time{" "}
      </p>
      <Link href={`/onboarding/${team}/0/0`}>
        <button className="bg-pink text-white rounded-md px-6 py-3 font-bold mt-9">
          {" "}
          click me to get started
        </button>
      </Link>
    </section>
  );
}
