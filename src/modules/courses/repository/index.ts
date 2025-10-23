import { db } from "../../../database/client.ts";
import { courses } from "../db/index.ts";
import type { CreateCourse, GetCourses } from "./types.ts";

export const getCourses = async (): Promise<GetCourses.Response> => {
	const result = await db.select().from(courses);

	return result.map((courses) => ({
		...courses,
		description: courses.description || "",
	}));
};

export const createCourse = async (
	args: CreateCourse.Args,
): Promise<CreateCourse.Response> => {
	const { title, description } = args;

	const course = await db.insert(courses).values({
		title,
		description,
	});

	return course;
};
