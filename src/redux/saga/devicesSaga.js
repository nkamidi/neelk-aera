import {call, put, takeLatest, takeEvery} from "redux-saga/effects";
import {push} from 'connected-react-router';
import * as actions from "../action/actionTypes";
import expensesApi from '../service/expensesApi';
import workoutLogApi from "../service/workoutLogApi";
import sortData from '../../utils/sortData';
import groupData from '../../utils/groupData';

function* uploadFile(data) {
    console.log("expensesSaga-uploadFile-data:", data);
    try {
        yield put({
            type: actions.UPLOAD_FILE_IN_PROGRESS
        });

        if (data.payload.file) {
            let _data = new FormData(), _results;
            _data.append('file', data.payload.file);
            _data.append('fileName', data.payload.file.name);

            const response = yield call(expensesApi.uploadFile, _data, data.payload.file.type);
            //const response = yield call(expensesApi.uploadFile, data.payload.fileData, data.payload.file.type);
            //console.log(response.data);

            if (response.status && response.status < 400) {
                _results = {
                    message: response.data.message,
                    recordCount: response.data.results && Array.isArray(response.data.results) ? response.data.results.length : 0
                };

                yield put({
                    type: actions.UPLOAD_FILE_SUCCESSFUL,
                    data: response.data.results,
                    results: _results
                });
            } else {
                _results = {
                    message: response.data.message ? response.data.message : "Upload failed",
                    recordCount: 0
                };
                yield put({
                    type: actions.UPLOAD_FILE_FAILED,
                    results: _results
                });
            }
        }
    } catch (err) {
        console.log("uploadFile failed. Error:", err);
        yield put({
            type: actions.UPLOAD_FILE_FAILED
        });
    }
}

function* getExpensesData(payload) {
    //console.log("expensesSaga-getExpensesData-payload:", payload);
    try {
        yield put({
            type: actions.GET_EXPENSES_DATA_IN_PROGRESS
        });

        const response = yield call(expensesApi.getExpensesData, payload.timePeriod);
        if (response.status && response.status < 400) {
            let allData = [], categoriesGrouped = {}, accountsGrouped = {}, transactionDateGrouped = {};
            if (response.data.expenses && Array.isArray(response.data.expenses) && response.data.expenses.length > 0) {
                allData = sortData(response.data.expenses, 'category', false);
                categoriesGrouped = sortData(groupData(response.data.expenses, 'category', 'amount'), 'value', false);
                accountsGrouped = sortData(groupData(response.data.expenses, 'accountName', 'amount'), 'category', true);
                transactionDateGrouped = sortData(groupData(response.data.expenses, 'transactionDate', 'amount'), 'category', true);
            }

            yield put({
                type: actions.GET_EXPENSES_DATA_SUCCESSFUL,
                data: {allData, categoriesGrouped, accountsGrouped, transactionDateGrouped}
            });
        } else {
            yield put({
                type: actions.GET_EXPENSES_DATA_FAILED
            });
        }
    } catch (err) {
        console.log("GET_EXPENSES_DATA_FAILED. Error:", err);
        yield put({
            type: actions.GET_EXPENSES_DATA_FAILED
        });
    }
}


export const expensesSaga = [
    takeLatest(actions.UPLOAD_FILE, uploadFile),
    takeLatest(actions.GET_EXPENSES_DATA, getExpensesData)
];
