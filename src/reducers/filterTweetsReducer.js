import {INSERT_TWEETS_FIELD_FILTER} from "../actions/actionTypes";

const defaultState = {
    filter: {}
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
        default:
            return state;
    }
};