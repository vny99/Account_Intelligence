package com.eureka.app.payload.request;

import java.util.Date;

import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

public class ChallengeRequest {
	@NotBlank
	private String challengeTitle;
	@NotBlank
	private String challengeDescription;
	private Date expiryDate;
	
	public ChallengeRequest() {
		super();
	}
	
	public ChallengeRequest(String challengeTitle, String challengeDescription, Date expiryDate) {
		super();
		this.challengeTitle = challengeTitle;
		this.challengeDescription = challengeDescription;
		this.expiryDate = expiryDate;
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
	public Date getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

}
