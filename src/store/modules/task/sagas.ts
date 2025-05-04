import { takeLatest, put, call } from "redux-saga/effects";
import { FETCH_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from "./types";
import {
  setTasks,
  setError,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  setLoading,
} from "./actions";
import { Task } from "./types";
import { taskApi } from "../../../api/taskApi";

function* fetchTasksSaga() {
  try {
    yield put(setLoading(true));
    const tasks: Task[] = yield call(taskApi.fetchTasks);
    yield put(setTasks(tasks));
    yield put(setError(null));
  } catch (error) {
    yield put(
      setError(error instanceof Error ? error.message : "An error occurred")
    );
  } finally {
    yield put(setLoading(false));
  }
}

function* addTaskSaga(action: { type: string; payload: Omit<Task, "id"> }) {
  try {
    // Generate temporary ID
    const tempId = Math.random().toString(36).substr(2, 9);
    const tempTask: Task = {
      id: tempId,
      ...action.payload,
    };

    // Update state immediately
    yield put(addTaskSuccess(tempTask));

    // Make API call in background
    const task: Task = yield call(taskApi.createTask, action.payload);

    // Replace temporary task with server task
    yield put(deleteTaskSuccess(tempId));
    yield put(addTaskSuccess(task));
    yield put(setError(null));
  } catch (error) {
    yield put(
      setError(error instanceof Error ? error.message : "An error occurred")
    );
  }
}

function* updateTaskSaga(action: { type: string; payload: Task }) {
  try {
    // Update state immediately
    yield put(updateTaskSuccess(action.payload));

    // Make API call in background
    const task: Task = yield call(taskApi.updateTask, action.payload);
    yield put(setError(null));
  } catch (error) {
    yield put(
      setError(error instanceof Error ? error.message : "An error occurred")
    );
  }
}

function* deleteTaskSaga(action: { type: string; payload: string }) {
  try {
    // Update state immediately
    yield put(deleteTaskSuccess(action.payload));

    // Make API call in background
    yield call(taskApi.deleteTask, action.payload);
    yield put(setError(null));
  } catch (error) {
    yield put(
      setError(error instanceof Error ? error.message : "An error occurred")
    );
  }
}

export function* taskSaga() {
  yield takeLatest(FETCH_TASKS, fetchTasksSaga);
  yield takeLatest(ADD_TASK, addTaskSaga);
  yield takeLatest(UPDATE_TASK, updateTaskSaga);
  yield takeLatest(DELETE_TASK, deleteTaskSaga);
}
