import { ajax } from "rxjs/ajax";
import { Observable } from "rxjs";
import { config } from "../../config/config";
import { AjaxResponse } from "rxjs/internal/observable/dom/AjaxObservable";

export class HttpClient {

	public static getRequest(route: string, withCredentials = true): Observable<AjaxResponse> {
		return ajax(
			{
				url: config.backendUrl + route,
				method: "GET",
				withCredentials: withCredentials,
				headers: {
					"Content-Type": "application/json",
				},
			}
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
				url: config.backendUrl + route,
				method: method,
				body: bodyParam,
				withCredentials: withCredentials,
				headers: {
					"Content-Type": "application/json",
				}
			}
		);
	}

	public static putRequest<BodyParam>(
		route: string,
		bodyParam: BodyParam,
		withCredentials = true
	): Observable<AjaxResponse> {
		return this.postRequest(route, bodyParam, "PUT", withCredentials);
	}

	/** Health check */
	public static checkHealth(): Observable<AjaxResponse> {
		return this.getRequest("/api/health");
	}
}