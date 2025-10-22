import * as repository from "../repository";
import type { CreateUser } from "./types";

export const createUser = async (args: CreateUser.Args) => {
	const { name, email } = args;

	const user = await repository.createUser({
		name,
		email,
	});

	return user;
};
