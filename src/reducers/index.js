import {combineReducers} from 'redux';
import {tweetsReducer} from './tweetsReducer';

export const Reducers = combineReducers({
    tweetsState: tweetsReducer,
});