
import { Lucia } from "lucia";
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import { pg } from "./pg.js";

export const lucia = new Lucia(new PostgresJsAdapter(pg, {
  user: "users",
  session: "sessions"
}), {
  sessionCookie: {
    attributes: {
      secure: true,
      sameSite: "none",
      httpOnly: true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username
    };
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      username: string;
    };
  }
}
