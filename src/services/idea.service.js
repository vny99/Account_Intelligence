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

    getIdeaById(ideaId){
        return axios.get(IDEA_API_BASE_URL + '/' + ideaId, { headers: authHeader() });
    }

    postIdea(idea) {
        return axios.post(IDEA_API_BASE_URL, idea, { headers: authHeader() });
    }

    // getCommentsByIdeaTitle(ideaTitle){
    //     return axios.get(IDEA_API_BASE_URL + '/' + ideaTitle, { headers: authHeader() });
    // }
}

export default new IdeaService();