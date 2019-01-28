export default function reducer(
    state = {
        requestInProgress: false,
        booksList: [],
        showBookDetails: false,
        activeBook: {}
    },
    action,
) {
    switch (action.type) {
        case 'GET_BOOKS_LIST_IN_PROGRESS': {
            return {
                ...state,
                requestInProgress: true,
            };
        }
        case 'GET_BOOKS_LIST_SUCCESSFUL': {
            return {
                ...state,
                requestInProgress: false,
                booksList: action.data,
            };
        }
        case 'GET_BOOKS_LIST_FAILED': {
            return {
                ...state,
                requestInProgress: false,
                booksList: []
            };
        }
        case 'SHOW_BOOK_DETAILS': {
            return {
                ...state,
                showBookDetails: true,
                activeBook: action.bookData,
            };
        }
        case 'HIDE_BOOK_DETAILS': {
            return {
                ...state,
                showBookDetails: false,
                activeBook: {}
            };
        }
        default: {
            return {...state};
        }
    }
}
