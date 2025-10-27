import * as repository from "../../enrollments/repository/index.ts";
import type { CreateEnrollment } from "./types.ts";

export const createEnrollment = async (
	args: CreateEnrollment.Args,
): Promise<CreateEnrollment.Response> => {
	const { courseId, userId } = args;

	const enrollment = await repository.createEnrollment({ courseId, userId });

	return enrollment;
};
