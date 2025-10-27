import { z } from "zod";

export const createEnrollment = z.object({
	body: z.object({
		courseId: z.string().uuid(),
		userId: z.string().uuid(),
	}),
});
