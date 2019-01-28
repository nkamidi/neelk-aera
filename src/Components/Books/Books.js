import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Book from './Book/Book';
import {getBooksList} from '../../redux/action/booksAction';

import booksStyles from './booksStyles';

const filterList = (lists, activeListId) => {
    if (lists.length === 0) {
        return lists;
    } else {
        if (!activeListId) {
            return lists[0];
        } else {
            return lists.find(list => {
                return Number(list.list_id) === Number(activeListId);
            });
        }
    }
};

const mapStateToProps = ({booksReducer}) => {
    const {requestInProgress, booksList} = booksReducer;

    return {
        requestInProgress,
        booksList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBooksList: () => {
            dispatch(getBooksList());
        }
    }
};

class Books extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'book_name',
            listIdChanged: false,
            activeList: {},
            activeListId: '',
            activeBookId: ''
        };
    }

    componentDidMount() {
        this.props.getBooksList();
    }

    static getDerivedStateFromProps(props, state) {
        const {requestInProgress, booksList} = props;

        if (!requestInProgress) {
            if (!!state.listIdChanged) {
                let _currentList = {};
                if (state.booksList.lists && Array.isArray(state.booksList.lists) && state.booksList.lists.length > 0) {
                    _currentList = filterList(state.booksList.lists, state.activeListId);
                }

                return {
                    ...state,
                    requestInProgress,
                    booksList,
                    currentList: _currentList
                };

            } else {
                return {
                    ...state,
                    requestInProgress,
                    booksList,
                    activeListId: (booksList.lists && Array.isArray(booksList.lists) && booksList.lists.length > 0) ? booksList.lists[0]['list_id'] : '',
                    currentList: (booksList.lists && Array.isArray(booksList.lists) && booksList.lists.length > 0) ? booksList.lists[0] : {}
                };
            }
        }

        return {
            ...state
        };
    }

    changeList(e) {
        this.setState({
            listIdChanged: true,
            activeListId: e.target.value,
        });
    };

    render() {
        //const {classes, requestInProgress} = this.props;
        const {classes, requestInProgress} = this.props;
        const {booksList, activeListId} = this.state;

        return (
            <div className={classes.viewContainer}>
                <div className={classes.booksHeader}>
                    Top Sellers
                </div>

                {
                    activeListId && booksList.lists && Array.isArray(booksList.lists) && booksList.lists.length > 0 ?
                        (<div className={classes.div1}>
                            <div style={{float: 'right', paddingRight: '20px'}}>
                                <span style={{color: '#919191'}}>selected category &nbsp;&nbsp;&nbsp;</span>
                                <select className={classes.listSelect} id="list" onChange={(e) => this.changeList(e)}>
                                    {
                                        booksList.lists ? (
                                            booksList.lists.map((list, index) => {
                                                return <option key={index}
                                                               value={list['list_id']}>{list['list_name']}</option>
                                            })
                                        ) : (null)
                                    }
                                </select>
                            </div>
                        </div>)
                        : (null)
                }


                <div style={{margin: '10px 0', paddingLeft: '20px'}}>
                    {
                        activeListId && booksList.lists && Array.isArray(booksList.lists) && booksList.lists.length > 0 ?
                            (<div className={classes.listTitle}>
                                {filterList(booksList.lists, activeListId)['list_name']}
                            </div>)
                            : (null)
                    }
                </div>
                <div className={classes.mainBody}>
                    {
                        booksList.lists && Array.isArray(booksList.lists) && booksList.lists.length > 0 ?
                            (
                                filterList(booksList.lists, activeListId)['books'].map((book, index) => {
                                    return (
                                        <Book key={index}
                                              data={book}/>
                                    )
                                })
                            )
                            : !!requestInProgress ? (<h2>Fetching data....</h2>) : (<h3>No data is available</h3>)
                    }
                </div>
            </div>
        );
    }
}

Books.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(booksStyles)(Books));
