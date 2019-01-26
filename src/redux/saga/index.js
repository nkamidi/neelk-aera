import { all } from 'redux-saga/effects';
import { userLoginSaga } from './userLoginSaga';
import { workoutLogSaga } from './workoutLogSaga';
import { expensesSaga} from "./expensesSaga";

export default function* rootSaga() {
    yield all([...userLoginSaga, ...workoutLogSaga, ...expensesSaga]);
}
