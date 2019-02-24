import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import connect from "react-redux/es/connect/connect";
import {sortTweets} from "../../actions";

class TwitterTable extends Component {

    CREATE_AT = 'created_at';
    FAVORITE_COUNT = 'favorite_count';

    sortTableByField(fieldName) {

        if (this.isOrderAscending(fieldName)) {

            this.props.dispatch(sortTweets('DESC', fieldName));
            return;
        }

        this.props.dispatch(sortTweets('ASC', fieldName));
    }

    handleTableBody() {

        if (!this.props.listTweets) {

            return (null);
        }

        let listTweets = this.props.listTweets;

        listTweets = this.handleFilter(listTweets);
        this.handleSort(listTweets);

        return (
            listTweets.map(tweet => {
                return (
                    <tr key={tweet.id}>
                        <td>{tweet[this.CREATE_AT].toLocaleDateString()}</td>
                        <td>{tweet.text}</td>
                        <td>{tweet[this.FAVORITE_COUNT]}</td>
                    </tr>
                )
            })
        );
    }

    handleFilter(listTweets) {

        if (this.props.filterTweetsState) {

            return this.handleFieldFilter(listTweets, this.props.filterTweetsState.filter);
        }

        return listTweets;
    }

    handleFieldFilter(listTweets, filter) {

        for (const filterFieldName of Object.keys(filter)) {

            const filterField = filter[filterFieldName];

            if (filter[filterFieldName].query) {

                listTweets = listTweets
                    .filter(tweets => filterField.operator.operation(tweets[filterField.field], filterField.query));
            }
        }

        return listTweets;
    }

    handleSort(listTweets) {

        if (this.props.sortTweetsState) {

            this.handleFieldSort(listTweets, this.props.sortTweetsState.field, this.props.sortTweetsState.order);
        }
    }

    handleFieldSort(listTweets, field, order) {

        listTweets.sort((o1, o2) => {
            if (o1[field] > o2[field]) {

                return this.isOrderAscending(order) ? 1 : -1
            } else if (o1[field] < o2[field]) {

                return this.isOrderAscending(order) ? -1 : 1
            } else {
                return 0;
            }
        })
    }

    handleIconSort(fieldName) {

        if (fieldName === this.props.sortTweetsState.field) {

         return (
             <i className="material-icons">
                 {this.isOrderAscending() ? 'arrow_drop_down' : 'arrow_drop_up'}
             </i>
         )
        }
    }

    isOrderAscending() {

        return this.props.sortTweetsState.order === 'ASC';
    }

    render() {

        return (
            <Card>
                <Card.Header>Results</Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th className={'sortable-field'}
                                onClick={this.sortTableByField.bind(this, this.CREATE_AT)}>

                                Date {this.handleIconSort(this.CREATE_AT)}
                            </th>
                            <th>Content</th>
                            <th className={'sortable-field'}
                                onClick={this.sortTableByField.bind(this, this.FAVORITE_COUNT)}>

                                Stars {this.handleIconSort(this.FAVORITE_COUNT)}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.handleTableBody()
                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = store => ({

    listTweets: store.tweetsState.listTweets,
    sortTweetsState: store.sortTweetsState,
    filterTweetsState: store.filterTweetsState
});

export default connect(mapStateToProps)(TwitterTable);
