package com.eureka.app.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eureka.app.model.Idea;

public interface IdeasRepository extends MongoRepository<Idea, String> {
	Idea findByUserId(String userId);
	Idea findByIdeaId(String ideaId);
	List<Idea> findByIdeaTitle(String ideaTitle);
	Idea findByFileId(String fileId);
}
