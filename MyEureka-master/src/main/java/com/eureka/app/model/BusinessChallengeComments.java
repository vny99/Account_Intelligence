package com.eureka.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BusinessChallengeComments" )
public class BusinessChallengeComments {
	@Id
	private String id;
	private String userId;
	private String commentText;
	private String commentedBy;
	private String commentedDate;
	
	public BusinessChallengeComments() {
		super();
	}
	
	public BusinessChallengeComments( String userId, String commentText, String commentedBy, String commentedDate) {
		super();
		this.userId = userId;
		this.commentText = commentText;
		this.commentedBy = commentedBy;
		this.commentedDate = commentedDate;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getCommentText() {
		return commentText;
	}
	
	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}
	
	public String getCommentedBy() {
		return commentedBy;
	}
	
	public void setCommentedBy(String commentedBy) {
		this.commentedBy = commentedBy;
	}
	
	public String getCommentedDate() {
		return commentedDate;
	}
	
	public void setCommentedDate(String commentedDate) {
		this.commentedDate = commentedDate;
	}
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}
