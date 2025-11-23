import type { FastifyRequest } from "fastify";

export function getAuthenticatedUserRequest(request: FastifyRequest) {
	const user = request.user;

	if (!user) {
		throw new Error("Invalid authenticated");
	}

	return user;
}
