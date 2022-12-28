package com.eureka.app.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.eureka.app.model.BusinessChallenges;

public interface BusinessChallengesRepository extends MongoRepository<BusinessChallenges, String> {
	List<BusinessChallenges> findByFname(String fname);
	List<BusinessChallenges> findByChallengeTitle(String challengeTitle);
}
