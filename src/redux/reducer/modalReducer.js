import * as actions from '../action/actionTypes';

export default function reducer(
    state = {
        show: false,
        title: '',
        message: '',
        closeButtonText: '',
        showSaveButton: true,
        showCloseButton: false,
        saveButtonText: '',
        showModal: false,
        saveButtonHandler: null,
        closeButtonHandler: null,
    },
    action,
) {
    // eslint-disable-next-line
    switch (action.type) {
        case actions.SHOW_MODAL: {
            return {
                ...state,
                showModal: true,
                title: action.title,
                message: action.message,
                showSaveButton: action.showSaveButton,
                showCloseButton: action.showCloseButton,
                saveButtonText: action.saveButtonText,
                closeButtonText: action.closeButtonText,
                saveButtonHandler: action.saveButtonHandler,
                closeButtonHandler: action.closeButtonHandler,
            };
        }
        case actions.CLOSE_MODAL: {
            //console.log("modalReducer-CLOSE_MODAL");
            return {
                ...state,
                showModal: false,
                title: '',
                message: '',
                showSaveButton: true,
                showCloseButton: false,
                saveButtonText: '',
                closeButtonText: '',
                saveButtonHandler: action.saveButtonHandler,
                closeButtonHandler: action.closeButtonHandler,
            };
        }
    }
    return state;
}
