import { faker } from "@faker-js/faker";
import { db } from "../../src/database/client.ts";
import { courses } from "../../src/database/schema.ts";

export const makeCourse = async (title?: string) => {
	const result = await db
		.insert(courses)
		.values({
			title: title ?? faker.lorem.words(3),
		})
		.returning();

	return result[0];
};
