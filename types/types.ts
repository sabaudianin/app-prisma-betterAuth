import { auth } from "@/lib/auth";

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

export type Preferences = {
  id: string;
  userId: string;
  githubUsername: string | null;
  theme: string;
  emailNews: boolean;
  emailDigest: boolean;
};
