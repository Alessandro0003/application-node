import * as repository from "../repository/index.ts";
import type { CreateCourse, GetCourse, GetCourseById } from "./types.ts";

export const getCourseById = async (
	args: GetCourseById.Args,
): Promise<GetCourseById.Response> => {
	const { id } = args;

	const course = await repository.getCourseById({ id });

	return course;
};

export const getCourses = async (): Promise<GetCourse.Response> => {
	const courses = await repository.getCourses();

	return courses;
};

export const createCourse = async (
	args: CreateCourse.Args,
): Promise<CreateCourse.Response> => {
	const { title, description } = args;

	const courses = await repository.getCourses();
	const isTitleExists = courses.some((course) => course.title === title);

	if (isTitleExists) {
		throw new Error("Title already exists");
	}

	const course = await repository.createCourse({
		title,
		description,
	});

	return course;
};
