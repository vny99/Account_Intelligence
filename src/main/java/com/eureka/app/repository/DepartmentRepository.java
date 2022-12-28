package com.eureka.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.eureka.app.model.Department;

public interface DepartmentRepository extends MongoRepository<Department, String> {
	Department findByName(String name);

}
