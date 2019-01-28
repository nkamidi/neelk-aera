export default theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        border: '1px solid #bbbbbb'
    },
    table: {
        minWidth: 700,
    },
    viewContainer: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        /*padding: '20px 20px'*/
    },
    booksHeader: {
        border: '0px dashed #dddddd',
        width: '100%',
        textAlign: 'center',
        margin: '10px 0',
        fontWeight: '600',
        fontSize: '50px'
    },
    listTitle: {
        display: 'block',
        textAlign: 'left',
        fontWeight: '500',
        fontSize: '30px',
        color: '#0b7ccc'
    },
    listSelect: {

    },
    div1: {
        border: '0px dashed #dddddd',
        width: '100%',
        margin: '10px 0'
    },
    mainBody: {
        border: '0px dashed #dddddd',
        width: '90%',
        margin: '0 auto',
        marginBottom: '30px',
        /*margin: '10px 0',*/
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center'
        /*
        */
    },
    tableHeader: {
        fontWeight: 600,
        fontSize: '16px'
    }
});
