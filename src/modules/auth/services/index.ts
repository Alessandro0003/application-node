import { verify } from "argon2";
import * as repository from "../repository/index.ts";
import type { SessionUser } from "./types.ts";

export const sessionUser = async (
	args: SessionUser.Args,
): Promise<SessionUser.Response> => {
	const { email, password } = args;

	const user = await repository.sessionUser({ email });

	if (!user) {
		throw new Error("Credentials are invalid.");
	}

	const doesPasswordMatch = await verify(user.password, password);

	if (!doesPasswordMatch) {
		throw new Error("Credentials are invalid.");
	}

	return {
		message: "ok",
	};
};
