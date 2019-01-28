import {call, put, takeLatest} from "redux-saga/effects";
import * as actions from "../action/actionTypes";
import booksApi from '../service/booksApi';

function* getBooksList() {
    try {
        yield put({
            type: actions.GET_BOOKS_LIST_IN_PROGRESS
        });

        const response = yield call(booksApi.getBooksList);

        if (response && response.status < 400) {
            yield put({
                type: actions.GET_BOOKS_LIST_SUCCESSFUL,
                data: response.data.results
            });
        } else {
            yield put({
                type: actions.GET_BOOKS_LIST_FAILED,
                error: response.errors
            });
        }
    } catch (err) {
        console.log("getBooksList. Error:", err);
        yield put({
            type: actions.GET_BOOKS_LIST_FAILED
        });
    }
}

export const booksSaga = [
    takeLatest(actions.GET_BOOKS_LIST, getBooksList)
];
