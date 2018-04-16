import axios from 'axios'

let axiosInstance;

if (process.env['NODE_ENV'] === 'production') {
    axiosInstance = axios.create({
        headers: {'Access-Control-Allow-Origin': '*'},
    });
} else {
    axiosInstance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {'Access-Control-Allow-Origin': '*'},

    });

}

export default axiosInstance;