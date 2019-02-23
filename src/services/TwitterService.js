export default class TwitterService {

    API_URL = 'http://localhost:4000/api';

    searchTweetsByFilter(filter) {

        return fetch(this.retrieveUrlWithFilter(filter), {
            method: 'GET',

        })
            .then(res => res.json())
            .then(res => {

                if (!res.errorMessage) {

                    return res;
                }

                throw Error(res.errorMessage);
            });
    }

    retrieveUrlWithFilter(filter) {

        const url = new URL(`${this.API_URL}/tweets`);

        const params = {
            count: filter.count,
            screen_name: filter.name
        };

        Object.keys(params).forEach(key => {
            if (params[key]) {
                url.searchParams.append(key, params[key]);
            }
        });

        return url;
    }
}