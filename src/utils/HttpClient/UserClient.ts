import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { HttpClient } from "./HttpClient";
import { INewUser } from "./Interfaces";

export class UserClient extends HttpClient {

	private static readonly routePrefix = "/api";

	public static signIn(email: string, password: string): Observable<AjaxResponse> {
		return this.postRequest<{ email: string, password: string }>(
			this.routePrefix + "/login",
			{ email: email, password: password },
		);
	}

	public static signUp(newUser: INewUser): Observable<AjaxResponse> {
		return this.postRequest<INewUser>(
			this.routePrefix + "/register",
			newUser,
		);
	}

}