import React, {Component} from 'react';

export default class TwitterTable extends Component {


    render() {

        return (
          <h4>OI</h4>
        );
    }
}

const mapStateToProps = store => ({

    listTweets: store.tweetsState.listTweets
});