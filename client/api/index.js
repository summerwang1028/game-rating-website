import axios from 'axios'

let axiosInstance;

if (process.env['NODE_ENV'] === 'production') {
    console.log('hello');
    axiosInstance = axios.create({
        baseURL: 'https://game-rating-website.herokuapp.com',
        headers: {'Access-Control-Allow-Origin': '*'},
    });
} else {
    axiosInstance = axios.create({
        baseURL: 'https://game-rating-website.herokuapp.com',
        headers: {'Access-Control-Allow-Origin': '*'},

    });

}

export default axiosInstance;