import { all } from "redux-saga/effects";
import { taskSaga } from "./modules/task/sagas";

export default function* rootSaga() {
  yield all([taskSaga()]);
}
