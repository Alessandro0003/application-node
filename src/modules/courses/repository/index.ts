import { and, desc, eq, ilike, type SQL } from "drizzle-orm";
import { db } from "../../../database/client.ts";
import { courses } from "../db/index.ts";
import type { CreateCourse, GetCourseById, GetCourses } from "./types.ts";

export const getCourseById = async (
	args: GetCourseById.Args,
): Promise<GetCourseById.Response> => {
	const { id } = args;

	const result = await db.select().from(courses).where(eq(courses.id, id));

	const course = result[0];

	return {
		...course,
		description: course.description || "",
	};
};

export const getCourses = async (
	args: GetCourses.Args,
): Promise<GetCourses.Response> => {
	const { search, orderBy, page } = args;

	const orderByColumn = orderBy === "id" ? courses.id : courses.title;

	const currentPage = page ?? 1;

	const conditions: SQL[] = [];

	if (search) {
		conditions.push(ilike(courses.title, `%${search}%`));
	}

	const [result, total] = await Promise.all([
		db
			.select()
			.from(courses)
			.orderBy(desc(orderByColumn))
			.offset((currentPage - 1) * 2)
			.limit(2)
			.where(and(...conditions)),

		db.$count(courses, and(...conditions)),
	]);

	const allCourse = result.map((courses) => ({
		...courses,
		description: courses.description || "",
	}));

	return {
		courses: allCourse,
		total,
	};
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
