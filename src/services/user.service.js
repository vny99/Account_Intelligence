import axios from 'axios';
import authHeader from './auth-header';

const USER_API_BASE_URL = "http://localhost:8080/users/";

class UserService {

    getUserByEmail(email){
        return axios.get(USER_API_BASE_URL + email, { headers: authHeader() });
    }

    addFavorite(id){
        return axios({ method: 'post', url: USER_API_BASE_URL + "addFavorite/" + id, headers: authHeader() })
    }

    removeFavorite(id){
        return axios({ method: 'post', url: USER_API_BASE_URL + "removeFavorite/" + id, headers: authHeader() })
    }

    getFavorites() {
        return axios.get(USER_API_BASE_URL + "favorites", { headers: authHeader() });
    }

    updateUserByEmail(email, profile){
        return axios.post(USER_API_BASE_URL + email, profile,{ headers: authHeader() });
    }
}

export default new UserService();