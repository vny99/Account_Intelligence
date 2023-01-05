package com.eureka.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BusinessAreas")
public class BusinessArea {
	@Id
    private String id;
    private String name;
    
	public BusinessArea() {
		super();
	}
	
	public BusinessArea(String id, String name) {
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
	
	@Override
	public String toString() {
		return "BusinessArea [id=" + id + ", name=" + name + "]";
	}

}
