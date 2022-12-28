package com.eureka.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eureka.app.model.Category;

public interface CategoriesRepository extends MongoRepository<Category, String> {

	Category findByName(String name);

}
