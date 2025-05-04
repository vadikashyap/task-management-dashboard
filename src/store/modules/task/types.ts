export interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Action Types
export const ADD_TASK = "task/ADD_TASK";
export const ADD_TASK_SUCCESS = "task/ADD_TASK_SUCCESS";
export const UPDATE_TASK = "task/UPDATE_TASK";
export const UPDATE_TASK_SUCCESS = "task/UPDATE_TASK_SUCCESS";
export const DELETE_TASK = "task/DELETE_TASK";
export const DELETE_TASK_SUCCESS = "task/DELETE_TASK_SUCCESS";
export const FETCH_TASKS = "task/FETCH_TASKS";
export const SET_TASKS = "task/SET_TASKS";
export const SET_ERROR = "task/SET_ERROR";
export const SET_LOADING = "task/SET_LOADING";
