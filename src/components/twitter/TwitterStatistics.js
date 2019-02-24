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

        if (!this.props.listTweets
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

        return this.props.listTweets
            .map(tweet => tweet.favorite_count)
            .reduce((sumLikes, likeCount) => sumLikes + likeCount)
    }

    retrieveAverageLikesPerTweet() {

        return this.retrieveSumLikes() / this.props.listTweets.length;
    }

    retrieveAllMentionsByOccurence() {

        const regexMentions = new RegExp('@[a-zA-Z_]*', 'mg');

        const listTweetsWithOccurences = this.props.listTweets
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

const mapPropsToState = state => ({

    listTweets: state.tweetsState.listTweets
});

export default connect(mapPropsToState)(TwitterStatistics);