package com.eureka.app.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eureka.app.model.BusinessChallengeComments;
import com.eureka.app.model.BusinessChallenges;
import com.eureka.app.model.User;
import com.eureka.app.repository.BusinessChallengesCommentsRepository;
import com.eureka.app.repository.BusinessChallengesRepository;
import com.eureka.app.repository.UserRepository;
import com.eureka.app.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class BusinessChallengesCommentsController {
	@Autowired
	private BusinessChallengesCommentsRepository commentsRepo;
	
	@Autowired
	UserRepository usersRepo;
	
	@Autowired
	BusinessChallengesRepository challengesRepo;
	
	@GetMapping("/challengecomments")
	public List<BusinessChallengeComments> getAllComments() {
		return commentsRepo.findAll();
	}

	@GetMapping("/challengecomments/{businessId}")
	public List<BusinessChallengeComments> getChallengeCommentsByChallengeId(@PathVariable String businessId){
		List<BusinessChallengeComments> comments = new ArrayList<>();
		
		BusinessChallenges businessChallenges = challengesRepo.findById(businessId).get();
		comments = businessChallenges.getComments();
		
		return comments;
	}

	@PostMapping("/challengecomments")
	public ResponseEntity<BusinessChallengeComments> postComment(@RequestBody BusinessChallengeComments businessChallengeComment) {
		if(businessChallengeComment != null) {
			try {
				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		    	String email = userDetails.getUsername(); //email is fetched in the username
		    	User user = usersRepo.findByEmail(email);
		    	
		    	businessChallengeComment.setUserId(user.getId());
		    	businessChallengeComment.setFname(user.getFname());
		    	businessChallengeComment.setLname(user.getLname());
		    	
		    	Date date = new Date();
		        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
		        String commentedDate = formatter.format(date);
		        businessChallengeComment.setCommentedDate(commentedDate);
		        
				commentsRepo.save(businessChallengeComment);
				
				BusinessChallenges challenge = challengesRepo.findById(businessChallengeComment.getChallengeId()).get();
		        List<BusinessChallengeComments> comments = challenge.getComments();
		        comments.add(businessChallengeComment);
		        challenge.setComments(comments);
		        
		        int commentsCount = challenge.getCommentsCount();
		        commentsCount++;
		        challenge.setCommentsCount(commentsCount);
		        
//				UpdateBusinessChallengeCommentsCount.updateBusinessChallengeCommentsCount(challenge.getId(), challenge.getComments());
		        
		        challengesRepo.save(challenge);
				
				return new ResponseEntity<>(businessChallengeComment, HttpStatus.CREATED);
			}
			
			catch(Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		else {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("challengecomments/updateComment/{id}")
    public ResponseEntity<BusinessChallengeComments> updateComment(@PathVariable String id,
            @RequestBody BusinessChallengeComments challengeComments) {
        BusinessChallengeComments myCom = commentsRepo.findById(id).get();
        myCom.setCommentText(challengeComments.getCommentText());
        return new ResponseEntity<>(commentsRepo.save(myCom), HttpStatus.OK);
    }
}
