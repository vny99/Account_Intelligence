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

import com.eureka.app.model.Idea;
import com.eureka.app.model.IdeaComments;
import com.eureka.app.model.User;
import com.eureka.app.repository.CommentsRepository;
import com.eureka.app.repository.IdeasRepository;
import com.eureka.app.repository.UserRepository;
import com.eureka.app.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class IdeasCommentsController {
	@Autowired
	CommentsRepository commentsRepo;
	
	@Autowired
	UserRepository usersRepo;
	
	@Autowired
	IdeasRepository ideasRepo;
	
	@GetMapping("/ideaComments")
	public List<IdeaComments> getAllComments() {
		List<IdeaComments> allComments = commentsRepo.findAll();
		
		return allComments;
	}
	
	@GetMapping("/ideaComments/{ideaId}")
	public List<IdeaComments> getCommentsByIdeaId(@PathVariable String ideaId){
		List<IdeaComments> ideaComments = new ArrayList<>();
		
		Idea idea = ideasRepo.findById(ideaId).get();
		ideaComments = idea.getComments();
		
		idea.setCommentsCount(ideaComments.size());
		ideasRepo.save(idea);
		
		return ideaComments;
	}
	
	@PostMapping("/ideaComments")
	public ResponseEntity<IdeaComments> postComment(@RequestBody IdeaComments ideaComment ) {
        
		if(ideaComment != null) {
			try {
				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		        String email = userDetails.getUsername();
		        User user = usersRepo.findByEmail(email);
		        
		        ideaComment.setUserId(user.getId());
		        ideaComment.setFname(user.getFname());
		        ideaComment.setLname(user.getLname());
		        
		        Date date = new Date();
		        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
		        String commentedDate = formatter.format(date);
		        ideaComment.setCommentedDate(commentedDate);
		        
		        commentsRepo.save(ideaComment);
		        
		        Idea idea = ideasRepo.findById(ideaComment.getIdeaId()).get();
		        List<IdeaComments> comments = idea.getComments();
		        comments.add(ideaComment);
		        idea.setComments(comments);
		        
		        int commentsCount = idea.getCommentsCount();
		        commentsCount++;
		        idea.setCommentsCount(commentsCount);
		        
//				UpdateIdeaCommentsCount.updateIdeaCommentsCount(idea.getId(), idea.getComments());
		        
		        ideasRepo.save(idea);
				
				return new ResponseEntity<>(ideaComment, HttpStatus.CREATED);
			}
			
			catch(Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		else {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }
	
	@PutMapping("/ideaComments/updateComment/{id}")
    public ResponseEntity<IdeaComments> updateComment(@PathVariable String id,
            @RequestBody IdeaComments ideaComments) {
        IdeaComments myComment = commentsRepo.findById(id).get();
        myComment.setCommentText(ideaComments.getCommentText());
        return new ResponseEntity<>(commentsRepo.save(myComment), HttpStatus.OK);
    }

}
