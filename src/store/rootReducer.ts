import { combineReducers } from "@reduxjs/toolkit";
import { taskReducer } from "./modules/task/reducers";

const rootReducer = combineReducers({
  task: taskReducer,
});

export default rootReducer;
