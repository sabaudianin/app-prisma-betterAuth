'use client';

import { useTransition } from "react";
import { deleteSavedRepo } from "@/app/actions/githubActions";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";


export const DeleteRepoButton = ({ repoId }: { repoId: string }) => {
    const [isPending, startTransition] = useTransition();


    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteSavedRepo(repoId);
            if (result.success && result.data) {
                toast.success(`Removed repo: ${result.data.id}`)
            } else {
                toast.error(result.error || "Something went wrong")
            }
        })
    }
    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
            title="Remove from favorites"
        >

            {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
        </button>
    )
}
