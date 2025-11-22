import * as schemas from "./schema.ts";

import "dotenv/config";

const jwt = schemas.jwt.parse({
	JWT_SECRET: process.env.JWT_SECRET,
});

export const config = {
	jwt,
};
