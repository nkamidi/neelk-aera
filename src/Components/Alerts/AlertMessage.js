import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, Collapse} from 'react-bootstrap';
import * as actions from "../../redux/action/actionTypes";

const mapDispatchToProps = dispatch => {
    return {
        closeNotification: () => {
            dispatch({
                type: actions.HIDE_ALERT
            });
        }
    }
};

const mapStateToProps = (state) => {
    // console.log("AlertMessage-mapStateToProps-state:", state);
    // console.log("AlertMessage-mapStateToProps-state:", state.alertReducer);
    const {variant, dismissible, show, message, autoClose} = state.alertReducer;

    return {
        ...state,
        variant: variant,
        dismissible: dismissible,
        show: show,
        message: message,
        autoClose: autoClose
    };
};

/*const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
    console.log("AlertMessage-mergeProps-propsFromState:", ownProps);
    console.log("AlertMessage-mergeProps-propsFromDispatch:", ownProps);
    console.log("AlertMessage-mergeProps-ownProps:", ownProps);
    return {
        ...propsFromState,
        ...propsFromDispatch,
        ...ownProps
    }
};*/

class AlertMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variant: 'success',
            dismissible: true,
            show: false,
            message: '',
            autoClose: true
        };
    }

    componentDidMount() {
        // console.log("AlertMessage-componentDidMount-state:", this.state);

    }

    componentDidUpdate() {
        // console.log("AlertMessage-componentDidUpdate-state:", this.state);
        // console.log("AlertMessage-componentDidUpdate-props:", this.props);
    }

    componentWillUnmount() {
    }

    handleHide = () => {
        // console.log("AlertMessage-handleHide");
        // this.setState({show: false})
        this.props.closeNotification();
    };

    render() {
        const {variant, dismissible, message, show, autoCLose} = this.props.alertReducer;

        // console.log("AlertMessage-render-alertMessage:", this.props);

        const _message = <span id="message-id" dangerouslySetInnerHTML={{__html: message}}/>;

        return (
            <React.Fragment>
                <Collapse in={show}>
                    <Alert show={show} variant={variant} dismissible={dismissible} onClose={this.handleHide}>
                        <Alert.Heading></Alert.Heading>
                        <p>{_message}</p>
                    </Alert>
                </Collapse>
            </React.Fragment>
        );
    }
}

/*AlertMessage.propTypes = {
    classes: PropTypes.object.isRequired,
};*/

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage);
