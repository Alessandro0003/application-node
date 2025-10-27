export namespace GetCourseById {
	export type Args = {
		id: string;
	};

	export type Response = {
		id: string;
		title: string;
		description: string | null;
	};
}

export namespace GetCourse {
	export type Args = {
		search?: string;
		orderBy?: "title" | "id";
		page?: number;
	};
	export type Response = {
		courses: {
			id: string;
			title: string;
			description: string | null;
			enrollments: number;
		}[];
		total: number;
	};
}
export namespace CreateCourse {
	export type Args = {
		title: string;
		description: string;
	};
	export type Response = {};
}
