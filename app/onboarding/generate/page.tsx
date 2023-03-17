import { LinkGenerator } from "@/components/LinkGenerator/LinkGenerator";

export default async function Page() {
  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <h1 className="text-white font-bold text-6xl mb-6">
        generate onboarding link
      </h1>
      <LinkGenerator />
    </section>
  );
}
