import { eq } from "drizzle-orm";
import { db } from "../../../database/client.ts";
import { users } from "../db/index.ts";
import type { CreateUser, GetUserById, GetUsers } from "./types.ts";

export const getUserById = async (
	args: GetUserById.Args,
): Promise<GetUserById.Response> => {
	const { id } = args;

	const result = await db.select().from(users).where(eq(users.id, id));

	const user = result[0];

	return user;
};

export const getUsers = async (): Promise<GetUsers.Response> => {
	const result = await db.select().from(users);

	return result.map((users) => ({
		...users,
	}));
};

export const createUser = async (args: CreateUser.Args) => {
	const { name, email } = args;

	const user = await db
		.insert(users)
		.values({
			name,
			email,
		})
		.returning();

	const result = user[0];

	return result;
};
