import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getGitHubStats } from "@/app/actions/githubActions";
import { RepoSearch } from "@/components/repoSearch/repoSearch";
import { GitBranch, Star, ExternalLink, Trash2 } from "lucide-react";



export default async function RepoPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("auth/sign-in");

    const savedRepos = await prisma.savedRepository.findMany({
        where: { userId: session.user.id },
        orderBy: { savedAt: "desc" },
    });

    const statsResult = await getGitHubStats();
    const profile = statsResult.success ? statsResult.data : null;

    return (
        <section className="container mx-auto max-w-6xl p-6 pt-24">
            <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div>
                <h1 className="text-2xl font-bold tracking-tight">
                    GitHub Manager
                </h1>
                <p className="text-muted-foreground">Search and save your favorites resources</p>
            </div>
                {profile && (
                    <div className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm">
                        <img
                            src={profile.avatar_url} alt={profile.login} className="h-12 w-12 rounded-full border-2 border-primary/20" />
                        <div>
                            <p className="font-bold text-sm">@{profile.login}</p>
                            <div className="flex gap-3 text-xs text-muted-foreground">
                                <span><strong>{profile.public_repos}</strong> Repos</span>
                                <span><strong>{profile.followers}</strong> Followers</span>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <div className="grid gap-10 lg:grid-cols-[1fr_350px]">

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        Saved Repositories
                    </h2>

                    {savedRepos.length === 0 ? (
                        <div className="rounded-xl border border-dashed p-10 text-center">
                            <GitBranch className="mx-auto h-10 w-10 text-muted-foreground opacity-20" />
                            <p className="mt-4 text-muted-foreground text-sm">No repositories saved yet. Use the search to find some!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {savedRepos.map((repo) => (
                                <div key={repo.id} className="relative group rounded-xl border bg-card p-4 transition-all hover:border-primary/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-mono text-muted-foreground">{repo.language}</span>
                                        <a href={repo.url} target="_blank" className="text-muted-foreground hover:text-primary">
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </div>
                                    <h3 className="font-bold text-sm mb-1 truncate">{repo.fullName}</h3>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 h-8">
                                        {repo.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-medium">
                                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                        {repo.stars}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                <aside className="space-y-6">
                    <div className="rounded-2xl border bg-muted/30 p-6">
                        <h2 className="mb-4 font-semibold">Find New Repos</h2>
                        <RepoSearch />
                    </div>
                </aside>
            </div>

        </section>
    )
}