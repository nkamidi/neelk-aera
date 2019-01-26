import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import userAuthReducer from './userAuthReducer';
import notificationReducer from './notificationReducer';
import alertReducer from './alertReducer';
import workoutLogReducer from './workoutLogReducer';
import expensesReducer from './expensesReducer';

export default combineReducers({
    modalReducer,
    userAuthReducer,
    notificationReducer,
    alertReducer,
    workoutLogReducer,
    expensesReducer
});
