import axios from 'axios';
import authHeader from './auth-header';

const COMMENT_API_BASE_URL = "http://localhost:8080/challengecomments";

class ChallengeCommentsService {
    getAll(){
        return axios.get(COMMENT_API_BASE_URL, { headers: authHeader() });
    }

    getChallengeCommentsByChallengeId(challengeId){
        return axios.get(COMMENT_API_BASE_URL + '/' + challengeId, { headers: authHeader() });
    }
    
    postComment(challengeId, commentText) {
        console.log({commentText, challengeId})
        return axios.post(COMMENT_API_BASE_URL, {commentText, challengeId}, { headers: authHeader() })
    }
}

export default new ChallengeCommentsService();