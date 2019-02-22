export default class TwitterService {

    searchTweetsByFilter(callbackSuccess, callbackError) {

         return fetch("http://localhost:4000/tweets", {
            method: 'GET'
        }).then(res => res.json())
    }
}