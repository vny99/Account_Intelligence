package com.eureka.app.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BusinessChallenges")
public class BusinessChallenges {
	
	@Transient
    public static final String SEQUENCE_NAME = "challenges_sequence";
	
	@Id
	private String id;
	@Indexed(unique=true)
	private String challengeId;
	@Indexed(unique=true)
	private String userId;
	private String fname;
	private String lname;
	private String challengeTitle;
	private String challengeDescription;
	private Date createdDate;
	private int commentsCount;
	private Date expiryDate;
	private BStatus challengeStatus;
	@DBRef
	private List<BusinessChallengeComments> comments = new ArrayList<>();
	
	public BusinessChallenges() {
		super();
	}

	public BusinessChallenges(String challengeId, String userId, String fname, String lname, String challengeTitle,
			String challengeDescription, Date createdDate, Date expiryDate, BStatus challengeStatus) {
		super();
		this.challengeId = challengeId;
		this.userId = userId;
		this.fname = fname;
		this.lname = lname;
		this.challengeTitle = challengeTitle;
		this.challengeDescription = challengeDescription;
		this.createdDate = createdDate;
		this.expiryDate = expiryDate;
		this.challengeStatus = challengeStatus;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getChallengeId() {
		return challengeId;
	}

	public void setChallengeId(String challengeId) {
		this.challengeId = challengeId;
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

	public String getChallengeTitle() {
		return challengeTitle;
	}

	public void setChallengeTitle(String challengeTitle) {
		this.challengeTitle = challengeTitle;
	}

	public String getChallengeDescription() {
		return challengeDescription;
	}

	public void setChallengeDescription(String challengeDescription) {
		this.challengeDescription = challengeDescription;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public int getCommentsCount() {
		return commentsCount;
	}

	public void setCommentsCount(int commentsCount) {
		this.commentsCount = commentsCount;
	}

	public List<BusinessChallengeComments> getComments() {
		return comments;
	}

	public void setComments(List<BusinessChallengeComments> comments) {
		this.comments = comments;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public BStatus getChallengeStatus() {
		return challengeStatus;
	}

	public void setChallengeStatus(BStatus challengeStatus) {
		this.challengeStatus = challengeStatus;
	}

	public static String getSequenceName() {
		return SEQUENCE_NAME;
	}

	@Override
	public String toString() {
		return "BusinessChallenges [id=" + id + ", challengeId=" + challengeId + ", userId=" + userId + ", fname="
				+ fname + ", lname=" + lname + ", challengeTitle=" + challengeTitle + ", challengeDescription="
				+ challengeDescription + ", createdDate=" + createdDate + ", commentsCount=" + commentsCount
				+ ", expiryDate=" + expiryDate + ", challengeStatus=" + challengeStatus + ", comments=" + comments
				+ "]";
	}
	
}
