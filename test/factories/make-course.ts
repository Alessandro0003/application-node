import { faker } from "@faker-js/faker";
import { db } from "../../src/database/client.ts";
import { schema } from "../../src/database/schema.ts";

const { courses } = schema;

export const makeCourse = async (title?: string) => {
	const result = await db
		.insert(courses)
		.values({
			title: title ?? faker.lorem.words(3),
		})
		.returning();

	return result[0];
};
