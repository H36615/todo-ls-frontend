
// -- Interfaces exported from backend

enum TodoItemStatus {
    todo = "todo",
    inProgres = "in_progress",
    done = "done",
    delayed = "delayed",
}

export interface INewTodoItem {
	user_id: number,
    task: string,
    status: TodoItemStatus,
}

export interface IExistingTodoItem extends INewTodoItem {
	id: number,
}

export interface INewUser extends ILoginInformation {
	username: string,
}

export interface ILoginInformation {
	email: string,
	password: string,
}