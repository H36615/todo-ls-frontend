import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "./HttpClient";
import { IExistingTodoItem, INewTodoItem } from "./Interfaces";

export class TodoItemClient extends HttpClient {

	private static readonly routePrefix = "/api/auth/todo-item";

	public static getAllTodoItems(): Observable<IExistingTodoItem[]> {
		return this.getRequest(this.routePrefix + "/all")
			.pipe(map(response => response.response as IExistingTodoItem[]));
	}

	public static addTodoItem(
		todoItem: Omit<INewTodoItem, "user_id">
	): Observable<unknown> {
		return this.postRequest(this.routePrefix + "/add", todoItem)
			.pipe(map(response => response.response as unknown));
	}

	public static updateTodoItem(
		todoItem: Omit<IExistingTodoItem, "user_id">
	): Observable<unknown> {
		return this.putRequest(this.routePrefix + "/update", todoItem)
			.pipe(map(response => response.response as unknown));
	}

	public static deleteTodoItem(
		todoItem: Pick<IExistingTodoItem, "id">
	): Observable<unknown> {
		return this.deleteRequest(this.routePrefix + "/one", todoItem)
			.pipe(map(response => response.response as unknown));
	}
}