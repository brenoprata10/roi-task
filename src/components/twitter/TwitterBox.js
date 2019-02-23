import React, {Component} from 'react';
import TwitterForm from "./TwitterForm";
import TwitterTable from "./TwitterTable";
import { connect } from 'react-redux';
import {clearListTweets, updateListTweets} from '../../actions';
import TwitterService from "../../services/TwitterService";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

class TwitterBox extends Component {

    twitterService;

    constructor() {

        super();
        this.state = {twitterRequestErrorMessage: null}
    }

    componentWillMount() {

        this.initializeServices();
    }

    initializeServices() {

        this.twitterService = new TwitterService();
    }

    filterTweets(filter) {

        this.props.dispatch(clearListTweets());

        this.twitterService.searchTweetsByFilter(filter)
            .then(res => {

                const listTweets = res.map(tweet => {
                    return {
                        ...tweet,
                        created_at: new Date(tweet.created_at)
                    }
                });

                this.props.dispatch(updateListTweets(listTweets));
                this.setState({twitterRequestErrorMessage: null});
            })
            .catch(error => {
                this.setState({twitterRequestErrorMessage: error.message})
            })
    }

    clearErrorMessages() {

        this.setState({twitterRequestErrorMessage: null});
    }

    handleErrorMessage() {

        if (!this.state.twitterRequestErrorMessage) {

            return (null);
        }

        return (
            <Alert variant="danger">
                <Alert.Heading>These aren't the tweets you're looking for.</Alert.Heading>
                <span>{this.state.twitterRequestErrorMessage}</span>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={this.clearErrorMessages.bind(this)} variant="outline-danger">
                        Close
                    </Button>
                </div>
            </Alert>
        );
    }

    handleTableRender() {

        if (!this.props.listTweets) {

            return (null);
        }

        return (
            <TwitterTable/>
        );
    }

    render() {
        return (
            <div>
                {
                    this.handleErrorMessage()
                }
                <TwitterForm callbackSearch={this.filterTweets.bind(this)}/>
                <br/>
                {
                    this.handleTableRender()
                }
            </div>
        )
    }
}

const mapStateToProps = store => ({

    listTweets: store.tweetsState.listTweets
});

export default connect(mapStateToProps)(TwitterBox);