import { hash } from "argon2";
import * as repository from "../repository/index.ts";
import type { CreateUser, GetUserById, GetUsers } from "./types.ts";

export const getUserById = async (
	args: GetUserById.Args,
): Promise<GetUserById.Response> => {
	const { id } = args;

	if (!id) throw new Error("User not found.");

	const user = await repository.getUserById({ id });

	if (!user) throw new Error("User not found.");

	return user;
};

export const getUsers = async (): Promise<GetUsers.Response> => {
	const users = await repository.getUsers();

	return users;
};

export const createUser = async (args: CreateUser.Args) => {
	const { name, email, password } = args;

	const users = await repository.getUsers();
	const emaailAlreadyExists = users.some((user) => user.email === email);

	if (emaailAlreadyExists) {
		throw new Error("Email already exists.");
	}

	const passwordHash = await hash(password);

	const user = await repository.createUser({
		name,
		email,
		password: passwordHash,
	});

	return user;
};
