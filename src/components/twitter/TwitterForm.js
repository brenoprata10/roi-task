import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class TwitterForm extends Component {

    constructor() {

        super();
        this.state = {
            name: 'ROIHuntercom',
            count: 50
        };
    }

    searchFeed(event) {

        event.preventDefault();

        this.props.callbackSearch(this.state);
    }


    setChange(nameInput, event) {

        this.setState({[nameInput]: event.target.value});
    }

    render() {

        return (
            <Card>
                <Card.Header>Twitter Feed Search</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.searchFeed.bind(this)}>
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