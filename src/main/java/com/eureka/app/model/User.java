package com.eureka.app.model;

import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
	@Id
	private String id;
	@NotBlank
	@Size(max=15)
	private String fname;
	@NotBlank
	@Size(max=20)
	private String lname;
	@NotBlank
	@Indexed(unique=true)
	@Size(max=50)
	@Email
	private String email;
	@NotBlank
	@Size(min = 6, max = 40)
	private String password;
	private String account;
	
	@NotNull
	@DBRef
	private Department department;
	
	@NotNull
	@DBRef
	private Role role;
	private boolean isActive;
	private int rewards;
	@DBRef
	private List<Idea> favorites = new ArrayList<>();
	
	public User() {
		super();
	}

	public User(@NotBlank @Size(max = 15) String fname, @NotBlank @Size(max = 20) String lname,
			@NotBlank @Size(max = 50) @Email String email, @NotBlank @Size(min = 6, max = 40) String password, String account) {
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.password = password;
		this.account = account;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActiveStatus(boolean isActive) {
		this.isActive = isActive;
	}

	public int getRewards() {
		return rewards;
	}

	public void setRewards(int rewards) {
		this.rewards = rewards;
	}

	public List<Idea> getFavorites() {
		return favorites;
	}

	public void setFavorites(List<Idea> favorites) {
		this.favorites = favorites;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", fname=" + fname + ", lname=" + lname + ", email=" + email + ", password="
				+ password + ", account=" + account + ", department=" + department + ", role=" + role + ", isActive="
				+ isActive + ", rewards=" + rewards + ", favorites=" + favorites + "]";
	}
}
