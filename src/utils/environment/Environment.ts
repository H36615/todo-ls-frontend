import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

export class EnvironmentUtils {

	public static getSourceCodeLink(): string {
		if (process.env.REACT_APP_SOURCE_CODE_LINK != undefined)
			return process.env.REACT_APP_SOURCE_CODE_LINK;

		throw new Error(
			"Wrong value in env.REACT_APP_SOURCE_CODE_LINK, which was: "
			+ process.env.REACT_APP_SOURCE_CODE_LINK
		);
	}

	public static getBackendUrl(): string {
		if (process.env.REACT_APP_BACKEND_URL != undefined)
			return process.env.REACT_APP_BACKEND_URL;

		throw new Error(
			"Wrong value in env.REACT_APP_BACKEND_URL, which was: "
			+ process.env.REACT_APP_BACKEND_URL
		);
	}

	public static getTestPublicUserEmail(): string {
		if (process.env.REACT_APP_PUBLIC_TEST_USER_EMAIL != undefined)
			return process.env.REACT_APP_PUBLIC_TEST_USER_EMAIL;

		throw new Error(
			"Wrong value in env.REACT_APP_PUBLIC_TEST_USER_EMAIL, which was: "
			+ process.env.REACT_APP_PUBLIC_TEST_USER_EMAIL
		);
	}

	public static getTestPublicUserPassword(): string {
		if (process.env.REACT_APP_PUBLIC_TEST_USER_PASSWORD != undefined)
			return process.env.REACT_APP_PUBLIC_TEST_USER_PASSWORD;

		throw new Error(
			"Wrong value in env.REACT_APP_PUBLIC_TEST_USER_PASSWORD, which was: "
			+ process.env.REACT_APP_PUBLIC_TEST_USER_PASSWORD
		);
	}
}