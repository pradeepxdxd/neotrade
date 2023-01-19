import axios from 'axios';

const API = 'http://localhost:3002/api/trade';

const getGoldData = () => {
    return axios.get(`${API}/get-gold-data`)
}

const getSilverData = () => {
    return axios.get(`${API}/get-silver-data`)
}

const getGoldDataByMonthID = (id) => {
    return axios.get(`${API}/get-gold-data-by-day/${id}`);
}

export { getGoldData, getSilverData, getGoldDataByMonthID }