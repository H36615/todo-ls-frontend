import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "./HttpClient";
import { IExistingTodoItem } from "./Interfaces";

export class TodoItemClient extends HttpClient {

	private static readonly routePrefix = "/api/auth/todo-item";

	public static getAllTodoItems(): Observable<IExistingTodoItem[]> {
		return this.getRequest(this.routePrefix + "/all")
			.pipe(map(response => response.response as IExistingTodoItem[]));
	}
}