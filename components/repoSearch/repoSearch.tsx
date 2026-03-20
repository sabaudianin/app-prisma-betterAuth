'use client';

import { useState, useEffect, useTransition } from "react";
import { searchGitHubRepo, saveRepo } from "@/app/actions/githubActions";
import { Search, Star, Loader2, BookmarkPlus } from "lucide-react";
import { toast } from "sonner";
import type { GitHubRepo } from "@/types/github";

export const RepoSearch = () => {
    const [results, setResults] = useState<GitHubRepo[]>([]);
    const [query, setQuery] = useState("");
    const [isPending, startTransition] = useTransition()

    const handleSearch = async (searchQuery: string) => {
        startTransition(async () => {
            const result = await searchGitHubRepo(searchQuery);
            if (result.success) {
                setResults(result.data as GitHubRepo[]);
            }
        })
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 2) {
                handleSearch(query);
            } else {
                setResults([])
            };
        }, 500)
        return () => clearTimeout(timer);
    }, [query]);


    const handleSave = async (repo: GitHubRepo) => {
        const result = await saveRepo(repo);
        if (result.success) {
            toast.success(`Saved ${repo.name}`)
        } else {
            toast.error(result.error || "Failed to save")
        }
    }
    return (
        <section className="w-full">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search repositories"
                    value="query"
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-xl border bg-background pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                {isPending && <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary" />}
            </div>

            {/*Results*/}
            <div className="grid gap-4">
                {results.map((repo) => (
                    <div key={repo.id}
                        className="group flex items-center justify-between rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-md">
                        <div>
                            <h4 className="font-bold text-sm">{repo.full_name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">{repo.description}</p>
                            <div className="flex gap-3 text-[10px] font-medium">
                                <span className="flex items-center gap-1 text-yellow-500">
                                    <Star className="h-3 w-3 fill-current" /> {repo.stargazers_count}
                                </span>
                                <span className="text-primary">{repo.language}</span>
                                <div className="flex gap-1">
                                    {repo.topics.slice(0, 3).map(topic => (
                                        <span key={topic} className="bg-secondary px-1.5 py-0.5 rounded italic">#{topic}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleSave(repo)}
                            className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                            <BookmarkPlus className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}