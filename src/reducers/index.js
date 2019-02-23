import {combineReducers} from 'redux';
import {tweetsReducer} from './tweetsReducer';
import {sortTweetsReducer} from "./sortTweetsReducer";

export const Reducers = combineReducers({
    tweetsState: tweetsReducer,
    sortTweetsState: sortTweetsReducer,
});