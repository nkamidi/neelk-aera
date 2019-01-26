import * as actions from '../action/actionTypes';

export default function reducer(
    state = {
        show: false,
        messages: '',
        autoClose: true,
    },
    action,
) {
    switch (action.type) {
        case actions.OPEN_NOTIFICATION: {
            //console.log("notificationReducer-action:", action);
            const { data } = action.payload;
            return {
                ...state,
                open: true,
                messages: data.messages,
                autoClose: data.autoClose,
            };
        }
        case actions.CLOSE_NOTIFICATION: {
            return {
                ...state,
                open: false,
                messages: '',
                autoClose: true,
            };
        }
        default: {
            return state;
        }
    }
}
