import axios from 'axios';
import authHeader from './auth-header';

const USER_API_BASE_URL = "http://localhost:8080/users/";

class UserService {

    getUserByEmail(email){
        return axios.get(USER_API_BASE_URL + email, { headers: authHeader() });
    }
}

export default new UserService();