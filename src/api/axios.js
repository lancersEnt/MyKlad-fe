import axios from 'axios';

// ** API axios Instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
