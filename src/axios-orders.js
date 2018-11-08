import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-g1234.firebaseio.com/'

});

export default instance;
