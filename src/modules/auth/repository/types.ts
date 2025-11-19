export namespace SessionUser {
	export type Args = {
		email: string;
	};

	export type Response =
		| {
				id: string;
				name: string;
				email: string;
				password: string;
		  }
		| undefined;
}
