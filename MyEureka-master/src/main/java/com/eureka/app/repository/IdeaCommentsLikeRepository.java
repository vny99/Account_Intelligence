package com.eureka.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.eureka.app.model.CommentLikes;
@Repository
public interface IdeaCommentsLikeRepository extends MongoRepository<CommentLikes, String> {

}
