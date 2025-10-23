export namespace CreateCourse {
	export type Args = {
		title: string;
		description: string;
	};
	export type Response = {};
}

export namespace GetCourses {
	export type Args = {};
	export type Response = {
		id: string;
		title: string;
		description: string;
	}[];
}
