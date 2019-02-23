import {combineReducers} from 'redux';
import {tweetsReducer} from './tweetsReducer';
import {sortTweetsReducer} from "./sortTweetsReducer";
import {filterTweetsReducer} from "./filterTweetsReducer";

export const Reducers = combineReducers({
    tweetsState: tweetsReducer,
    sortTweetsState: sortTweetsReducer,
    filterTweetsState: filterTweetsReducer
});