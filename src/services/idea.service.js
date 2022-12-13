import axios from 'axios';
import authHeader from './auth-header';

const IDEA_API_BASE_URL = "http://localhost:8080/ideas";

class IdeaService {

    getIdeas(){
        return axios.get(IDEA_API_BASE_URL, { headers: authHeader() });
    }

    getRecentIdeas(){
        return axios.get(IDEA_API_BASE_URL + "/recent/", { headers: authHeader() });
    }

    getIdeaByIdeaId(ideaId){
        return axios.get(IDEA_API_BASE_URL + "/ideaId", { params: {ideaId: ideaId}, headers: authHeader() });
    }

    getIdeaByUserId(userId){
        return axios.get(IDEA_API_BASE_URL + "/userId", { params: {userId: userId}, headers: authHeader() });
    }

    postIdea(idea) {
        return axios.post(IDEA_API_BASE_URL, idea, { headers: authHeader() });
    }
}

export default new IdeaService();