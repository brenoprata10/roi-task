import React, {Component} from 'react';
import TwitterForm from "./TwitterForm";
import TwitterTable from "./TwitterTable";
import { connect } from 'react-redux';
import {clearListTweets, filterTweets, updateListTweets, updateTweetsFilteredList} from '../../actions';
import TwitterService from "../../services/TwitterService";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import TwitterStatistics from "./TwitterStatistics";

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

        this.insertFilters(filter);

        this.twitterService.searchTweetsByFilter(filter)
            .then(res => {

                const listTweets = this.prepareListTweets(res);

                this.props.dispatch(updateListTweets(listTweets));
                this.props.dispatch(updateTweetsFilteredList(this.handleTableFilter()));
                this.setState({twitterRequestErrorMessage: null});
            })
            .catch(error => {
                this.setState({twitterRequestErrorMessage: error.message})
            })
    }

    handleTableFilter() {

        if (!this.props.listTweets) {

            return (null);
        }

        let listTweets = this.props.listTweets;

        return this.handleFilter(listTweets);
    }

    handleFilter(listTweets) {

        if (this.props.filterTweetsState) {

            return this.handleFieldFilter(listTweets, this.props.filterTweetsState.filter);
        }

        return listTweets;
    }

    handleFieldFilter(listTweets, filter) {

        for (const filterFieldName of Object.keys(filter)) {

            const filterField = filter[filterFieldName];

            if (filter[filterFieldName].query) {

                listTweets = listTweets
                    .filter(tweets => filterField.operator.operation(tweets[filterField.field], filterField.query));
            }
        }

        return listTweets;
    }

    insertFilters(filter) {

        for (const field of Object.keys(filter.query)) {

            const query = filter.query[field];

            this.props.dispatch(filterTweets(field, query.field, query.operator, query.content));
        }
    }

    prepareListTweets(listTweets) {

        return listTweets.map(tweet => {
            return {
                ...tweet,
                created_at: new Date(tweet.created_at)
            }
        });
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
            <div>
                <br/>
                <TwitterStatistics/>
                <br/>
                <TwitterTable/>
            </div>
        );
    }

    render() {
        return (
            <div>
                {
                    this.handleErrorMessage()
                }
                <TwitterForm callbackSearch={this.filterTweets.bind(this)}/>
                {
                    this.handleTableRender()
                }
            </div>
        )
    }
}

const mapStateToProps = store => ({

    listTweets: store.tweetsState.listTweets,
    filterTweetsState: store.filterTweetsState
});

export default connect(mapStateToProps)(TwitterBox);