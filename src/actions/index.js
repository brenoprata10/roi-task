import {SEARCH_LIST_TWEETS} from "./actionTypes";

export const updateListTweets = value => ({
    type: SEARCH_LIST_TWEETS,
    listTweets: value
});