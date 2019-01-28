import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import bookStyles from './bookStyles';
import BookDetails from '../BookDetails/BookDetails';

const mapStateToProps = ({booksReducer}) => {
    const {requestInProgress, booksList} = booksReducer;

    return {
        requestInProgress,
        booksList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showBookDetails: (data) => {
            dispatch({type: 'SHOW_BOOK_DETAILS', bookData: data});
        }
    }
};

class Book extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc'
        };
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(props, state) {
        const {requestInProgress, booksList} = props;

        if (!requestInProgress) {
            return {
                ...state,
                requestInProgress,
                booksList
            };
        }

        return {
            ...state
        };
    }

    showBookDetails(e, book) {
        this.props.showBookDetails(book);
    }

    render() {
        const {classes, data} = this.props;
        return (
            <Fragment>
                <div className={classes.bookCard} onClick={(e) => this.showBookDetails(e, data)}>
                    <div className={classes.bookCardBody}>
                        <div>
                            <img className={classes.bookImage} src={data.book_image} alt={''}/>
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <strong>Description</strong>: {data.description}
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <strong>Weeks on List</strong>: {data.weeks_on_list}
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <strong>Current rank</strong>: {data.rank}
                            {
                                data.rank_last_week ?
                                    <p style={{display: 'inline'}}> (last week rank: {data.rank_last_week})</p> : ''
                            }
                        </div>
                    </div>
                </div>
                <BookDetails/>
            </Fragment>
        );
    }
}

Book.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(bookStyles)(Book));