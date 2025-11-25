import * as schemas from "./schema.ts";

const jwt = schemas.jwt.parse({
	JWT_SECRET: process.env.JWT_SECRET,
});

export const config = {
	jwt,
};
