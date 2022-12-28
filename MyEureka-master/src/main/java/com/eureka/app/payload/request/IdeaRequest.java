package com.eureka.app.payload.request;

import javax.validation.constraints.NotBlank;

public class IdeaRequest {
	@NotBlank
	private String ideaTitle;
	@NotBlank
	private String ideaDescription;
	
	public IdeaRequest(String ideaTitle, String ideaDescription) {
		super();
		this.ideaTitle = ideaTitle;
		this.ideaDescription = ideaDescription;
	}
	public IdeaRequest() {
		super();
		// TODO Auto-generated constructor stub
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
	
	
}
