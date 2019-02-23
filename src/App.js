import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TwitterBox from "./components/twitter/TwitterBox";

export default class App extends Component {

    render() {
        return (

            <div className={'app-container'}>
                <Router>

                    <div>
                        <Route path="/" component={TwitterBox}/>
                    </div>
                </Router>
            </div>
        );
    }
}