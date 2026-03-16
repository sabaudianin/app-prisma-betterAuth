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
            <input type="hidden" name={noteId} />
            <button
                type="submit"
                disabled={isPending}
                className="group relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden rounded-xl border border-red-500/20 bg-red-500/10 px-4 text-sm font-semibold text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] disabled:opacity-50 active:scale-95"
            >

                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                {isPending ? (
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Deleting...</span>
                    </div>
                ) : (
                    <>
                        <Trash2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                        <span>Delete</span>
                    </>
                )}
            </button>

        </form>
    )
}