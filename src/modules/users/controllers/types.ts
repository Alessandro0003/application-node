import type { SchemaToRequest } from "../../../types/request";
import type { createUser } from "./schema";

export type CreateUserRequest = SchemaToRequest<typeof createUser>;
