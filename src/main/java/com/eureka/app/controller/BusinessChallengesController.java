package com.eureka.app.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
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

import com.eureka.app.model.BStatus;
import com.eureka.app.model.BusinessChallenges;
import com.eureka.app.model.User;
import com.eureka.app.payload.request.ChallengeRequest;
import com.eureka.app.repository.BusinessChallengesRepository;
import com.eureka.app.repository.UserRepository;
import com.eureka.app.security.services.UserDetailsImpl;
import com.eureka.app.service.SequenceGeneratorService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class BusinessChallengesController {
	@Autowired
	BusinessChallengesRepository businessChallengeRepo;
	
	@Autowired
	UserRepository usersRepo;

	@GetMapping("/businessChallenges")
	public List<BusinessChallenges> getBusinessChallenges() {
		List<BusinessChallenges> challenges = businessChallengeRepo.findAll();
		return challenges;
	}
	
	@Scheduled(cron = "@hourly")
	@GetMapping("/businessChallenges/recent")
	public List<BusinessChallenges> getRecentFiveBusinessChallenges() {
		List<BusinessChallenges> recentChallenges = businessChallengeRepo.findAll(Sort.by(Sort.Direction.DESC, "createdDate"));
		update(recentChallenges);
		List<BusinessChallenges> challenges = new ArrayList<>();
		int count=0;
		for (BusinessChallenges challenge : recentChallenges) {
			if(count<5) {
				if (challenge.getChallengeStatus() == BStatus.OPENED) {
					challenges.add(challenge);
					count++;
				}
			}
			
			else break;
		}

		return challenges;
	}
	
	public void update(List<BusinessChallenges> challenges) {
		Date currentDate = new Date();
//		System.out.println("Current date : " + currentDate);
		
		for (BusinessChallenges challenge : challenges) {
				if (challenge.getExpiryDate().getTime() < currentDate.getTime()) {
					challenge.setChallengeStatus(BStatus.CLOSED);
					businessChallengeRepo.save(challenge);
				}
				
				else {
					challenge.setChallengeStatus(BStatus.OPENED);
					businessChallengeRepo.save(challenge);
				}
		}
	}

	@GetMapping("/businessChallenges/{id}")
	public Optional<BusinessChallenges> getBusinessChallengeById(@PathVariable String id) {
		return businessChallengeRepo.findById(id);
	}

	@PostMapping("/businessChallenges")
	public ResponseEntity<BusinessChallenges> addBusinessChallenge(@RequestBody ChallengeRequest challengeRequest) {
		try {
			int seqNumber = (int) SequenceGeneratorService.generateSequence(BusinessChallenges.SEQUENCE_NAME);
	    	String idString = "BC" + String.format("%05d", seqNumber);
	    	
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
	        
	        BStatus challengeStatus = BStatus.OPENED;
	        
	        BusinessChallenges businessChallenge = new BusinessChallenges(idString, userId, fname, lname, challengeRequest.getChallengeTitle(),
	        		challengeRequest.getChallengeDescription(), createdDate, challengeRequest.getExpiryDate(), challengeStatus);
	        
			businessChallengeRepo.save(businessChallenge);
			
			return new ResponseEntity<>(businessChallenge, HttpStatus.CREATED);
		}
		
		catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
//	@PutMapping("/businessChallenges/update")
//	public ResponseEntity<BusinessChallenges> updateChallenge(@RequestBody BusinessChallenges challenge) {
//		BusinessChallenges myChallenge = businessChallengeRepo.findById(challenge.getChallengeId()).get();
//		myChallenge.setChallengeTitle(challenge.getChallengeTitle());
//		myChallenge.setChallengeDescription(challenge.getChallengeDescription());
//		myChallenge.setExpiryDate(challenge.getExpiryDate());
//		return new ResponseEntity<>(businessChallengeRepo.save(myChallenge), HttpStatus.OK);
//	}
	
	@PutMapping("challenges/{id}")
    public ResponseEntity<BusinessChallenges> updateChallenge(@PathVariable String id, @RequestBody BusinessChallenges challenge) {
        BusinessChallenges myChallenge = businessChallengeRepo.findById(id).get();
        myChallenge .setChallengeStatus(challenge .getChallengeStatus());
        return new ResponseEntity<>(businessChallengeRepo.save(myChallenge ), HttpStatus.OK);
    }

    private List<String> matchDescription(String searchItem) {
        List<BusinessChallenges> challengesList = businessChallengeRepo.findAll();
        List<String> matchingList = new ArrayList<>();
        for ( BusinessChallenges challenges : challengesList) {
            if ((challenges.getChallengeDescription()).toLowerCase().contains(searchItem.toLowerCase())) {
                matchingList.add(challenges.getId());
            }
        }
        return matchingList;
    }

    private List<String> matchTitle(String searchItem) {
        List<BusinessChallenges> challnegesList =  businessChallengeRepo.findAll();
        List<String> matchingList = new ArrayList<>();
        for (BusinessChallenges challenges : challnegesList) {
            if ((challenges.getChallengeTitle()).toLowerCase().contains(searchItem.toLowerCase())) {
                matchingList.add(challenges.getId());
            }
        }
        return matchingList;
    }

    @GetMapping("/businessChallenges/search")
    public ResponseEntity<List<BusinessChallenges>> searchChallenge(@RequestParam(required = false) String searchItem) {
        try {
            List<BusinessChallenges> freshchallenges = new ArrayList<>();
            Set<String> challengesIdList = new HashSet<>();
            if (searchItem != "" ) {
                if ( matchTitle(searchItem).size() > 0) {
                    challengesIdList.addAll(matchTitle(searchItem));
                }

                if (matchDescription(searchItem).size() > 0) {
                    challengesIdList.addAll(matchDescription(searchItem));
                }
              }

            for (String id : challengesIdList) {
                freshchallenges.add(businessChallengeRepo.findById(id).get());
            }

            if (freshchallenges.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(freshchallenges, HttpStatus.OK);
        }

        catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	@DeleteMapping("/businessChallenges")
	public ResponseEntity<HttpStatus> deleteAllBusinessChallenges() {
		try {
			businessChallengeRepo.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/businessChallenges/{id}")
	public ResponseEntity<HttpStatus> deleteBusinessChallenge(@PathVariable String id) {
		try {
			businessChallengeRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
