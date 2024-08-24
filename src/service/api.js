import axios from 'axios';

const api = axios.create({
  baseURL: 'https://us-central1-futmilionario-e4ef1.cloudfunctions.net/api', 
  timeout: 60 * 0.3 * 1000, 
});

export default api;
