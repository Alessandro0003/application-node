import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { schema } from "../../../database/schema";

const { users, courses } = schema;

export const enrollments = pgTable("enrollments", {
	userId: uuid()
		.notNull()
		.references(() => users.id),
	courseId: uuid()
		.notNull()
		.references(() => courses.id),
	createdAt: timestamp({
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
});
