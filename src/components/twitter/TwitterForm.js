import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { bindActionCreators } from 'redux';
import { updateListTweets } from '../../actions';

export default class TwitterForm extends Component {

    constructor() {

        super();
        this.initializeState();
    }

    searchFeed(event) {

        event.preventDefault();
    }

    initializeState() {

        this.state = {name: 'ROIHuntercom'};
    }

    setChange(nameInput, event) {

        this.setState({[nameInput]: event.target.value});
    }

    render() {

        return (
            <Card>
                <Card.Header>Twitter Feed Search</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.searchFeed}>
                        <Form.Row>
                            <Form.Group controlId="formGridName">
                                <Form.Label>Name: *</Form.Label>
                                <Form.Control value={this.state.name}
                                              onChange={this.setChange.bind(this, 'name')}
                                              type="text"
                                              required/>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary"
                                type="submit">Search</Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => {

    bindActionCreators({ updateListTweets }, dispatch)
};