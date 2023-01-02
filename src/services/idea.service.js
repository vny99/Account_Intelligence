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

    getMostlikedcards(){
        return axios.get(IDEA_API_BASE_URL + "/liked", { headers: authHeader() });
    }

    getMostcommentedcards(){
        return axios.get(IDEA_API_BASE_URL + "/commented", { headers: authHeader() });
    }

    getIdeaByIdeaId(ideaId){
        return axios.get(IDEA_API_BASE_URL + "/ideaId", { params: {ideaId: ideaId}, headers: authHeader() });
    }

    getIdeaByUserId(userId){
        return axios.get(IDEA_API_BASE_URL + "/userId", { params: {userId: userId}, headers: authHeader() });
    }

    addIdea(idea) {
        return axios.post(IDEA_API_BASE_URL, idea, { headers: authHeader() });
    }

    updateIdea(ideaId,idea){
        return axios.put(IDEA_API_BASE_URL + "/" + ideaId, idea, { headers: authHeader() });
    }

    findByTitleDescription(searchItem) {
        return axios.get(IDEA_API_BASE_URL + "/search", { params: { searchItem: searchItem}, headers: authHeader() });
    }

    isFavoriteIdeaOfCurrentUser(id){
        return axios.get(IDEA_API_BASE_URL + "/isFavorite/" + id , {headers: authHeader() });
    }

    getBenefitCategoriesList(){
        return axios.get(IDEA_API_BASE_URL + "/benefitcategories", {headers: authHeader() })
    }

    getCategoriesList(){
        return axios.get(IDEA_API_BASE_URL + "/categories", {headers: authHeader() })
    }
}

export default new IdeaService();