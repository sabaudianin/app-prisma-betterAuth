import Link from "next/link";

export default function Home() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        DEVELOPER INSIGHT
        <div>
          <Link href="/auth/sign-in">
            LOG IN
          </Link>
        </div>
      </main>
    </section>
  );
}
