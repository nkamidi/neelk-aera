export default theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    viewContainer: {
        marginTop: '0px',
        /*minHeight: '200px',
        height: 'auto !important',*/
        padding: '20px 0',
        backgroundColor: '#eeeeee'
    },
    button: {
        margin: theme.spacing.unit,
    },
    fieldLabel: {
        float: "left"
    },
    alertRow: {
        minHeight: '35px',
        height: 'auto !important',
        margin: '10px 0'
    }
});
