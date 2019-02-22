const express = require('express');
const app = express();
const axios = require('axios');

var client = {
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: '',
    access_token: 'AAAAAAAAAAAAAAAAAAAAAHEV9gAAAAAAoZuO8qlPYsCl%2FB%2B8uXM8e4gCrWQ%3DE4Cp2s9aROPXELP3Obz77yx0WIFxGZrVJhbidhiowWhiQNGWic'
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/tweets', function (req, res) {

    filterTweets()
        .then(resolve => {
            res.send(resolve);
        })
        .catch(reject => {

            res.send(reject);
        });

});

app.listen(4000, function () {
    console.log('Started on port 4000!')
});

function filterTweets() {

    return new Promise((resolve, reject) => {

        axios({
            method: 'GET',
            url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=5&screen_name=ROIHuntercom',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${client.access_token}`
            }
        }).then(function (response) {

            resolve(response.data);
        })
            .catch(function (error) {
                reject(error);
            });
    });
}