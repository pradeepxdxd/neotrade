import axios from 'axios';

const API = 'http://localhost:3002/api/trade';

const getGoldInfo = () => {
    return axios.get(`${API}/getgoldinfo`);
}

export { getGoldInfo }