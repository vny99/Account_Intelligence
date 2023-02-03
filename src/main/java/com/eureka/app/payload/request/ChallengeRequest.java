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
    private String fileId;
	public ChallengeRequest(@NotBlank String challengeTitle, @NotBlank String challengeDescription,
			@NotBlank String businessArea, Date expiryDate, String fileId) {
		super();
		this.challengeTitle = challengeTitle;
		this.challengeDescription = challengeDescription;
		this.businessArea = businessArea;
		this.expiryDate = expiryDate;
		this.fileId = fileId;
	}
	@Override
	public String toString() {
		return "ChallengeRequest [challengeTitle=" + challengeTitle + ", challengeDescription=" + challengeDescription
				+ ", businessArea=" + businessArea + ", expiryDate=" + expiryDate + ", fileId=" + fileId + "]";
	}
	public ChallengeRequest() {
		super();
		// TODO Auto-generated constructor stub
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
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	
	
}
