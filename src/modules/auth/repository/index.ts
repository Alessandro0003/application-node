import { eq } from "drizzle-orm";
import { db } from "../../../database/client.ts";
import { users } from "../../../database/schema.ts";
import type { SessionUser } from "./types.ts";

export const sessionUser = async (
	args: SessionUser.Args,
): Promise<SessionUser.Response> => {
	const { email } = args;

	const result = await db.select().from(users).where(eq(users.email, email));

	return result[0];
};
