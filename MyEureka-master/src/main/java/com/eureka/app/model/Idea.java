package com.eureka.app.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Idea")
public class Idea {
	
	@Transient
    public static final String SEQUENCE_NAME = "ideas_sequence";
	
	@Id
	private String id;
	@Indexed(unique=true)
	private String ideaId;
	@Indexed(unique=true)
	private String userId;
	private String fname;
	private String lname;
	private String ideaTitle;
	private String ideaDescription;
	private Date createdDate;
	private int likesCount;
	private int commentsCount;
	private int rewards;
	@DBRef
	private List<IdeaComments> ideaComments = new ArrayList<>();
	private IStatus ideaStatus;
	
	public Idea() {
		super();
	}

	public Idea(String ideaId, String userId, String fname, String lname, String ideaTitle, String ideaDescription, Date createdDate, IStatus ideaStatus) {
		super();
		this.ideaId = ideaId;
		this.userId = userId;
		this.fname = fname;
		this.lname = lname;
		this.ideaTitle = ideaTitle;
		this.ideaDescription = ideaDescription;
		this.createdDate = createdDate;
		this.ideaStatus = ideaStatus;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public List<IdeaComments> getComment() {
		return ideaComments;
	}

	public void setComment(List<IdeaComments> ideaComments) {
		this.ideaComments = ideaComments;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getIdeaTitle() {
		return ideaTitle;
	}

	public void setIdeaTitle(String ideaTitle) {
		this.ideaTitle = ideaTitle;
	}

	public int getLikesCount() {
		return likesCount;
	}

	public void setLikesCount(int likesCount) {
		this.likesCount = likesCount;
	}

	public int getCommentsCount() {
		return commentsCount;
	}

	public void setCommentsCount(int commentsCount) {
		this.commentsCount = commentsCount;
	}

	public List<IdeaComments> getComments() {
		return ideaComments;
	}

	public void setComments(List<IdeaComments> ideaComments) {
		this.ideaComments = ideaComments;
	}

	public String getIdeaDescription() {
		return ideaDescription;
	}
	public void setIdeaDescription(String ideaDescription) {
		this.ideaDescription = ideaDescription;
	}

	public IStatus getIdeaStatus() {
		return ideaStatus;
	}

	public void setIdeaStatus(IStatus ideaStatus) {
		this.ideaStatus = ideaStatus;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public int getRewards() {
		return rewards;
	}

	public void setRewards(int rewards) {
		this.rewards = rewards;
	}

	public String getIdeaId() {
		return ideaId;
	}

	public void setIdeaId(String ideaId) {
		this.ideaId = ideaId;
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

	@Override
	public String toString() {
		return "Idea [id=" + id + ", ideaId=" + ideaId + ", userId=" + userId + ", fname=" + fname + ", lname=" + lname
				+ ", ideaTitle=" + ideaTitle + ", ideaDescription=" + ideaDescription + ", createdDate=" + createdDate
				+ ", likesCount=" + likesCount + ", commentsCount=" + commentsCount + ", rewards=" + rewards
				+ ", ideaComments=" + ideaComments + ", ideaStatus=" + ideaStatus + "]";
	}
	
	
}
