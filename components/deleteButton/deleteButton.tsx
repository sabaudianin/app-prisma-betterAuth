import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { deleteTechNote } from "@/app/actions/tech-notes";
import { toast } from "sonner";

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
                className="rounded-md bg-destructive/10 px-3 py-2 text-sm font-medium">
                {isPending ? "Deleting..." : "Delete"}
            </button>

        </form>
    )
}