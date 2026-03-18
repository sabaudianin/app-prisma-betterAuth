'use client';
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { deleteTechNote } from "@/app/actions/tech-notes";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type DeleteNoteButtonProps = {
    noteId: string;
};

export const DeleteButton = ({ noteId }: DeleteNoteButtonProps) => {
    const [state, formAction, isPending] = useActionState(deleteTechNote, null);
    const router = useRouter();


    useEffect(() => {
        if (state?.success) {
            toast.success("Note deleted successfully");
            router.push("/notes");
            router.refresh();
        }
        if (state?.error) {
            toast.error(state.error);
        }
    }, [state, router]);

    return (
        <form action={formAction}>
            {/*Ukryte pole input z noteId które zostanie odebrane w akcji na serwerze*/}
            <input type="hidden" name="noteId" value={noteId} />
            <button
                type="submit"
                disabled={isPending}
                className="group relative overflow-hidden inline-flex h-10 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 text-sm font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-95 disabled:opacity-50"
            >

                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_0.8s_ease-in-out]" />

                {isPending ? (
                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Deleting...
                    </span>
                ) : (
                    <>
                        <Trash2 className="h-4 w-4 group-hover:animate-shake" />
                        <span>Delete</span>
                    </>
                )}
            </button>

        </form>
    )
}