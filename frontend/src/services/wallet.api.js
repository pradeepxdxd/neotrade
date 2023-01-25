import axios from "axios";

const API = 'http://localhost:3002/api/wallet/';

const depositAmount = (id, data) => {
    return axios.post(`${API}addamount/${id}`, data);
}

const withdrawAmount = (id, data) => {
    return axios.post(`${API}withdrawamount/${id}`, data);
}

export {depositAmount, withdrawAmount}