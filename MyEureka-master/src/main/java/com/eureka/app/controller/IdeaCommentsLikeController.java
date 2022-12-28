package com.eureka.app.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.eureka.app.repository.CommentsRepository;
import com.eureka.app.repository.IdeaCommentsLikeRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class IdeaCommentsLikeController {
	private IdeaCommentsLikeRepository repo;
	private CommentsRepository cRepo;
	

}
