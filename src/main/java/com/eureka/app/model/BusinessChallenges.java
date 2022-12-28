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
	private String fname;
	private String lname;
	private String challengeTitle;
	private String challengeDescription;
	private Date createdDate;
	private Date expiryDate;
	private BStatus challengeStatus;
	public List<BusinessChallengeComments> getComments() {
		return comments;
	}

	public void setComments(List<BusinessChallengeComments> comments) {
		this.comments = comments;
	}

	@DBRef
	private List<BusinessChallengeComments> comments = new ArrayList<>();
	
	public BusinessChallenges() {
		super();
	}

	public BusinessChallenges(String challengeId, String fname, String lname, String challengeTitle, String challengeDescription,
			Date createdDate, Date expiryDate, BStatus challengeStatus) {
		super();
		this.challengeId = challengeId;
		this.fname = fname;
		this.lname = lname;
		this.challengeTitle = challengeTitle;
		this.challengeDescription = challengeDescription;
		this.createdDate = createdDate;
		this.expiryDate = expiryDate;
		this.challengeStatus = challengeStatus;
	}

	public BusinessChallenges(String id, String challengeId, String fname, String lname, String challengeTitle,
			String challengeDescription, Date createdDate, Date expiryDate, BStatus challengeStatus,
			List<BusinessChallengeComments> comments) {
		super();
		this.id = id;
		this.challengeId = challengeId;
		this.fname = fname;
		this.lname = lname;
		this.challengeTitle = challengeTitle;
		this.challengeDescription = challengeDescription;
		this.createdDate = createdDate;
		this.expiryDate = expiryDate;
		this.challengeStatus = challengeStatus;
		this.comments = comments;
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

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getChallengeDescription() {
		return challengeDescription;
	}
	
	public void setChallengeDescription(String challengeDescription) {
		this.challengeDescription = challengeDescription;
	}

	public BStatus getChallengeStatus() {
		return challengeStatus;
	}

	public void setChallengeStatus(BStatus challengeStatus) {
		this.challengeStatus = challengeStatus;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Override
	public String toString() {
		return "BusinessChallenges [id=" + id + ", challengeId=" + challengeId + ", fname=" + fname + ", lname=" + lname
				+ ", challengeTitle=" + challengeTitle + ", challengeDescription=" + challengeDescription
				+ ", createdDate=" + createdDate + ", expiryDate=" + expiryDate + ", challengeStatus=" + challengeStatus
				+ ", comments=" + comments + "]";
	}
	
}
