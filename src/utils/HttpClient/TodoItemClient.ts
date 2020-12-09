import { Observable } from "rxjs";
import { HttpClient } from "./HttpClient";
import { IExistingTodoItem } from "./Interfaces";

export class TodoItemClient extends HttpClient {

	private static readonly routePrefix = "/api/auth/todo-item";

	public static getAllTodoItems(): Observable<IExistingTodoItem> {
		return this.getRequest<IExistingTodoItem>(this.routePrefix + "/all");
	}
}