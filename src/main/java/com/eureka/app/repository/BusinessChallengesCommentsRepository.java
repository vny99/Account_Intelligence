package com.eureka.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eureka.app.model.BusinessChallengeComments;

public interface BusinessChallengesCommentsRepository extends MongoRepository<BusinessChallengeComments, String> {

}