import * as actions from '../action/actionTypes';

const allowedAlertTypes = ['info', 'primary', 'secondary', 'success', 'danger', 'warning', 'light', 'dark'];
const defaultVariant = 'info';

export default function reducer(
    state = {
        variant: 'success',
        dismissible: true,
        show: false,
        message: '',
        autoClose: true,
    },
    action,
) {
    switch (action.type) {
        case actions.SHOW_ALERT: {
            const {data} = action.payload;
            return {
                ...state,
                variant: allowedAlertTypes.indexOf(data.variant) > -1 ? data.variant : defaultVariant,
                dismissible: !!data.dismissible,
                show: true,
                message: data.message,
                autoClose: data.autoClose,
            };
        }
        case actions.HIDE_ALERT: {
            return {
                ...state,
                variant: defaultVariant,
                dismissible: true,
                show: false,
                message: '',
                autoClose: true,
            };
        }
        default: {
            return state;
        }
    }
}
