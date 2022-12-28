package com.eureka.app.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eureka.app.model.Idea;
import com.eureka.app.model.User;
import com.eureka.app.repository.IdeasRepository;
import com.eureka.app.repository.UserRepository;
import com.eureka.app.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	IdeasRepository ideasRepo;
	
	@GetMapping("/users")
	public List<User> getAllUsers(@RequestParam(required = false) String email) {

		if (email != null) {
			List<User> users = new ArrayList<>();
			users.add(userRepo.findByEmail(email));
			return users;
		}
		return userRepo.findAll();
	}

	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		return userRepo.save(user);
	}

	@PutMapping("users/{id}")
	public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    	String email = userDetails.getUsername();
    	User user = userRepo.findByEmail(email);
		
    	user.setFname(updatedUser.getFname());
    	
		return new ResponseEntity<>(userRepo.save(user), HttpStatus.OK);
	}

	@DeleteMapping("/users")
	public ResponseEntity<HttpStatus> deleteAllUsers() {
		try {
			userRepo.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/users/isActive")
	public List<User> getAllActiveUsers(){
		return userRepo.findByIsActive(true);
	}
	
	@GetMapping("users/emailExists/{email}")
	public boolean emailExists(@PathVariable String email) {
		return userRepo.existsByEmail(email);
	}
	
	@PostMapping("users/addFavorite/{id}")
	public User addFavorite(@PathVariable String id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    	String email = userDetails.getUsername();
    	User user = userRepo.findByEmail(email);
    	
		Idea idea = ideasRepo.findById(id).get();
		List<Idea> favoriteIdeas = user.getFavorites();
		
		Set<String> favoriteIdeaIds = new HashSet<>();
		
		for (Idea fav : favoriteIdeas)  favoriteIdeaIds.add(fav.getId());
		if (!favoriteIdeaIds.contains(idea.getId())) {
			favoriteIdeas.add(idea);
			user.setFavorites(favoriteIdeas);
		}
		
		return userRepo.save(user);
	}
	
	@PostMapping("users/removeFavorite/{id}")
	public User removeFavorite(@PathVariable String id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    	String email = userDetails.getUsername();
    	User user = userRepo.findByEmail(email);
    	
		List<Idea> favoriteIdeas = user.getFavorites();
		
		List<Idea> newFavoriteIdeas = new ArrayList<>();
//		for (Idea idea : favoriteIdeas) newFavoriteIdeas.add(idea);
		
//		System.out.println("Before : " + favoriteIdeas.size());
		for (Idea idea : favoriteIdeas) {
			if (!idea.getId().equals(id)) { newFavoriteIdeas.add(idea); }
		}
//		System.out.println("After : " + newFavoriteIdeas.size());
		
		user.setFavorites(newFavoriteIdeas);
		return userRepo.save(user);
	}
	
	@GetMapping("/users/favorites")
	public List<Idea> getAllFavorites(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    	String email = userDetails.getUsername();
    	User user = userRepo.findByEmail(email);
    	
		List<Idea> favIdeas = new ArrayList<>(user.getFavorites());
		return favIdeas;
	}
	
	@GetMapping("users/{email}")
	public User getUserByEmail(@PathVariable String email) {
		return userRepo.findByEmail(email);
	}
}
