import { Task } from "./types";
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  FETCH_TASKS,
  SET_TASKS,
  SET_ERROR,
  SET_LOADING,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from "./types";

export const addTask = (task: Omit<Task, "id">) => ({
  type: ADD_TASK,
  payload: task,
});

export const addTaskSuccess = (task: Task) => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

export const updateTask = (task: Task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const updateTaskSuccess = (task: Task) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: task,
});

export const deleteTask = (taskId: string) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const deleteTaskSuccess = (taskId: string) => ({
  type: DELETE_TASK_SUCCESS,
  payload: taskId,
});

export const fetchTasks = () => ({
  type: FETCH_TASKS,
});

export const setTasks = (tasks: Task[]) => ({
  type: SET_TASKS,
  payload: tasks,
});

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});
