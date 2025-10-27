import type { FastifyReply } from "fastify";
import * as services from "../services/index.ts";
import type { CreateEnrollmentRequest } from "./types.ts";

export const createEnrollment = async (
	req: CreateEnrollmentRequest,
	reply: FastifyReply,
) => {
	try {
		const {
			body: { courseId, userId },
		} = req;

		await services.createEnrollment({ courseId, userId });

		return reply.send({
			statusCode: 201,
			message: "Enrollment created successfully",
		});
	} catch (error) {
		let message = "Error creating enrollment";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};
