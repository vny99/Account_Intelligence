//package com.eureka.app.controller;
//
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.eureka.app.model.BusinessChallengeComments;
//import com.eureka.app.model.BusinessChallenges;
//import com.eureka.app.model.IdeaComments;
//import com.eureka.app.model.User;
//import com.eureka.app.repository.BusinessChallengesCommentsRepository;
//import com.eureka.app.repository.BusinessChallengesRepository;
//import com.eureka.app.repository.UserRepository;
//import com.eureka.app.security.services.UserDetailsImpl;
//
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RestController
//public class BusinessChallengesCommentsController {
//	@Autowired
//	private BusinessChallengesCommentsRepository commentsRepo;
//	
//	@Autowired
//	UserRepository usersRepo;
//	
//	@Autowired
//	BusinessChallengesRepository challengesRepository;
//	
//	@GetMapping("/challengecomments")
//	public List<BusinessChallengeComments> getAllComments() {
//		return commentsRepo.findAll();
//	}
//
//	@GetMapping("/challengecomments/{businessId}")
//	public List<BusinessChallengeComments> getCommentsByIdeaId(@PathVariable String businessId){
//		List<BusinessChallengeComments> comments = new ArrayList<>();
//		
//		BusinessChallenges businessChallenges = challengesRepository.findById(businessId).get();
//		comments = businessChallenges.getComments();
//		
//		return comments;
//	}
//
//	@PostMapping("/challengecomments")
//	public ResponseEntity<BusinessChallengeComments> postComment(@RequestBody BusinessChallengeComments businessChallengeComment) {
//		
//		if(businessChallengeComment != null) {
//			try {
//				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//		    	String commentedBy = userDetails.getUsername(); //email is fetched in the username
//		    	
//		    	Date date = new Date();
//		        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
//		        String commentedDate = formatter.format(date);
//		        String email = userDetails.getUsername();
//		        User user = usersRepo.findByEmail(email);
//		       
//				BusinessChallengeComments comment = new BusinessChallengeComments(user.getId(),commentText, commentedBy, commentedDate);
//				commentsRepo.save(comment);
//				
//				BusinessChallenges challenge = challengesRepository.findById(challengeId).get();
//				List<BusinessChallengeComments> comments = challenge.getComments();
//				comments.add(comment);
//				challenge.setComments(comments);
//				challengesRepository.save(challenge);
//				
//				return new ResponseEntity<>(comment, HttpStatus.CREATED);
//			}
//			
//			catch(Exception e) {
//				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//			}
//		}
//		
//		else {
//			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
//}
