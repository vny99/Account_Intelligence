import axios from 'axios';
import authHeader from './auth-header';

const USER_API_BASE_URL = "http://localhost:8080/users/";

class UserService {

    getUserByEmail(email){
        return axios.get(USER_API_BASE_URL + email, { headers: authHeader() });
    }

    addFavorite(ideaId){
        console.log(authHeader())
        console.log(ideaId)
        // return axios.post(USER_API_BASE_URL, ideaId, { headers: authHeader() });
        return axios.post(USER_API_BASE_URL + "addFavorite", { params: { ideaId: ideaId}, headers: authHeader() });
    }

    getFavorites() {
        return axios.get(USER_API_BASE_URL + "favorites", { headers: authHeader() });
    }
}

export default new UserService();