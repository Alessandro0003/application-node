import type { SchemaToRequest } from "../../../types/request.ts";
import type { createCourse, getCourses } from "./schema.ts";

export type GetCoursesRequest = SchemaToRequest<typeof getCourses>;
export type CreateCourseRequest = SchemaToRequest<typeof createCourse>;
