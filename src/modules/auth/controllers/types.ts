import type { SchemaToRequest } from "../../../types/request";
import type { sessionUser } from "./schema.ts";

export type SessionUserRequest = SchemaToRequest<typeof sessionUser>;
