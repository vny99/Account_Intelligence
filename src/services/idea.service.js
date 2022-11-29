import axios from 'axios';
import authHeader from './auth-header';

const IDEA_API_BASE_URL = "http://localhost:8080/ideas";

class IdeaService {

    getIdeas(){
        return axios.get(IDEA_API_BASE_URL, { headers: authHeader() });
    }

    getIdeaById(ideaId){
        return axios.get(IDEA_API_BASE_URL + '/' + ideaId, { headers: authHeader() });
    }
}

export default new IdeaService();