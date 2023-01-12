package com.eureka.app.payload.request;

import javax.validation.constraints.NotBlank;

public class IdeaRequest {
	@NotBlank
	private String ideaTitle;
	@NotBlank
	private String ideaDescription;
	@NotBlank
	private String benefitCategory;
	@NotBlank
	private String category;
	
	private String fileId;

	public IdeaRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public IdeaRequest(@NotBlank String ideaTitle, @NotBlank String ideaDescription, @NotBlank String benefitCategory,
			@NotBlank String category, String fileId) {
		super();
		this.ideaTitle = ideaTitle;
		this.ideaDescription = ideaDescription;
		this.benefitCategory = benefitCategory;
		this.category = category;
		this.fileId = fileId;
	}

	public String getIdeaTitle() {
		return ideaTitle;
	}

	public void setIdeaTitle(String ideaTitle) {
		this.ideaTitle = ideaTitle;
	}

	public String getIdeaDescription() {
		return ideaDescription;
	}

	public void setIdeaDescription(String ideaDescription) {
		this.ideaDescription = ideaDescription;
	}

	public String getBenefitCategory() {
		return benefitCategory;
	}

	public void setBenefitCategory(String benefitCategory) {
		this.benefitCategory = benefitCategory;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	
	
}
