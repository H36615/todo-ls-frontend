import { ajax } from "rxjs/ajax";
import { Observable } from "rxjs";
import { config } from "../../config/config";

export class HttpClient {

	public static getRequest<T>(route: string): Observable<T> {
		return ajax.get(config.backendUrl + route) as unknown as Observable<T>;
	}

	public static postRequest<BodyParam, T>(route: string, bodyParam: BodyParam): Observable<T> {
		return ajax.post(
			config.backendUrl + route,
			bodyParam,
			{ "Content-Type": "application/json" }
		) as unknown as Observable<T>;
	}

	/** Health check */
	public static checkHealth(): Observable<{ status: string }> {
		return this.getRequest<{ status: string }>("/api/health");
	}
}