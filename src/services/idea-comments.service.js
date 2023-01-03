import axios from 'axios';
import authHeader from './auth-header';

const COMMENT_API_BASE_URL = "http://localhost:8080/ideaComments";

class IdeaCommentsService {
    getAll(){
        return axios.get(COMMENT_API_BASE_URL, { headers: authHeader() });
    }

    getCommentsByIdeaId(ideaId){
        return axios.get(COMMENT_API_BASE_URL + '/' + ideaId, { headers: authHeader() });
    }

    postComment(ideaId, commentText) {
        return axios.post(COMMENT_API_BASE_URL, {commentText, ideaId}, { headers: authHeader() })
    }

    updateComment(commentId, commentText){
        return axios.put(COMMENT_API_BASE_URL + "/updateComment/" + commentId, {commentText}, { headers : authHeader() })
    }
}
export default new IdeaCommentsService();