import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import navBarStyles from './navbarStyles';

function NavBar(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <div className={classes.navbar}>
                <div className={classes.bar}>
                    <span className={classes.brandName}>NY Times Books - Top Sellers</span>
                </div>
            </div>
        </div>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(navBarStyles)(NavBar);
