
import { Lucia } from "lucia";
import { PostgreSQLAdapter } from "@lucia-auth/adapter-postgresql";
import { pg } from "./pg.js";

export const lucia = new Lucia(new PostgreSQLAdapter(pg, {
  user: "users",
  session: "sessions"
}), {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none"
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
