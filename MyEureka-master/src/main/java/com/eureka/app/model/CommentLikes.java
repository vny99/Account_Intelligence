package com.eureka.app.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="CommentLikes")
public class CommentLikes {
	@Id
	private String likeId;
	private String userId;
	private String commentId;
	public CommentLikes() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CommentLikes(String likeId, String userId, String commentId) {
		super();
		this.likeId = likeId;
		this.userId = userId;
		this.commentId = commentId;
	}
	@Override
	public String toString() {
		return "CommentLIkes [likeId=" + likeId + ", userId=" + userId + ", commentId=" + commentId + "]";
	}
	public String getLikeId() {
		return likeId;
	}
	public void setLikeId(String likeId) {
		this.likeId = likeId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getCommentId() {
		return commentId;
	}
	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}
	
}
