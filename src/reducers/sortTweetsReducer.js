import {SORT_TWEETS} from "../actions/actionTypes";

export const sortTweetsReducer = (state = {}, action) => {

    switch (action.type) {

        case SORT_TWEETS:
            return {
                ...state,
                field: action.field,
                order: action.order
            };
        default:
            return state;
    }
};