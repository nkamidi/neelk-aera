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
    },
    bodyDiv: {padding: '10px', height: '70%', display: 'flex', flexDirection: 'row'},
    imageDiv: {
        border: '0px solid #cccccc',
        display: 'inline-block',
        width: '35%',
        height: '100%'
    },
    infoDiv: {
        width: '65%',
        borderLeft: '1px solid gray',
        display: 'inline-block',
        height: '100%',
        textAlign: 'left',
        verticalAlign: 'top',
        padding: '0 15px',
        overFlowX: 'auto'
    },
    booksHeader: {
        borderBottom: '1px solid #dddddd',
        padding: '15px 0',
        width: '100%',
        textAlign: 'center',
        margin: '10px 0',
        fontWeight: '500',
        fontSize: '30px'
    },
    listTitle: {
        display: 'block',
        textAlign: 'left',
        fontWeight: '500',
        fontSize: '30px',
        color: '#0b7ccc'
    },
    closeButton: {
        float: 'right',
        paddingRight: '15px',
        color: '#0b7ccc',
        cursor: 'pointer',
        fontSize: '1.1em'
    },
    infoRow: {
        marginTop: '10px'
    },
    subTitleHeader: {
        display: 'inline',
        fontSize: '16px',
        fontWeight: '600',
    },
    subTitleText: {
        fontWeight: '500',
        fontSize: '16px',
        color: '#707070'
    },
    textLink: {
        display: 'inline',
        fontSize: '15px',
        color: '#3498DB'
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
