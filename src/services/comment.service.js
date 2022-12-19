import axios from 'axios';
import authHeader from './auth-header';

const COMMENT_API_BASE_URL = "http://localhost:8080/comments";

class CommentService{
    getAll(){
        return axios.get(COMMENT_API_BASE_URL, { headers: authHeader() });
    }

    getCommentsByIdeaId(ideaId){
        return axios.get(COMMENT_API_BASE_URL + '/' + ideaId, { headers: authHeader() });
    }
    
    // postComment(ideaId, commentText) {
    //     return axios.post(COMMENT_API_BASE_URL + "/" + ideaId, { params: {commentText: commentText}, headers: authHeader() })
    // }

    postComment(ideaId, commentText) {
        return axios.post(COMMENT_API_BASE_URL, {commentText, ideaId}, { headers: authHeader() })
    }
}
export default new CommentService();