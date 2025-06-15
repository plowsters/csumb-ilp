
import { Lucia } from "lucia";
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import { pg, pgError } from "./pg.js";

let luciaInstance: Lucia | null = null;
let authInitError: Error | null = pgError;

if (pg) {
    try {
        console.log("Auth Initializing: Creating Lucia instance...");
        luciaInstance = new Lucia(new PostgresJsAdapter(pg, {
          user: "users",
          session: "sessions"
        }), {
          sessionCookie: {
            attributes: {
              secure: true,
              sameSite: "none",
            }
          },
          getUserAttributes: (attributes) => {
            return {
              username: attributes.username
            };
          }
        });
        console.log("Auth Initialized: Lucia instance created.");
    } catch (e) {
        console.error("Auth Initialization failed:", e);
        authInitError = e instanceof Error ? e : new Error("Failed to initialize Lucia");
        luciaInstance = null;
    }
} else if (!authInitError) {
    console.log("Auth Initializing: Skipped due to DB connection not being available.");
    authInitError = new Error("Database connection is not available.");
}

export const lucia = luciaInstance;
export const authError = authInitError;

interface DatabaseUserAttributes {
	username: string;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: {};
  }
}
