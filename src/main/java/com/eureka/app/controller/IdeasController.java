package com.eureka.app.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import com.eureka.app.model.BenefitCategory;
import com.eureka.app.model.Category;
import com.eureka.app.model.IStatus;
import com.eureka.app.model.Idea;
import com.eureka.app.model.User;
import com.eureka.app.payload.request.IdeaRequest;
import com.eureka.app.repository.BenefitCategoriesRepository;
import com.eureka.app.repository.CategoriesRepository;
import com.eureka.app.repository.IdeasRepository;
import com.eureka.app.repository.UserRepository;
import com.eureka.app.security.services.UserDetailsImpl;
import com.eureka.app.service.SequenceGeneratorService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class IdeasController {
	@Autowired
	IdeasRepository ideasRepo;
	
	@Autowired
	UserRepository usersRepo;
	
	@Autowired
	BenefitCategoriesRepository benefitCategoriesRepo;
	
	@Autowired
	CategoriesRepository categoriesRepo;
	
	@GetMapping("/ideas")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Idea> getAllIdeas() {
		return ideasRepo.findAll();
	}
	
	@GetMapping("/ideas/recent")
	public List<Idea> getRecentIdeas() {
		Pageable sortedPage = PageRequest.of(0, 6, Sort.by(Sort.Direction.DESC, "createdDate"));
		Iterable<Idea> iterable = ideasRepo.findAll(sortedPage);
		List<Idea> recentIdeas = new ArrayList<>();
		iterable.forEach(recentIdeas::add);
		return recentIdeas;
	}
	
	@GetMapping("/ideas/liked")
    public List<Idea> Mostlikedcards() {
        Pageable sortedPage = PageRequest.of(0, 6, Sort.by(Sort.Direction.DESC, "likesCount"));
        Iterable<Idea> iterable = ideasRepo.findAll(sortedPage);
        List<Idea> allMostLikedIdeas = new ArrayList<>();
        iterable.forEach(allMostLikedIdeas::add);
        
        List<Idea> mostLikedIdeas = new ArrayList<>();
        for (int i=0; i<allMostLikedIdeas.size(); i++) {
//            if(allMostLikedIdeas.get(i).getLikes().size()>0) {
            if(allMostLikedIdeas.get(i).getLikesCount()>0) {
            	mostLikedIdeas.add(allMostLikedIdeas.get(i));
            }
        }
        return mostLikedIdeas;
    }
	
	@GetMapping("/ideas/commented")
    public List<Idea> Mostcommentedcards() {
		Pageable sortedPage = PageRequest.of(0, 6, Sort.by(Sort.Direction.DESC, "commentsCount"));
        Iterable<Idea> iterable = ideasRepo.findAll(sortedPage);
        List<Idea> allMostCommentedIdeas = new ArrayList<>();
        iterable.forEach(allMostCommentedIdeas::add);

        List<Idea> mostCommentedIdeas = new ArrayList<>();
        for (int i=0; i<allMostCommentedIdeas.size(); i++) {
            if(allMostCommentedIdeas.get(i).getCommentsCount()>0) {
            	mostCommentedIdeas.add(allMostCommentedIdeas.get(i));
            }
        }
        return mostCommentedIdeas;
    }

	@GetMapping("/ideas/ideaId")
	public Idea getIdeaByIdeaId(@RequestParam String ideaId) {
		Idea idea = ideasRepo.findById(ideaId).get();
		return idea;
	}
	
	@GetMapping("/ideas/userId")
	public Idea getIdeaByUserId(@RequestParam String userId) {
		Idea idea = ideasRepo.findByUserId(userId);
		return idea;
	}
	
	@PostMapping("/ideas")
	public ResponseEntity<Idea> addIdea(@RequestBody IdeaRequest ideaRequest) {
    try {
    	int seqNumber = (int) SequenceGeneratorService.generateSequence(Idea.SEQUENCE_NAME);
    	String idString = "ID" + String.format("%05d", seqNumber);
    	
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    	String email = userDetails.getUsername();
    	User user = usersRepo.findByEmail(email);
    	
    	String userId = user.getId();
    	String fname = user.getFname();
    	String lname = user.getLname();
        
        Date createdDate = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd MMM yyyy");
        String formattedDate = formatter.format(createdDate);
        createdDate = formatter.parse(formattedDate);
        
        IStatus ideaStatus = IStatus.RAISED;
        
		BenefitCategory benefitCategory = benefitCategoriesRepo.findByName(ideaRequest.getBenefitCategory());
		
		Category category = categoriesRepo.findByName(ideaRequest.getCategory());
        
        Idea idea = new Idea(idString, userId, fname, lname, ideaRequest.getIdeaTitle(), ideaRequest.getIdeaDescription(), createdDate, ideaStatus, benefitCategory, category);
        ideasRepo.save(idea);
        
        return new ResponseEntity<>(idea, HttpStatus.CREATED);
        
    }
    
    catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

	@PutMapping("ideas/{id}")
	public ResponseEntity<Idea> updateIdea(@PathVariable String id, @RequestBody Idea idea) {
		Idea myIdea = ideasRepo.findById(id).get();
		
		myIdea.setIdeaTitle(idea.getIdeaTitle());
		myIdea.setIdeaDescription(idea.getIdeaDescription());
		myIdea.setIdeaStatus(idea.getIdeaStatus());
		myIdea.setRewards(idea.getRewards());
		
		return new ResponseEntity<>(ideasRepo.save(myIdea), HttpStatus.OK);
	}

	private List<String> matchDescription(String searchItem) {
		List<Idea> ideasList =  ideasRepo.findAll();
		List<String> matchingList = new ArrayList<>();
		for (Idea idea : ideasList) {
			if ((idea.getIdeaDescription()).toLowerCase().contains(searchItem.toLowerCase())) {
				matchingList.add(idea.getId());
			}
		}
		return matchingList;
	}
	
	private List<String> matchTitle(String searchItem) {
		List<Idea> ideasList =  ideasRepo.findAll();
		List<String> matchingList = new ArrayList<>();
		for (Idea idea : ideasList) {
			if ((idea.getIdeaTitle()).toLowerCase().contains(searchItem.toLowerCase())) {
				matchingList.add(idea.getId());
			}
		}
		return matchingList;
	}
	
	@GetMapping("/ideas/search")
	public ResponseEntity<List<Idea>> searchIdea(@RequestParam(required = false) String searchItem) {
		try {
			List<Idea> freshideas = new ArrayList<>();
			Set<String> ideasIdList = new HashSet<>();
			
	    	if (searchItem != "" ) {
	    		if ( matchTitle(searchItem).size() > 0) {
	    			ideasIdList.addAll(matchTitle(searchItem));
	    		}
	    		
	    		if (matchDescription(searchItem).size() > 0) {
	    			ideasIdList.addAll(matchDescription(searchItem));
	    		}
	      	}
	    	
	    	for (String id : ideasIdList) {
	    		freshideas.add(ideasRepo.findById(id).get());
	    	}
	    	
	    	if (freshideas.isEmpty()) {
	    		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	        }
	    	
	        return new ResponseEntity<>(freshideas, HttpStatus.OK);
	    }
		
		catch (Exception e) {
	    	System.out.println(e);
	    	return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@GetMapping("ideas/isFavorite/{id}")
	public boolean isFavoriteIdeaOfCurrentUser(@PathVariable String id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    	String email = userDetails.getUsername();
    	User user = usersRepo.findByEmail(email);
    	List<Idea> favorites = user.getFavorites();
    	
    	for (Idea idea : favorites) {
    		if (idea.getId().equals(id)) return true;
    	}
    	
		return false;
		
	}
	
	@DeleteMapping("/ideas")
	public ResponseEntity<HttpStatus> deleteAllIdeas() {
		try {
			ideasRepo.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/ideas/{id}")
	public ResponseEntity<HttpStatus> deleteIdea(@PathVariable String id) {
		try {
			ideasRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/ideas/benefitcategories")
	public List<BenefitCategory> getBenefitCategoriesList() {
		List<BenefitCategory> benefitCatgoriesList = new ArrayList<>();
		benefitCatgoriesList = benefitCategoriesRepo.findAll();
		return benefitCatgoriesList;
	}
	
	@GetMapping("/ideas/categories")
	public List<Category> getCategoriesList() {
		List<Category> catgoriesList = new ArrayList<>();
		catgoriesList = categoriesRepo.findAll();
		return catgoriesList;
	}

}
