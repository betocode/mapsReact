import axios from "axios";

//const APIURL = "http://localhost:8080";
const APIURL = "https://unicadtest.herokuapp.com/";

const api = axios.create({
  baseURL: APIURL,
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
    }
  }
);

export default api;
