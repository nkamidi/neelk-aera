import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AlertMessage from '../../Alerts/AlertMessage';
import Tooltip from '@material-ui/core/Tooltip';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import {Container, Row, Col, Button, Form, FormControl} from 'react-bootstrap';

import addEditDeviceStyles from './addEditDeviceStyles';

const mapStateToProps = ({devicesReducer}) => {
    const {requestInProgress} = devicesReducer;

    return {
        requestInProgress
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveDevice: (data) => {
            dispatch({type: 'ADD_NEW_DEVICE', data: {deviceName: data.deviceName, deviceType: data.deviceType}});
        }
    }
};

class AddEditDevice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formValidated: false,
            data: {
                deviceName: '',
                deviceType: 0
            }
        };
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(props, state) {
        const {requestInProgress} = props;

        if (!requestInProgress) {
            return {
                ...state,
                requestInProgress
            };
        }

        return {
            ...state
        };
    }

    handleChange = e => {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value.trim()}
        });
    };

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            this.props.saveDevice(this.state.data);
        }

        this.setState({formValidated: true});
    }

    render() {
        const {classes, requestInProgress, onClose} = this.props;
        const {formValidated} = this.state;

        return (
            <Container className={classes.viewContainer}>
                <Row style={{
                    minHeight: '200px',
                    height: 'auto !important'
                }}>
                    <Col lg={1}></Col>
                    <Col lg={10} style={{border: '0px solid red'}}>
                        <div>
                            <h3>Add New Device</h3>
                        </div>
                        <div style={{width: '100%', marginTop: '40px', padding: '20px 0'}}>
                            <Form
                                noValidate
                                validated={formValidated}
                                autoComplete="off"
                                onSubmit={e => this.handleSubmit(e)}
                                disabled={!!requestInProgress}
                            >
                                <Form.Row>
                                    <Form.Group as={Col} controlId="deviceName">
                                        <Form.Label className={classes.fieldLabel}>Device Name*</Form.Label>
                                        <Form.Control type="text" name="deviceName" placeholder=""
                                                      onChange={this.handleChange} required/>
                                        <FormControl.Feedback type="invalid">
                                            Please enter node name.
                                        </FormControl.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="deviceType">
                                        <Form.Label className={classes.fieldLabel}>Device Type*</Form.Label>
                                        <Form.Control as="select" name="deviceType" onChange={this.handleChange}
                                                      required>
                                            {
                                                Object.entries(this.props.deviceTypes).map((deviceType, key) => {
                                                    return <option key={key} value={deviceType[0]}>{deviceType[1]}</option>
                                                })
                                            }
                                        </Form.Control>
                                        <FormControl.Feedback type="invalid">
                                            Please select device type.
                                        </FormControl.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <div className={classes.alertRow}
                                     style={{minHeight: '30px', height: 'auto !important'}}>
                                    <Col>
                                        <AlertMessage/>
                                    </Col>
                                </div>

                                <div style={{minHeight: '30px', float: 'right', paddingRight: '30px'}}>
                                    <Button type="submit">Save</Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col lg={1}>
                        <div style={{float: 'right', paddingRight: '10px'}}>
                            <Tooltip title="Close">
                                <IconButton aria-label="Close" className={classes.margin} onClick={onClose}>
                                    <CloseIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

AddEditDevice.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(addEditDeviceStyles)(AddEditDevice));