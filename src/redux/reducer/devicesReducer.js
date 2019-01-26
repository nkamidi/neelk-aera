import createRandomString from '../../utils/createRandomString';

export default function reducer(
    state = {
        requestInProgress: false,
        deviceTypes: [],
        devices: [],
        activeRecord: {}
    },
    action,
) {
    switch (action.type) {
        case 'GET_DEVICES_IN_PROGRESS': {
            return {
                ...state,
                requestInProgress: true,
            };
        }
        case 'GET_DEVICES_SUCCESSFUL': {
            return {
                ...state,
                requestInProgress: false,
                devices: action.data,
            };
        }
        case 'GET_DEVICES_FAILED': {
            return {
                ...state,
                requestInProgress: false,
                devices: []
            };
        }
        case 'GET_DEVICE_TYPES_IN_PROGRESS': {
            return {
                ...state,
                requestInProgress: true,
            };
        }
        case 'GET_DEVICE_TYPES_SUCCESSFUL': {
            return {
                ...state,
                requestInProgress: false,
                deviceTypes: action.data,
            };
        }
        case 'GET_DEVICE_TYPES_FAILED': {
            return {
                ...state,
                requestInProgress: false,
                deviceTypes: []
            };
        }
        case 'ADD_NEW_DEVICE_IN_PROGRESS': {
            return {
                ...state,
                requestInProgress: true,
            };
        }
        case 'ADD_NEW_DEVICE_SUCCESSFUL': {
            let _newDevices = [].concat(state.devices.TopologyNodes);

            // pushing the entry to global store to avoid web service call
            _newDevices.push({
                device_id: createRandomString(),
                node_id: createRandomString(),
                node_name: action.data.deviceName,
                parent_id: createRandomString(),
                type: action.data.deviceType
            });

            return {
                ...state,
                requestInProgress: false,
                devices: {TopologyNodes: _newDevices}
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
