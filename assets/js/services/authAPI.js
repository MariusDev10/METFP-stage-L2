import Axios from "axios";
import missionsAPI from "./missionsAPI";
import tokenDecode from 'jwt-decode';


function logout() {
    window.localStorage.removeItem("authToken");
    delete Axios.defaults.headers["Authorization"];
    missionsAPI.finAll().then(console.log);
}

function authenticate(credentials) {
    return Axios
        .post("http://127.0.0.1:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            //stock token dans le local storage
            window.localStorage.setItem("authToken", token);
            //on previen a axios qu'on a un header par defaut sur tout nos fitures reqeute HTTP
            Axios.defaults.headers["Authorization"] = "Bearer " + token

        });

}
function setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const tokenData = tokenDecode(token);
        if (tokenData.exp * 1000 > new Date().getTime()) {
            Axios.defaults.headers["Authorization"] = "Bearer " + token
        }
    }

}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const tokenData = tokenDecode(token);
        if (tokenData.exp * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}


export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}