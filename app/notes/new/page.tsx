"use client";
import Link from "next/link";

import { Plus, ArrowLeft } from "lucide-react";
import { NoteForm } from "@/components/noteForm/noteForm";

export default function NewNote() {
    return (
        <section className="min-h-screen">


            <NoteForm />
        </section>
    );
}