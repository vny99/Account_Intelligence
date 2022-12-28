package com.eureka.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eureka.app.model.BenefitCategory;

public interface BenefitCategoriesRepository extends MongoRepository<BenefitCategory, String> {

	BenefitCategory findByName(String name);

}
