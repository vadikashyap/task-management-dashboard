import { RootState } from "../../index";

export const selectTasks = (state: RootState) => state.task.tasks;
export const selectLoading = (state: RootState) => state.task.loading;
export const selectError = (state: RootState) => state.task.error;
