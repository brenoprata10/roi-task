import {
    CLEAR_LIST_TWEETS,
    INSERT_TWEETS_FIELD_FILTER,
    SEARCH_LIST_TWEETS,
    SORT_TWEETS,
    UPDATE_TWEETS_FILTERED_LIST
} from "./actionTypes";

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

export const filterTweets = (propertyName, field, operator, query) => ({
    type: INSERT_TWEETS_FIELD_FILTER,
    field: field,
    query: query,
    operator: operator,
    propertyName: propertyName
});

export const updateTweetsFilteredList = (filteredList) => ({
    type: UPDATE_TWEETS_FILTERED_LIST,
    filteredList: filteredList
});