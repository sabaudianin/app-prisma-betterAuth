'use client';
import { useTransition } from "react";
import { updateAllPreferences } from "@/app/actions/preferences";
import { Preferences } from "@/types/types";
import { Loader2, Github, Mail } from "lucide-react";
import { toast } from "sonner";

export const SettingsForm = ({ preferences }: { preferences?: Preferences }) => {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        const data = {
            githubUsername: formData.get("githubUsername"),
            emailNews: formData.get("emailNews") === "on",
            emailDigest: formData.get("emailDigest") === "on"
        }

        startTransition(async () => {
            try {
                const result = await updateAllPreferences(data);

                if (result.success) {
                    toast.success("Preferences saved!");
                } else {
                    toast.error(`Error: ${result.error}`)
                }
            } catch (error) {
                console.error("Error updstaing preferrences", error)
                toast.error("Critical Error");
            }
        });
    };
    return (
        <form action={handleSubmit} className="space-y-8 bg-card p-6 rounded-2xl border">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Github className="h-5 w-5">Github Integration</Github>
                </h2>
                <div className="space-y-2">
                    <label htmlFor="githubUsername" className="text-sm font-medium">GitHub UserName</label>
                    <input
                        id="githubUsername"
                        name="githubUsername"
                        defaultValue={preferences?.githubUsername || ""}
                        placeholder="UserName..."
                        className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
                </div>
            </div>
            <div className="space-y-4 pt-4 border-t">
                <h2 className="text-xl font-semibold flex items-center gap-2"><Mail className="h-5 w-5" />Notifications</h2>
                <div className="flex flex-col items-center gap-3 ">
                    <label className="flex items-center gap-3 cursor-pointer">

                        <input type="checkbox"
                            name="emailNews"
                            defaultChecked={preferences?.emailNews ?? true}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span className="text-sm">Get News anout project</span>

                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="emailDigest"
                            defaultChecked={preferences?.emailDigest ?? false}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm">Weekend activity summary</span>
                    </label>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2">
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Preferences
            </button>

        </form>
    )
}
