
// -- Interfaces exported from backend

export enum TodoItemStatus {
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

export interface IExistingUser extends INewUser {
	id: number,
	tag: number, // Number value to seperate users w/ identical usernames.
}

export interface INewUser extends ILoginInformation {
	username: string,
}

export interface ILoginInformation {
	email: string,
	password: string,
}