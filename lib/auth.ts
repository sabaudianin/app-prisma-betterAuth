import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,

    minPasswordLength: 8,
    maxPasswordLength: 128,

    requireEmailVerification: false, // Na dev: false, na prod: true
    autoSignInAfterVerification: true,

    /**W produkcji Resend*/
    sendVerificationEmail: async ({
      user,
      verificationToken,
      url,
    }: {
      user: { email: string };
      verificationToken: string;
      url: string;
    }) => {
      console.log("📧 Verification Email:");
      console.log("To:", user.email);
      console.log("Token:", verificationToken);
      console.log("URL:", url);
      console.log("---");

      // W produkcji:await sendEmail({to: user.email,subject: "Verify your email",html: `Click here: ${url}`,});
    },
  },

  socialProviders: {
    // GOOGLE OAuth
    google: {
      enabled: false, //  true gdy credentials ready
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      /**
       * To URL, na który Google przekierowuje po zalogowaniu.
       * Musi być DOKŁADNIE taki sam jak w Google Console!
       * Development: http://localhost:3000/api/auth/callback/google
       * Production: https://twoja-domena.com/api/auth/callback/google
       */
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },

    // GITHUB OAuth
    github: {
      enabled: false, // Zmień na true gdy dodasz credentials
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/github`,
    },
  },
  account: {
    /*
     * - User rejestruje się przez email: test@gmail.com
     * - Później loguje się przez Google: test@gmail.com
     * - Jeśli accountLinking: true → ten sam User, dwa Account
     * - Jeśli accountLinking: false → błąd "Email already exists"
     */
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"], // Automatycznie linkuj te providery
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dni
    updateAge: 60 * 60 * 24, // Aktualizuj co 24h

    /**
     * cookie: Ustawienia ciasteczka sesji
     * secure: Czy cookie tylko przez HTTPS?
     * - true (production): tylko HTTPS
     * - false (development): HTTP + HTTPS
     * sameSite: Ochrona przed CSRF
     * - "lax": Większość requestów OK
     * - "strict": Tylko same-origin requests
     * - "none": Wszystkie requests (wymaga secure: true)
     */
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // Cache cookie przez 5 minut
    },
  },

  user: {
    additionalFields: {
      // Przykład: dodanie pola "role"
      // role: {
      //   type: "string",
      //   defaultValue: "user",
      //   input: true, // Czy można ustawić przy rejestracji?
      // },
    },

    changeEmail: {
      enabled: true,
      sendEmailVerificationOnChange: true, // Wyślij email weryfikacyjny
    },
    deleteUser: {
      enabled: true,
    },
  },

  advanced: {
    /* Prefix dla cookies (żeby uniknąć konfliktów)*/
    cookiePrefix: "devinsight",

    /**
     * Czy sesja ma działać na subdomainach?Przykład:
     * - app.example.com
     * - api.example.com Jeśli true, sesja działa na obu
     */
    crossSubDomainCookies: {
      enabled: false,
    },

    /**Use secure cookiesAutomatycznie: true w production, false w development
     */
    useSecureCookies: process.env.NODE_ENV === "production",

    /**Funkcja generująca ID dla nowych rekordów
     * Używamy cuid2 (jak w Prisma @default(cuid()))
     */
    generateId: () => {
      // Możesz użyć własnej funkcji lub biblioteki
      return crypto.randomUUID(); // UUID v4
      // Lub: return customIdGenerator();
    },
  },
  /**Limit requestów żeby zapobiec:
   * - Brute force attacks (zgadywanie hasła)
   * - DDoS attacks
   * - Spam
   window: Okno czasowe (w sekundach)
   * max: Maximum requestów w tym oknie
   */
  rateLimit: {
    enabled: true,
    window: 60, // 60 sekund
    max: 10, // Max 10 requestów na minutę (per IP)
    /* Custom rate limit dla różnych endpointów
     */
    customRules: {
      "/sign-in": {
        window: 60,
        max: 5, // Max 5 prób logowania na minutę
      },
      "/sign-up": {
        window: 60 * 60, // 1 godzina
        max: 3, // Max 3 rejestracje na godzinę
      },
    },
  } /** Lista domen, które mogą wysyłać requesty do API
   * (CORS protection)
   */,
  trustedOrigins: [
    "http://localhost:3000", // Development
    process.env.BETTER_AUTH_URL || "", // Production
  ],
});
