import { faker } from "@faker-js/faker";
import { db } from "../../src/database/client.ts";
import { schema } from "../../src/database/schema.ts";

const { users } = schema;

interface MakeUsersProps {
	name?: string;
	email?: string;
	password?: string;
	role?: "student" | "manager";
}

export const makeUsers = async (props: MakeUsersProps) => {
	const { name, email, password, role } = props;

	const result = await db
		.insert(users)
		.values({
			email: email ?? faker.internet.email(),
			name: name ?? faker.person.fullName(),
			password: password ?? faker.internet.password(),
			role: role ?? "student",
		})
		.returning();

	return result[0];
};
