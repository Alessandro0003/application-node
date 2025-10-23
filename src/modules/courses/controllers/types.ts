import type { SchemaToRequest } from "../../../types/request.ts";
import type { createCourse, getCourseById, getCourses } from "./schema.ts";

export type GetCourseByIdRequest = SchemaToRequest<typeof getCourseById>;
export type GetCoursesRequest = SchemaToRequest<typeof getCourses>;
export type CreateCourseRequest = SchemaToRequest<typeof createCourse>;
