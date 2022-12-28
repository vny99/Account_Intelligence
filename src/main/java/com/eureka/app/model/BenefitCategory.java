package com.eureka.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BenefitCategories")
public class BenefitCategory {
	@Id
	private String id;
	private String name;
	
	public BenefitCategory() {
		super();
	}
	
	public BenefitCategory(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
