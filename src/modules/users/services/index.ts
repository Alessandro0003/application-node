import * as repository from "../repository/index.ts";
import type { CreateUser, GetUsers } from "./types.ts";

export const getUsers = async (): Promise<GetUsers.Response> => {
	const users = await repository.getUsers();

	return users;
};

export const createUser = async (args: CreateUser.Args) => {
	const { name, email } = args;

	const users = await repository.getUsers();
	const emaailAlreadyExists = users.some((user) => user.email === email);

	if (emaailAlreadyExists) {
		throw new Error("Email already exists.");
	}

	const user = await repository.createUser({
		name,
		email,
	});

	return user;
};
