export default function reducer(
    state = {
        requestInProgress: false,
        devicesList: [],
        nodes: [],
        activeRecord: {},
        nextIdValue: 200
    },
    action,
) {
    switch (action.type) {
        case 'GET_NODES_IN_PROGRESS': {
            return {
                ...state,
                requestInProgress: true,
            };
        }
        case 'GET_NODES_SUCCESSFUL': {
            return {
                ...state,
                requestInProgress: false,
                nodes: action.data,
            };
        }
        case 'GET_NODES_FAILED': {
            return {
                ...state,
                requestInProgress: false,
                nodes: []
            };
        }
        case 'GET_DEVICE_LIST_IN_PROGRESS': {
            return {
                ...state,
                requestInProgress: true,
            };
        }
        case 'GET_DEVICE_LIST_SUCCESSFUL': {
            return {
                ...state,
                requestInProgress: false,
                devicesList: action.data,
            };
        }
        case 'GET_DEVICE_LIST_FAILED': {
            return {
                ...state,
                requestInProgress: false,
                devicesList: []
            };
        }
        case 'ADD_NEW_DEVICE_IN_PROGRESS': {
            return {
                ...state,
                requestInProgress: true,
            };
        }
        case 'ADD_NEW_DEVICE_SUCCESSFUL': {
            let _newDevicesList = [].concat(state.devicesList);

            // pushing the entry to global store to avoid web service call
            _newDevicesList.push({id: state.nextIdValue, type: action.data.deviceType});

            return {
                ...state,
                requestInProgress: false,
                devicesList: _newDevicesList,
                nextIdValue: state.nextIdValue + 1
            };
        }
        case 'ADD_NEW_DEVICE_FAILED': {
            return {
                ...state,
                requestInProgress: false
            };
        }
        default: {
            return {...state};
        }
    }
}
