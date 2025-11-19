import type { FastifyReply } from "fastify";
import * as service from "../services/index.ts";
import type { SessionUserRequest } from "./types.ts";

export const sessionUser = async (
	req: SessionUserRequest,
	reply: FastifyReply,
) => {
	try {
		const {
			body: { email, password },
		} = req;

		await service.sessionUser({ email, password });

		return reply.send({
			statusCode: 200,
			message: "ok",
		});
	} catch (error) {
		let message = "Error sign in user";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(401).send({
			statusCode: 401,
			message,
		});
	}
};
