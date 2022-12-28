package com.eureka.app.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eureka.app.model.Like;

public interface LikesRepository extends MongoRepository<Like, String>{
	String getByIdeaId(String ideaId);
	List<Like> findLikesByIdeaId(String ideaId);
}
