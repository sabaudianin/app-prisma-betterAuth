import Link from "next/link";
import { ArrowRight, Code2, Github, NotebookPen, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-black">

      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size:[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-8">

        <section className="flex flex-col items-center text-center pt-4 md:pt-48">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary animate-in fade-in slide-in-from-bottom-3">
            <Sparkles className="h-3 w-3" />
            <span>Built for modern developers</span>
          </div>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight sm:text-7xl">
            Developer <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Insight</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Your personal manage center. Create notes, follow gitHub repositories and build your own database.

          </p>

          <div className="mt-10 md:mt-30 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/sign-up"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/auth/sign-in"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
            >
              Log In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

          </div>
        </section>

        <section className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:pt-16">
          <div className="group rounded-2xl border bg-card p-8 transition-all hover:border-primary/50">
            <div className="flex items-center justify-center rounded-xl p-2 ">
              <NotebookPen className="h-6 w-6 bg-blue-500/10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold">Smart Tech Notes</h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              Create and manage your personal notes.
            </p>
          </div>

          <div className="group rounded-2xl border bg-card p-8 transition-all hover:border-primary/50">
            <div className="flex items-center justify-center rounded-xl p-2 ">
              <Github className="h-6 w-6 bg-black text-white rounded-full" />
            </div>
            <h3 className="text-xl font-bold">GitHub Integration</h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              Search and save Repositories.
            </p>
          </div>

          <div className="group rounded-2xl border bg-card p-8 transition-all hover:border-primary/50">
            <div className="flex items-center justify-center rounded-xl p-2 ">
              <Code2 className="h-6 w-6 bg-green-500/10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Developer First</h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
              Tool for developers.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}