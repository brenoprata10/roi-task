import React, {Component} from 'react';
import TwitterForm from "./TwitterForm";
import TwitterTable from "./TwitterTable";
import { bindActionCreators } from 'redux';
import { updateListTweets } from '../../actions';
import TwitterService from "../../services/TwitterService";

export default class TwitterBox extends Component {

    twitterService;

    constructor() {

        super();
    }

    componentWillMount() {

        this.initializeServices();
        this.initializeTweets();
    }

    initializeServices() {

        this.twitterService = new TwitterService();
    }

    initializeTweets() {

        this.twitterService.searchTweetsByFilter()
            .then(res => console.log(res))
    }

    render() {
        return (
            <div>
                <TwitterForm/>
                <TwitterTable/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {

    bindActionCreators({ updateListTweets }, dispatch)
};