import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);

//obsługuje wszystkie endpointy:/api/auth/sign-in, /api/auth/sign-up/api/auth/sign-out, /api/auth/callback/google
