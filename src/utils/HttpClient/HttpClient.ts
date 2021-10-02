import { ajax } from "rxjs/ajax";
import { Observable } from "rxjs";
import { AjaxResponse } from "rxjs/internal/observable/dom/AjaxObservable";
import { catchError, timeout } from "rxjs/operators";
import { EnvironmentUtils } from "../environment/Environment";

export class HttpClient {

	private static readonly timeOutInMillis = 5000;

	public static getRequest(route: string, withCredentials = true): Observable<AjaxResponse> {
		return ajax(
			{
				url: EnvironmentUtils.getBackendUrl() + route,
				method: "GET",
				withCredentials: withCredentials,
				headers: {
					"Content-Type": "application/json",
				},
			}
		).pipe(
			timeout(this.timeOutInMillis),
			catchError(() => {
				// TODO toast this.
				throw new Error("Request timed out");
			})
		);
	}

	public static postRequest<BodyParam>(
		route: string,
		bodyParam: BodyParam,
		method = "POST",
		withCredentials = true
	): Observable<AjaxResponse> {
		return ajax(
			{
				url: EnvironmentUtils.getBackendUrl() + route,
				method: method,
				body: bodyParam,
				withCredentials: withCredentials,
				headers: {
					"Content-Type": "application/json",
				}
			}
		).pipe(
			timeout(this.timeOutInMillis),
			catchError(() => {
				// TODO toast this.
				throw new Error("Request timed out");
			})
		);
	}

	public static putRequest<BodyParam>(
		route: string,
		bodyParam: BodyParam,
		withCredentials = true
	): Observable<AjaxResponse> {
		return this.postRequest(route, bodyParam, "PUT", withCredentials);
	}

	public static deleteRequest<BodyParam>(
		route: string,
		bodyParam: BodyParam,
		withCredentials = true
	): Observable<AjaxResponse> {
		return this.postRequest(route, bodyParam, "DELETE", withCredentials);
	}

	/** Health check */
	public static checkHealth(): Observable<AjaxResponse> {
		return this.getRequest("/api/health");
	}
}