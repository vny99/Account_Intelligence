package com.eureka.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eureka.app.model.Idea;
import com.eureka.app.model.Like;
import com.eureka.app.model.User;
import com.eureka.app.repository.IdeasRepository;
import com.eureka.app.repository.LikesRepository;
import com.eureka.app.repository.UserRepository;
import com.eureka.app.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class LikesController {
	@Autowired
	IdeasRepository ideasRepo;
	
	@Autowired
	LikesRepository likesRepo;
	
	@Autowired
	UserRepository usersRepo;
	
	@GetMapping("/likes/ideaLikes/{id}")
	String getByIdeaId(@PathVariable String id) {
		return likesRepo.getByIdeaId(id);
	}
	
	@PostMapping("/likes")
	void like(@RequestBody Like like) {
		List<Like> likes = likesRepo.findLikesByIdeaId(like.getIdeaId());
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    	String email = userDetails.getUsername();
    	User user = usersRepo.findByEmail(email);
    	String userId = user.getId();

		
		Boolean available=true;
		for(Like l : likes) {
			if(l.getUserId().equals(userId)) {
				available=false;
				break;
			}
		}
		
		if(available) {
			Idea idea= ideasRepo.findById(like.getIdeaId()).get();
			idea.setLikesCount(idea.getLikesCount()+1);
			like.setUserId(userId);
			likesRepo.save(like);
			ideasRepo.save(idea);
		}
	}
	
	@DeleteMapping("/likes/unlike/{id}")
	void unLike(@PathVariable String id) {
		Like like = likesRepo.findById(id).get();
		Idea myIdea = ideasRepo.findById(like.getIdeaId()).get();
		myIdea.setLikesCount(myIdea.getLikesCount()-1);
		likesRepo.deleteById(id);
		ideasRepo.save(myIdea);
	}
	
	@GetMapping("/likes/currentUserLikes/{id}")
	String getLikeOfCurrentUser(@PathVariable String id) {
		List<Like> likes = likesRepo.findLikesByIdeaId(id);
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    	String email = userDetails.getUsername();
    	User user = usersRepo.findByEmail(email);
    	String userId = user.getId();
		
		for(Like like : likes) {
			if(like.getUserId().equals(userId)) {
				return like.getId();
			}
		}
		return null;
	}

}
