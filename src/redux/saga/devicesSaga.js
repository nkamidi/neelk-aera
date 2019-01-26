import {call, put, takeLatest, takeEvery} from "redux-saga/effects";
import * as actions from "../action/actionTypes";
import devicesApi from '../service/devicesApi';

function* getDevices() {
    try {
        yield put({
            type: actions.GET_DEVICES_IN_PROGRESS
        });

        const response = yield call(devicesApi.getNodes);

        // Since this mock data I'll just check for response.data instead of checking for response.status
        if (response && response.data) {
            yield put({
                type: actions.GET_DEVICES_SUCCESSFUL,
                data: response.data
            });
        } else {
            yield put({
                type: actions.GET_DEVICES_FAILED
            });
        }
    } catch (err) {
        console.log("getNodes. Error:", err);
        yield put({
            type: actions.GET_DEVICES_FAILED
        });
    }
}

function* getDeviceTypes() {
    try {
        yield put({
            type: actions.GET_DEVICE_TYPES_IN_PROGRESS
        });

        const response = yield call(devicesApi.getDevicesList);

        // Since this mock data I'll just check for response.data instead of checking for response.status
        if (response && response.data) {
            /*const _devicesList = Object.entries(response.data).map(item => {
                return {id: Number(item[0]), type: item[1]}
            });*/

            yield put({
                type: actions.GET_DEVICE_TYPES_SUCCESSFUL,
                data: response.data
            });
        } else {
            yield put({
                type: actions.GET_DEVICE_TYPES_FAILED
            });
        }
    } catch (err) {
        console.log("getDevicesTypes. Error:", err);
        yield put({
            type: actions.GET_DEVICE_TYPES_FAILED
        });
    }
}

function* AddNewDevice(payload) {
    try {
        yield put({
            type: actions.ADD_NEW_DEVICE_IN_PROGRESS
        });

        const response = yield call(devicesApi.addNewDevice, payload.data);

        // Since this mock data I'll just check for response.data instead of checking for response.status
        if (response.status && response.status === 'success') {
            yield [put({
                type: actions.ADD_NEW_DEVICE_SUCCESSFUL,
                data: payload.data
            }),
                put({
                    type: actions.SHOW_ALERT,
                    payload: {
                        data: {
                            variant: 'info',
                            show: true,
                            message: 'Device was added successfully',
                            autoClose: false,
                            dismissible: true
                        },
                    },
                })];
        } else {
            yield [put({
                type: actions.ADD_NEW_DEVICE_FAILED
            }),
                put({
                    type: actions.SHOW_ALERT,
                    payload: {
                        data: {
                            variant: 'danger',
                            show: true,
                            message: `Device could not be added. Error: ${response.message}`,
                            autoClose: false,
                            dismissible: true
                        },
                    },
                })];
        }
    } catch (err) {
        console.log("AddNewDevice. Error:", err);
        yield put({
            type: actions.ADD_NEW_DEVICE_FAILED
        });
    }
}

export const devicesSaga = [
    takeLatest(actions.GET_DEVICES, getDevices),
    takeLatest(actions.GET_DEVICE_TYPES, getDeviceTypes),
    takeEvery(actions.ADD_NEW_DEVICE, AddNewDevice)
];
