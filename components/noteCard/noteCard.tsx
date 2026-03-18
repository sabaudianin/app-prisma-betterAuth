import Link from "next/link";
import type { TechNoteSummary } from "@/app/actions/tech-notes";

interface NoteCardProps {
    note: TechNoteSummary;
}

export const NoteCard = ({ note }: NoteCardProps) => {
    return (
        <section className="group relative flex-col rounded-lg border bg-card p-4 tranistion-all hover:shadow-lg">
            <div className="flex items-center justify-between">
                {note.category && (
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium">{note.category}</span>
                )}
                <span className="text-xs">{new Date(note.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 className="line-clamp-1 text-lg font-bold hover:text-primary">{note.title}</h3>
            <p className="line-clamp-4 text-sm text-muted-foreground">{note.content}</p>
            <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                    <span key={tag} className="text-xs">#{tag}</span>
                ))}
            </div>

            <Link href={`/notes/${note.id}`} className="absolute inset-0">
                <span className="sr-only">View {note.title}</span></Link>
        </section>
    )
}