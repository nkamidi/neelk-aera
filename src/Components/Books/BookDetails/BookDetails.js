import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import './bookDetailsStyles.css';

import bookDetailsStyles from './bookDetailsStyles';

const mapStateToProps = ({booksReducer}) => {
    const {showBookDetails, activeBook} = booksReducer;

    return {
        showBookDetails,
        activeBook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        hideBookDetails: () => {
            dispatch({type: 'HIDE_BOOK_DETAILS'});
        }
    }
};

class BookDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBookDetails: false,
            activeBook: {}
        };
    }

    componentDidMount() {
        document.addEventListener("onkeypress", this.handleKeyPress);
    }

    handleKeyPress() {
        console.log("handleKeyPress");
    };

    static getDerivedStateFromProps(props, state) {
        const {showBookDetails, activeBook} = props;

        return {
            ...state,
            showBookDetails,
            activeBook
        };
    }

    closeDiv() {
        this.props.hideBookDetails();

        /*this.setState({
            showBookDetails: false,
            activeBook: {}
        });*/
    }

    render() {
        const {classes} = this.props;
        const {showBookDetails, activeBook} = this.state;

        if (!!showBookDetails) {
            return (
                <div className="overlay" onClick={(e) => this.closeDiv(e)}>
                    <div className="overlay-content">
                        <div className={classes.booksHeader}>
                            {activeBook.title}
                            <span className={classes.closeButton}><a onClick={(e) => this.closeDiv(e)}>close</a></span>
                        </div>

                        <div className={classes.bodyDiv}>
                            <div className={classes.imageDiv}>
                                <img src={activeBook.book_image} style={{width: '70%', objectFit: 'contain'}} alt={''}/>
                            </div>
                            <div className={classes.infoDiv}>
                                <div className={classes.infoRow}><span
                                    className={classes.subTitleHeader}>Author: </span><span
                                    className={classes.subTitleText}>{activeBook.author}</span></div>
                                <div className={classes.infoRow}><span
                                    className={classes.subTitleHeader}>Created Date: </span><span
                                    className={classes.subTitleText}>{activeBook.created_date}</span></div>
                                <div className={classes.infoRow}><span
                                    className={classes.subTitleHeader}>Publisher: </span><span
                                    className={classes.subTitleText}> {activeBook.publisher}</span></div>
                                <div className={classes.infoRow}><span
                                    className={classes.subTitleHeader}>Description: </span><span
                                    className={classes.subTitleText}> {activeBook.description}</span></div>
                                <div className={classes.infoRow}><span
                                    className={classes.subTitleHeader}>Current rank: </span><span
                                    className={classes.subTitleText}> {activeBook.rank}</span></div>
                                <div className={classes.infoRow}><span className={classes.subTitleHeader}>Last week rank: </span><span
                                    className={classes.subTitleText}> {activeBook.rank_last_week}</span></div>
                                <div className={classes.infoRow}><span className={classes.subTitleHeader}>Primary ISBN10: </span><span
                                    className={classes.subTitleText}> {activeBook.primary_isbn10}</span></div>
                                <div className={classes.infoRow}><span className={classes.subTitleHeader}>Primary ISBN13: </span><span
                                    className={classes.subTitleText}> {activeBook.primary_isbn13}</span></div>
                                {
                                    activeBook.book_review_link ?
                                        <div className={classes.infoRow}><span className={classes.subTitleHeader}>Book Review URL: </span><span
                                            className={classes.subTitleText}> <a className={classes.textLink}
                                                                                 href={activeBook.book_review_link}>{activeBook.book_review_link}</a></span>
                                        </div>
                                        : (null)
                                }

                                {
                                    activeBook.buy_links && Array.isArray(activeBook.buy_links) && activeBook.buy_links.length > 0 ?
                                        (
                                            <div className={classes.infoRow}>
                                                <span className={classes.subTitleHeader}>Purchase Links: </span>
                                                {
                                                    activeBook.buy_links.map((link, index) => {
                                                        return (
                                                            <div key={index} style={{marginTop: '10px'}}>{link.name}: <a

                                                                href={link.url}>{link.url}</a></div>)
                                                    })
                                                }
                                            </div>
                                        )
                                        : (null)
                                }
                            </div>

                        </div>
                    </div>

                </div>
            );
        } else {
            return (null);
        }
    }
}

BookDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(bookDetailsStyles)(BookDetails));