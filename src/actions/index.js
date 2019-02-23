import {CLEAR_LIST_TWEETS, SEARCH_LIST_TWEETS, SORT_TWEETS} from "./actionTypes";

export const updateListTweets = value => ({
    type: SEARCH_LIST_TWEETS,
    listTweets: value
});

export const clearListTweets = () => ({
    type: CLEAR_LIST_TWEETS,
});

export const sortTweets = (order, field) => ({
    type: SORT_TWEETS,
    order: order,
    field: field
});