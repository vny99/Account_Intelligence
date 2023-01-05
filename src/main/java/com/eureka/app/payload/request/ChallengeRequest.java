package com.eureka.app.payload.request;

import java.util.Date;

import javax.validation.constraints.NotBlank;

public class ChallengeRequest {
	@NotBlank
	private String challengeTitle;
	@NotBlank
	private String challengeDescription;
	@NotBlank
    private String businessArea;
    private Date expiryDate;
	
	public ChallengeRequest() {
		super();
	}
	
	public ChallengeRequest(@NotBlank String challengeTitle, @NotBlank String challengeDescription,
			@NotBlank String businessArea, Date expiryDate) {
		super();
		this.challengeTitle = challengeTitle;
		this.challengeDescription = challengeDescription;
		this.businessArea = businessArea;
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
	public String getBusinessArea() {
		return businessArea;
	}

	public void setBusinessArea(String businessArea) {
		this.businessArea = businessArea;
	}
	public Date getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	@Override
	public String toString() {
		return "ChallengeRequest [challengeTitle=" + challengeTitle + ", challengeDescription=" + challengeDescription
				+ ", businessArea=" + businessArea + ", expiryDate=" + expiryDate + "]";
	}
}
