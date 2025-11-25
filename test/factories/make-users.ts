import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import { hash } from "argon2";
import jwt from "jsonwebtoken";
import { config } from "../../src/config/index.ts";
import { db } from "../../src/database/client.ts";
import { users } from "../../src/database/schema.ts";

export const makeUsers = async (role?: "manager" | "student") => {
	const passwordBeforeHash = randomUUID();

	const result = await db
		.insert(users)
		.values({
			email: faker.internet.email(),
			name: faker.person.fullName(),
			password: await hash(passwordBeforeHash),
			role,
		})
		.returning();

	return {
		user: result[0],
		passwordBeforeHash,
	};
};

export const makeAuthenticateUser = async (role: "manager" | "student") => {
	const { user } = await makeUsers(role);

	const token = jwt.sign(
		{ sub: user.id, role: user.role },
		config.jwt.JWT_SECRET,
	);

	return { user, token };
};
