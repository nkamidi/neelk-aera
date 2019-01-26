import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import {Container, Row, Col, Button, Collapse} from 'react-bootstrap';

import {getDeviceTypes, getDevices} from '../../redux/action/devicesAction';
import AddEditDevice from './AddEditDevice/AddEditDevice';

import devicesStyles from './devicesStyles';

const tableHeaderTitles = [{id: "node_name", label: "Device Name", numeric: false}, {
    id: "type",
    label: "Device Type",
    numeric: false
}];

function desc(a, b, orderBy) {
    let _a = typeof a[orderBy] === 'string' ? a[orderBy].toLowerCase() : a[orderBy];
    let _b = typeof b[orderBy] === 'string' ? b[orderBy].toLowerCase() : b[orderBy];

    if (_b < _a) {
        return -1;
    }
    if (_b > _a) {
        return 1;
    }

    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class TableHeader extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {tableHeaderTitles.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                                style={{fontWeight: 600, fontSize: '16px'}}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

const mapStateToProps = ({devicesReducer}) => {
    const {requestInProgress, deviceTypes, devices} = devicesReducer;

    return {
        requestInProgress,
        deviceTypes,
        devices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDevices: () => {
            dispatch(getDevices());
        },
        getDeviceTypes: () => {
            dispatch(getDeviceTypes());
        },
        hideAlert: () => {
            dispatch({type: 'HIDE_ALERT'});
        }
    }
};

class Devices extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'node_name',
            page: 0,
            rowsPerPage: 10,
            showAddNode: false
        };
    }

    componentDidMount() {
        this.props.getDeviceTypes();
        this.props.getDevices();
    }

    static getDerivedStateFromProps(props, state) {
        const {requestInProgress, devicesList} = props;

        if (!requestInProgress) {
            return {
                ...state,
                requestInProgress,
                devicesList
            };
        }

        return {
            ...state
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    toggleAddNewNode(e) {
        if (!!this.state.showAddNode) {
            this.props.hideAlert();
        }
        this.setState({showAddNode: !this.state.showAddNode});
    }

    deviceTypeName(type) {
        return this.props.deviceTypes[type] ? this.props.deviceTypes[type] : 'Unknown';
    }

    render() {
        const {classes, requestInProgress, deviceTypes, devices} = this.props;
        const {order, orderBy, rowsPerPage, page} = this.state;

        return (
            <Container className={classes.viewContainer}>
                {
                    !this.state.showAddNode ?
                        <Fragment>
                            <Row>
                                <Col>
                                    <h2>Devices</h2>
                                </Col>
                            </Row>
                            <Row style={{height: '30px', marginBottom: '20px'}}>
                                <Col>
                                    <div style={{float: 'right'}}><Button size="sm" onClick={() => {
                                        this.toggleAddNewNode()
                                    }}>{this.state.showAddNode ? 'Hide' : 'Add New Device'}</Button></div>
                                </Col>
                            </Row>
                        </Fragment>
                        : (null)
                }
                {
                    !!this.state.showAddNode ?
                        <Row className={classes.addEditDiv}>
                            <Col>
                                <AddEditDevice deviceTypes={deviceTypes} onClose={(e) => this.toggleAddNewNode(e)}/>
                            </Col>
                        </Row> : (null)
                }

                <Row>
                    <Col>
                        <Paper className={classes.root}>
                            {
                                devices.TopologyNodes && Array.isArray(devices.TopologyNodes) && devices.TopologyNodes.length > 0 ?
                                    (
                                        <Fragment>
                                            <div>
                                                <Table className={classes.table}>
                                                    <TableHeader
                                                        onRequestSort={this.handleRequestSort}
                                                        order={order}
                                                        orderBy={orderBy}
                                                        rowCount={devices.TopologyNodes.length}
                                                    />
                                                    <TableBody>
                                                        {
                                                            devices.TopologyNodes ? (
                                                                stableSort(devices.TopologyNodes, getSorting(order, orderBy))
                                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                    .map((node, index) => {
                                                                        return <TableRow key={index}>
                                                                            <TableCell component="th"
                                                                                       scope="row">{node.node_name}</TableCell>
                                                                            <TableCell
                                                                                align="right">{this.deviceTypeName(node.type)}</TableCell>
                                                                        </TableRow>
                                                                    })
                                                            ) : (null)
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </div>

                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25]}
                                                component="div"
                                                count={devices.TopologyNodes && Array.isArray(devices.TopologyNodes) ? devices.TopologyNodes.length : 0}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                backIconButtonProps={{
                                                    'aria-label': 'Previous Page',
                                                }}
                                                nextIconButtonProps={{
                                                    'aria-label': 'Next Page',
                                                }}
                                                onChangePage={this.handleChangePage}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            />
                                        </Fragment>
                                    )
                                    : (<h3>No data is available</h3>)
                            }
                        </Paper>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Devices.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(devicesStyles)(Devices));