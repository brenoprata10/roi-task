import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class TwitterStatistics extends Component {

    constructor() {

        super();
        this.state = {

            showModal: false
        }
    }

    loadStatistics() {

        if (!this.props.filterTweetsState.filteredList
            || !this.state.showModal) {

            return(null);
        }

        const sumLikes = this.retrieveSumLikes();
        const averageLikesPerTweet = this.retrieveAverageLikesPerTweet();
        const allMentionsByOccurence = this.retrieveAllMentionsByOccurence();

        return (
            <div>
                {
                    this.statisticField('Sum of Likes', sumLikes)
                }
                {
                    this.statisticField('Average of Likes per tweet', averageLikesPerTweet)
                }
                {
                    this.statisticObjectField('List of mentions', allMentionsByOccurence)
                }
            </div>
        );
    }

    statisticField(label, value) {

        return (
            <div md="4">
                <b>{label}: </b>
                <span>{value}</span>
            </div>
        );
    }

    statisticObjectField(label, object) {

        return (
            <div md="4">
                <b>{label}: </b>
                {
                    Object.keys(object).map(key => {

                        return (
                            <div key={key}>
                                <b>{key}: </b>
                                <span>{object[key]}</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    retrieveSumLikes() {

        if (this.props.filterTweetsState.filteredList.length === 0) {

            return 0;
        }

        return this.props.filterTweetsState.filteredList
            .map(tweet => tweet.favorite_count)
            .reduce((sumLikes, likeCount) => sumLikes + likeCount)
    }

    retrieveAverageLikesPerTweet() {

        if (this.props.filterTweetsState.filteredList.length === 0) {

            return 0;
        }

        return this.retrieveSumLikes() / this.props.filterTweetsState.filteredList.length;
    }

    retrieveAllMentionsByOccurence() {

        const regexMentions = new RegExp('@[a-zA-Z_]*', 'mg');

        const listTweetsWithOccurences = this.props.filterTweetsState.filteredList
            .map(tweet => tweet.text)
            .filter(contentTweet => contentTweet.match(regexMentions));

        return this.retrieveObjectOccurences(listTweetsWithOccurences, regexMentions);
    }

    retrieveObjectOccurences(listTweetsWithOccurences, regex) {

        const listOccurences = {};

        listTweetsWithOccurences.forEach(tweetWithOccurence => {

            const occurrencesByTweet = tweetWithOccurence.match(regex);

            for (const occurence of occurrencesByTweet) {

                if (listOccurences[occurence]) {

                    listOccurences[occurence] = listOccurences[occurence] + 1;
                    continue;
                }

                listOccurences[occurence] = 1;

            }
        });

        return listOccurences;
    }

    handleShow() {

        this.setState({showModal: true});
    }

    handleClose() {

        this.setState({showModal: false});
    }

    render() {
        return(
            <div>
                <Button variant="dark"
                        onClick={this.handleShow.bind(this)}>

                    <i className="material-icons">
                        insert_chart
                    </i>
                    Statistics
                </Button>

                <Modal show={this.state.showModal}
                       onHide={this.handleClose.bind(this)}>

                    <Modal.Header closeButton>
                        <Modal.Title>Statistics</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            {
                                this.loadStatistics()
                            }
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({

    filterTweetsState: state.filterTweetsState
});

export default connect(mapStateToProps)(TwitterStatistics);