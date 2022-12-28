package com.eureka.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eureka.app.model.IdeaComments;

public interface CommentsRepository extends MongoRepository<IdeaComments, String> {

}
