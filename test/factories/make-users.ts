import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import { hash } from "argon2";
import { db } from "../../src/database/client.ts";
import { users } from "../../src/database/schema.ts";

export const makeUsers = async () => {
	const passwordBeforeHash = randomUUID();

	const result = await db
		.insert(users)
		.values({
			email: faker.internet.email(),
			name: faker.person.fullName(),
			password: await hash(passwordBeforeHash),
		})
		.returning();

	return {
		user: result[0],
		passwordBeforeHash,
	};
};
