import type { FastifyReply, FastifyRequest } from "fastify";
import { getAuthenticatedUserRequest } from "../utils/get-authenticated-user-request.ts";

export const checkUserRole = async (
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	const user = getAuthenticatedUserRequest(req);

	if (user.role !== "manager") {
		return reply.status(401).send({ message: "Unauthorized" });
	}
};
