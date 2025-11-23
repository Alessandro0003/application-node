import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { config } from "../config/index.ts";

type JWTPayload = {
	sub: string;
	role: "student" | "manager";
};

export const checkRequestJwt = async (
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	const token = req.headers.authorization;

	if (!token) {
		return reply.status(401).send({ message: "Unauthorized" });
	}

	try {
		const payload = jwt.verify(token, config.jwt.JWT_SECRET) as JWTPayload;

		req.user = payload;
	} catch {
		return reply.status(401).send();
	}
};
