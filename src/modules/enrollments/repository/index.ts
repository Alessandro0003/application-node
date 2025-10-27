import { db } from "../../../database/client.ts";
import { enrollments } from "../db/index.ts";
import type { CreateEnrollment } from "./types.ts";

export const createEnrollment = async (
	args: CreateEnrollment.Args,
): Promise<CreateEnrollment.Response> => {
	const { userId, courseId } = args;

	const enrollment = await db.insert(enrollments).values({
		userId,
		courseId,
	});

	return enrollment;
};
