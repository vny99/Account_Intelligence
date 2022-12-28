import axios from 'axios';
import authHeader from './auth-header';

const LIKE_API_BASE_URL = "http://localhost:8080/likes/";
class LikesService {

    getByIdeaId(id) {
        return axios.get(LIKE_API_BASE_URL + "ideaLikes/" + id, { headers: authHeader() })
    }

    like(like) {
        return axios.post(LIKE_API_BASE_URL, like, { headers: authHeader() })
    }

    getLikeOfCurrentUser(ideaId) {
        return axios.get(LIKE_API_BASE_URL + "currentUserLikes/" + ideaId, { headers: authHeader() })
    }

    unLike(id) {
        return axios.delete(LIKE_API_BASE_URL + "unlike/" + id, { headers: authHeader() })
    }
}

export default new LikesService();