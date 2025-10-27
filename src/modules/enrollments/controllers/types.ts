import type { SchemaToRequest } from "../../../types/request.ts";
import type { createEnrollment } from "./schema.ts";

export type CreateEnrollmentRequest = SchemaToRequest<typeof createEnrollment>;
