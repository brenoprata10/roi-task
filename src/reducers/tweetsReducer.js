import {CLEAR_LIST_TWEETS, SEARCH_LIST_TWEETS} from "../actions/actionTypes";

export const tweetsReducer = (state = {}, action) => {

    switch (action.type) {
        case SEARCH_LIST_TWEETS:
            return {
                ...state,
                listTweets: action.listTweets
            };
        case CLEAR_LIST_TWEETS: {
            return {
                ...state,
                listTweets: null
            };
        }
        default:
            return state;
    }
};