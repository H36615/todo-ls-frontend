import { Observable } from "rxjs";
import { HttpClient } from "./HttpClient";
import { INewUser } from "./Interfaces";

export class UserClient extends HttpClient {

	private static readonly routePrefix = "/api";

	public static signIn(email: string, password: string): Observable<unknown> {
		return this.postRequest<{ email: string, password: string }, unknown>(
			this.routePrefix + "/login",
			{ email: email, password: password },
		);
	}

	public static signUp(newUser: INewUser): Observable<unknown> {
		return this.postRequest<INewUser, unknown>(
			this.routePrefix + "/register",
			newUser,
		);
	}

}