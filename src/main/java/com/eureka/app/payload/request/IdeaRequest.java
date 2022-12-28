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
	
	public IdeaRequest(@NotBlank String ideaTitle, @NotBlank String ideaDescription, @NotBlank String benefitCategory,
			@NotBlank String category) {
		super();
		this.ideaTitle = ideaTitle;
		this.ideaDescription = ideaDescription;
		this.benefitCategory = benefitCategory;
		this.category = category;
	}

	public IdeaRequest() {
		super();
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
	
}
