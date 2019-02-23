import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default class TwitterInputField extends Component {

    render() {
        return(
            <div>
                <Form.Label>{this.props.label}</Form.Label>

                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <i className="material-icons">
                                {this.props.icon}
                            </i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>

                    <Form.Control {...this.props}
                                  autoComplete="off"
                                  aria-describedby="inputGroupPrepend"/>
                </InputGroup>
            </div>
        )
    }

}