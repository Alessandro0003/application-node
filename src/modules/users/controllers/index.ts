import type { FastifyReply } from "fastify";
import * as service from "../services/index.ts";
import type { CreateUserRequest } from "./types.ts";

export const createUser = async (
	req: CreateUserRequest,
	reply: FastifyReply,
) => {
	try {
		const {
			body: { name, email },
		} = req;

		await service.createUser({ name, email });

		return reply.send({
			statusCode: 201,
			message: "User created successfully",
		});
	} catch (error) {
		let message = "Error create user";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};
