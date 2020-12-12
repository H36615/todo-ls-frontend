import { ajax } from "rxjs/ajax";
import { Observable } from "rxjs";
import { config } from "../../config/config";
import { AjaxResponse } from "rxjs/internal/observable/dom/AjaxObservable";

export class HttpClient {

	public static getRequest<T>(route: string): Observable<T> {
		return ajax.get(config.backendUrl + route) as unknown as Observable<T>;
	}

	public static postRequest<BodyParam>(
		route: string, bodyParam: BodyParam
	): Observable<AjaxResponse> {
		return ajax.post(
			config.backendUrl + route,
			bodyParam,
			{ "Content-Type": "application/json" }
		);
	}

	/** Health check */
	public static checkHealth(): Observable<{ status: string }> {
		return this.getRequest<{ status: string }>("/api/health");
	}
}