import axios from "axios";

// const BASE_API_URL = "http://10.224.116.78:3000/api/v1/candelaria";
const BASE_API_URL = "http://localhost:3000/api/v1/candelaria"; //! Local

// Url para redirigir a PRTG y CISCO
export const PRTG_URL = 'https://10.224.241.25/device.htm?id='
export const CISCO_URL = 'https://10.224.241.14/webacs/loginAction.do?action=login&product=wcs&selectedCategory=en#pageId=full_search_pageId&query='

export const getStatusSystem = async () => {
  return axios
    .get(`${BASE_API_URL}/status`)
    .then((response) => response.data)
    .catch((error) => console.error('Error del API REST Candealaria : ',error));
};

export const getIndicators = async () => {
  return axios
    .get(`${BASE_API_URL}/indicators`)
    .then((response) => response.data)
    .catch((error) => console.error('Error del API REST Candealaria : ',error));
};

export const getClients = async () => {
  return axios
    .get(`${BASE_API_URL}/clients`)
    .then((response) => response.data)
    .catch((error) => console.error('Error del API REST Candealaria : ',error));
};

export const getSwitches = async () => {
  return axios
    .get(`${BASE_API_URL}/switches`)
    .then((response) => response.data)
    .catch((error) => console.error('Error del API REST Candealaria : ',error));
};

export const getUps = async () => {
  return axios
    .get(`${BASE_API_URL}/ups`)
    .then((response) => response.data)
    .catch((error) => console.error('Error del API REST Candealaria : ',error));
};