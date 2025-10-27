import { pgTable, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { schema } from "../../../database/schema.ts";

const { users, courses } = schema;

export const enrollments = pgTable(
	"enrollments",
	{
		id: uuid().primaryKey().defaultRandom(),
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
	},
	(table) => [uniqueIndex().on(table.userId, table.courseId)],
);
