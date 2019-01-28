export default theme => ({
    bookCard: {
        margin: '15px',
        /*padding: '10px',*/
        minWidth: '16%',
        width: '16%',
        border: '1px solid #cccccc',
        minHeight: '500px',
        height: 'auto !important',
        wordWrap: 'break-word',
        /*overflow: 'scroll'*/
        cursor: 'pointer'
    },
    bookCardHeader: {
        backgroundColor: '#eee',
        borderBottom: '1px solid #bfbfbf',
        padding: '10px',
        textAlign: 'center',
        minHeight: '100px'
    },
    bookCardBody: {
        backgroundColor: '#f3f3f3',
        padding: '10px',
        textAlign: 'left',
        color: '#727272',
        height: '500px',
        overflowY: 'auto'
    },
    bookImage: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        width: '70%',
        objectFit: 'contain',
        marginBottom: '15px',
    }

});
