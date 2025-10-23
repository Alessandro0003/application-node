import z from "zod";

export const getCourses = z.object({});

export const createCourse = z.object({
	body: z.object({
		title: z.string().min(1, "Title is required"),
		description: z.string().min(1, "Description is required"),
	}),
});
