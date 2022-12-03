import axios from 'axios';

export default ({ requiresAuth = false } = {}) => {
    const options = {};

    options.baseURL = '/api';

    if (requiresAuth) {
        options.headers = {
            'token': localStorage.getItem('token'),
        };
    }

    return axios.create(options);
};