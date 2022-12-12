import axios from 'axios';
import authHeader from './auth-header';

const COMMENT_API_BASE_URL = "http://localhost:8080/comments";

class CommentService{
    getAll(){
        return axios.get(COMMENT_API_BASE_URL, { headers: authHeader() });
    }

    getById(commentId){
        return axios.get(COMMENT_API_BASE_URL + '/' + commentId, { headers: authHeader() });
    }
    
    postComment(ideaId,commentText,commentedBy) {
        return axios
          .post(COMMENT_API_BASE_URL, { ideaId,commentText,commentedBy }, { headers: authHeader() })
      }
}
export default new CommentService();