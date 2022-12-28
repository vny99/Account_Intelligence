package com.eureka.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Likes" )
public class Like {
	@Id
	private String id;
	private String  userId;
	private String ideaId;
	
	public Like() {
		super();
	}

	public Like(String id, String userId, String ideaId) {
		super();
		this.id = id;
		this.userId = userId;
		this.ideaId = ideaId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getIdeaId() {
		return ideaId;
	}

	public void setIdeaId(String ideaId) {
		this.ideaId = ideaId;
	}

	@Override
	public String toString() {
		return "Like [id=" + id + ", userId=" + userId + ", ideaId=" + ideaId + "]";
	}
	
}
