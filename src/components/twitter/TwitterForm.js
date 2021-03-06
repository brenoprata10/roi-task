import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import connect from "react-redux/es/connect/connect";
import {FilterTypes} from "./filter/FilterTypes";
import TwitterInputField from "./TwitterInputField";

class TwitterForm extends Component {

    constructor() {

        super();
        this.state = {
            name: 'ROIHuntercom',
            count: 50,
            query: {
                text: {
                    field: 'text',
                    content: '',
                    operator: FilterTypes.INCLUDES
                },
                created_at: {
                    field: 'created_at',
                    content: '',
                    operator: FilterTypes.DATE_GREATER_THAN
                },
                length: {
                    field: 'text',
                    content: '',
                    operator: FilterTypes.EQUAL_LENGTH
                },
                favorite_count: {
                    field: 'favorite_count',
                    content: '',
                    operator: FilterTypes.EQUALS
                },
                mentions_count: {
                    field: 'text',
                    content: '',
                    operator: FilterTypes.EQUALS_NUMBER_MENTION
                },
                hashtag_count: {
                    field: 'text',
                    content: '',
                    operator: FilterTypes.EQUALS_NUMBER_HASHTAG
                }
            }
        };
    }

    searchFeed(event) {

        event.preventDefault();

        this.props.callbackSearch(this.state);
    }

    setChange(nameInput, event) {

        this.setState({[nameInput]: event.target.value});
    }

    setQueryChange(nameInput, event) {

        this.setState({query: {
                ...this.state.query,
                [nameInput]: {
                    content: event.target.value,
                    field: this.state.query[nameInput].field,
                    operator: this.state.query[nameInput].operator
                }
            }});
    }

    render() {

        return (
            <Card>
                <Card.Header>Twitter Feed Search</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.searchFeed.bind(this)}>
                        <Form.Row>
                            <Form.Group as={Col} md="4"
                                        controlId="formGridName">

                                <TwitterInputField label="Name: *"
                                                   icon="alternate_email"
                                                   value={this.state.name}
                                                   onChange={this.setChange.bind(this, 'name')}
                                                   type="text"
                                                   required/>
                            </Form.Group>

                            <Form.Group as={Col} md="4"
                                        controlId="formGridDate">

                                <TwitterInputField label="Date Greater Than:"
                                                   icon="date_range"
                                                   value={this.state.query.created_at.content}
                                                   onChange={this.setQueryChange.bind(this, 'created_at')}
                                                   type="date"/>
                            </Form.Group>

                            <Form.Group as={Col} md="4"
                                        controlId="formGridText">

                                <TwitterInputField label="Text:"
                                                   icon="textsms"
                                                   value={this.state.query.text.content}
                                                   onChange={this.setQueryChange.bind(this, 'text')}
                                                   type="text"/>
                            </Form.Group>

                            <Form.Group as={Col} md="4"
                                        controlId="formGridLength">

                                <TwitterInputField label="Length:"
                                                   icon="dehaze"
                                                   value={this.state.query.length.content}
                                                   onChange={this.setQueryChange.bind(this, 'length')}
                                                   type="number"/>
                            </Form.Group>

                            <Form.Group as={Col} md="4"
                                        controlId="formGridFavorite">

                                <TwitterInputField label="Number of Likes:"
                                                   icon="favorite"
                                                   value={this.state.query.favorite_count.content}
                                                   onChange={this.setQueryChange.bind(this, 'favorite_count')}
                                                   type="number"/>
                            </Form.Group>

                            <Form.Group as={Col} md="4"
                                        controlId="formGridNumberMentions">

                                <TwitterInputField label="Number of Mentions:"
                                                   icon="perm_identity"
                                                   value={this.state.query.mentions_count.content}
                                                   onChange={this.setQueryChange.bind(this, 'mentions_count')}
                                                   type="number"/>
                            </Form.Group>

                            <Form.Group as={Col} md="4"
                                        controlId="formGridNumberHashtag">

                                <TwitterInputField label="Number of Hashtags:"
                                                   icon="perm_identity"
                                                   value={this.state.query.hashtag_count.content}
                                                   onChange={this.setQueryChange.bind(this, 'hashtag_count')}
                                                   type="number"/>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary"
                                type="submit">
                            <i className="material-icons">
                                search
                            </i>
                            Search
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

const mapPropsToState = state => ({

    listTweets: state.tweetsState.listTweets
});

export default connect(mapPropsToState)(TwitterForm)