import { db } from "../../../database/client";
import { users } from "../db";
import type { CreateUser } from "./types";

export const createUser = async (args: CreateUser.Args) => {
	const { name, email } = args;

	const user = await db.insert(users).values({
		name,
		email,
	});

	return user;
};
