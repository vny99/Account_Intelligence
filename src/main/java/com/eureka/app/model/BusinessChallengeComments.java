package com.eureka.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BusinessChallengeComments" )
public class BusinessChallengeComments {
	@Id
	private String id;
	private String commentText;
	private String ideaId;
	private String userId;
	private String fname;
	private String lname;
	private String commentedDate;
	private int rewards;
	
	public BusinessChallengeComments() {
		super();
	}
	
	public BusinessChallengeComments(String id, String commentText, String ideaId, String userId, String fname, String lname,
			String commentedDate, int rewards) {
		super();
		this.id = id;
		this.commentText = commentText;
		this.ideaId = ideaId;
		this.userId = userId;
		this.fname = fname;
		this.lname = lname;
		this.commentedDate = commentedDate;
		this.rewards = rewards;
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

	public String getIdeaId() {
		return ideaId;
	}

	public void setIdeaId(String ideaId) {
		this.ideaId = ideaId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getCommentedDate() {
		return commentedDate;
	}

	public void setCommentedDate(String commentedDate) {
		this.commentedDate = commentedDate;
	}

	public int getRewards() {
		return rewards;
	}

	public void setRewards(int rewards) {
		this.rewards = rewards;
	}

	@Override
	public String toString() {
		return "BusinessChallengeComments [id=" + id + ", commentText=" + commentText + ", ideaId=" + ideaId
				+ ", userId=" + userId + ", fname=" + fname + ", lname=" + lname + ", commentedDate=" + commentedDate
				+ ", rewards=" + rewards + "]";
	}
	
}
