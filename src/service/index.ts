import axios from "../../node_modules/axios";
import config from "../config";
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 30000,
});

service.interceptors.request.use(
  // eslint-disable-next-line
  (conf:any) => {
    return conf;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    if (
      response.headers["content-type"] !== null &&
      response.headers["content-type"].indexOf("vnd.ms-excel") > 0
    ) {
      return response;
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

export default service;
