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

import com.eureka.app.model.IdeaComments;
import com.eureka.app.model.Idea;
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
	
	@GetMapping("/comments")
	public List<IdeaComments> getAllComments() {
		return commentsRepo.findAll();
	}
	
	@GetMapping("/comments/{ideaId}")
	public List<IdeaComments> getCommentsByIdeaId(@PathVariable String ideaId){
		List<IdeaComments> ideaComments = new ArrayList<>();
		
		Idea idea = ideasRepo.findById(ideaId).get();
		ideaComments = idea.getComments();
		return ideaComments;
	}
	
	@PostMapping("/comments")
	public void addcomment(@RequestBody IdeaComments ideaComments ) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String email = userDetails.getUsername();
        User user = usersRepo.findByEmail(email);
        
        ideaComments.setUserId(user.getId());
        ideaComments.setFname(user.getFname());
        ideaComments.setLname(user.getLname());
        
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
        String commentedDate = formatter.format(date);
        ideaComments.setCommentedDate(commentedDate);
        
        commentsRepo.save(ideaComments);
        
        Idea idea = ideasRepo.findById(ideaComments.getIdeaId()).get();
        List<IdeaComments> comments = idea.getComments();
        comments.add(ideaComments);
        idea.setComments(comments);
        
        int commentsCount = idea.getCommentsCount();
        commentsCount++;
        idea.setCommentsCount(commentsCount);
        
        ideasRepo.save(idea);
    }
	
	@PutMapping("updatecomment/{id}")
    public ResponseEntity<IdeaComments> updateComment(@PathVariable String id,
            @RequestBody IdeaComments ideaComments) {
		System.out.println(id);
		System.out.println(ideaComments);
        IdeaComments myComment = commentsRepo.findById(id).get();
        myComment.setCommentText(ideaComments.getCommentText());
        return new ResponseEntity<>(commentsRepo.save(myComment), HttpStatus.OK);
    }

}
