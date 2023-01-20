import axios from "axios";

const API = 'http://localhost:3002/api/auth/';

const sendpasswordlink = (data) => {
    return axios.post(`${API}sendpasswordlink`, data);
}

const forgetPassword = () => {

}

export {sendpasswordlink, forgetPassword}