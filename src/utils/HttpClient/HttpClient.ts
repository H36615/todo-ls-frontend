import { ajax } from "rxjs/ajax";
import { Observable } from "rxjs";
import { config } from "../../config/config";
import { AjaxResponse } from "rxjs/internal/observable/dom/AjaxObservable";

export class HttpClient {

	public static getRequest<T>(route: string, withCredentials = true): Observable<T> {
		return ajax(
			{
				url: config.backendUrl + route,
				method: "GET",
				withCredentials: withCredentials,
				headers: {
					"Content-Type": "application/json",
				},
			}
		) as unknown as Observable<T>;
	}

	public static postRequest<BodyParam>(
		route: string,
		bodyParam: BodyParam,
		withCredentials = true
	)
		: Observable<AjaxResponse> {
		return ajax(
			{
				url: config.backendUrl + route,
				method: "POST",
				body: bodyParam,
				withCredentials: withCredentials,
				headers: {
					"Content-Type": "application/json",
				}
			}
		);
	}

	/** Health check */
	public static checkHealth(): Observable<{ status: string }> {
		return this.getRequest<{ status: string }>("/api/health");
	}
}