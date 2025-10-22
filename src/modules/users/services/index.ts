import * as repository from "../repository/index.ts";
import type { CreateUser } from "./types.ts";

export const createUser = async (args: CreateUser.Args) => {
	const { name, email } = args;

	const user = await repository.createUser({
		name,
		email,
	});

	return user;
};
