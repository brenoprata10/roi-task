import {INSERT_TWEETS_FIELD_FILTER, UPDATE_TWEETS_FILTERED_LIST} from "../actions/actionTypes";

const defaultState = {
    filter: {},
    filteredList: []
};

export const filterTweetsReducer = (state = defaultState, action) => {

    console.log(action);

    switch(action.type) {
        case INSERT_TWEETS_FIELD_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.propertyName]: {
                        field: action.field,
                        query: action.query,
                        operator: action.operator
                    }
                }
            };
        case UPDATE_TWEETS_FILTERED_LIST:
            return {
                ...state,
                filteredList: action.filteredList
            };
        default:
            return state;
    }
};