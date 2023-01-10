package com.eureka.app.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eureka.app.model.Department;
import com.eureka.app.model.ERole;
import com.eureka.app.model.Role;
import com.eureka.app.model.User;
import com.eureka.app.payload.request.LoginRequest;
import com.eureka.app.payload.request.SignupRequest;
import com.eureka.app.payload.response.JwtResponse;
import com.eureka.app.payload.response.MessageResponse;
import com.eureka.app.repository.DepartmentRepository;
import com.eureka.app.repository.RoleRepository;
import com.eureka.app.repository.UserRepository;
import com.eureka.app.security.jwt.JwtUtils;
import com.eureka.app.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		GrantedAuthority role = userDetails.getAuthority();
		
		User user = userRepository.findByEmail(loginRequest.getEmail());
		user.setActiveStatus(true);
		userRepository.save(user);
		
		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 role));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getFname(), signUpRequest.getLname(),
				signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()), signUpRequest.getAccount());

		String strDepartment = signUpRequest.getDepartment();
		Department department = null;
		Department userDepartment = departmentRepository.findByName(strDepartment);
		department = userDepartment;
		user.setDepartment(department);
		
		String strRole = signUpRequest.getRole();
		Role role = null;
		if (strRole == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			role = userRole;
		} else {
			switch (strRole) {
				case "fiadmin":
					System.out.println("case fiadmin : " + strRole);
					Role fiAdminRole = roleRepository.findByName(ERole.ROLE_FIADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					role = fiAdminRole;
					break;
					
				case "bcadmin":
					Role bcAdminRole = roleRepository.findByName(ERole.ROLE_BCADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					role = bcAdminRole;
					break;
					
				default:
					System.out.println("case fiadmin : " + strRole);
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					role = userRole;
			}
		}
		user.setRole(role);
		
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	@GetMapping("/departments")
	public List<Department> getDepartmentsList() {
		List<Department> departmentsList = new ArrayList<>();
		departmentsList = departmentRepository.findAll();
		return departmentsList;
	}
	
	@GetMapping("/roles")
	public List<Role> getRolesList() {
		List<Role> rolesList = new ArrayList<>();
		rolesList = roleRepository.findAll();
		return rolesList;
	}
}
