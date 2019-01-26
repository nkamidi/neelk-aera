import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import navBarStyles from './navbarStyles';

function NavBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                    <span className={classes.brandName}>Device Manager</span>
                </Toolbar>
            </AppBar>
        </div>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(navBarStyles)(NavBar);
