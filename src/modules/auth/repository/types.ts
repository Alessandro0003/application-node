export namespace SessionUser {
	export type Args = {
		email: string;
	};

	export type Response = {
		id: string;
		name: string;
		password: string;
		email: string;
		role: string;
	};
}
