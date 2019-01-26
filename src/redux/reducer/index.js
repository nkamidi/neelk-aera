import {combineReducers} from 'redux';
import modalReducer from './modalReducer';
import devicesReducer from './devicesReducer';
import notificationReducer from './notificationReducer';
import alertReducer from './alertReducer';

export default combineReducers({
    modalReducer,
    notificationReducer,
    alertReducer,
    devicesReducer
});
