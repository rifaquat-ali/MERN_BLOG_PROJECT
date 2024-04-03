import axios from "axios";
import { API_LITERALS, API_URLS } from "../constants/config";
import { getAccessToken, getType } from "../utils/common-client-utils";

const API_DOMAIN_URL = `http://localhost:8000`;

const axiosInstance = axios.create({
  baseURL: API_DOMAIN_URL,
  timeout: 10000,
  // headers: {
  //   "Accept": "application/json, multipart/form-data",
  //   "Content-Type": "application/json",
  // },
  // headers: {
  //   "Accept": "application/json",
  //   "Content-Type": " multipart/form-data",
  // },
  headers: {
    Accept: "application/json, form-data",
    "Content-Type": "application/json",
  },
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

//axios interceptor for >>>> request
axiosInstance.interceptors.request.use(
  function (config) {
    //handling params here
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//axios interceptor for >>>> response
axiosInstance.interceptors.response.use(
  function (response) {
    //? Shimmer/Process Loaders stop
    return processResponse(response);
  },
  function (error) {
    //? Shimmer/Process Loaders stop

    return Promise.reject(processError(error));
  }
);

function processResponse(response) {
  if (response?.status === 200) {
    return { isSuccess: true, data: response?.data };
  } else {
    return {
      isFail: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
}
function processError(error) {
  if (error.response) {
    //req was made and server responded
    //for handling status other than success (out of 2.x.x range)
    console.log("<<>> Response Error", error.toJSON());

    return {
      isError: true,
      msg: API_LITERALS?.responseFailure,
      code: error?.response?.status,
    };
  } else if (error.request) {
    //request was made but no response from server (net/client-server connectivity issues)
    console.log("<<>> Request Error", error.toJSON());

    return {
      isError: true,
      msg: API_LITERALS?.requestFailure,
      code: "Unable to connect to with server at moment",
    };
  } else {
    //triggered error while setting up request
    console.log("<<>> Network Error", error.toJSON());

    return {
      isError: true,
      msg: API_LITERALS.networkFailure,
      code: error?.response?.status,
    };
  }
}

// adding APIs to Axios Instance
const API = {};

for (const [key, value] of Object.entries(API_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      headers: {
        //headers
        authorization: getAccessToken(),
      },
      responseType: value.responseType,
      TYPE: getType(value, body),
      onUploadProgress: function (e) {
        if (showUploadProgress) {
          let percentage = Math.round((e.loaded * 100) / e.total);
          showUploadProgress(percentage);
        }
      },
      onDownloadProgress: function (e) {
        if (showDownloadProgress) {
          let percentage = Math.round((e.loaded * 100) / e.total);
          showDownloadProgress(percentage);
        }
      },
    });
}

export { API };
