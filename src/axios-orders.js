import axios from 'axios';

const instance = axios.create ({
  baseURL: 'https://myburger-4d493.firebaseio.com/',
});

export default instance;
