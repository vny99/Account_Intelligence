package com.eureka.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eureka.app.model.BusinessArea;

public interface BusinessAreasRepository extends MongoRepository<BusinessArea, String> {

}
