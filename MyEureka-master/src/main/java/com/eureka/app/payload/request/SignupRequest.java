package com.eureka.app.payload.request;

import javax.validation.constraints.*;

import com.eureka.app.model.Department;
 
public class SignupRequest {
	@NotBlank
	@Size(max=20)
	private String fname;
	
	@NotBlank
	@Size(max=20)
	private String lname;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
	private Department department;

	private String role;

    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
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

	public Department getDepartment() {
		return department;
	}

	public void setDepartments(Department department) {
		this.department = department;
	}

	public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getRole() {
      return this.role;
    }
    
    public void setRole(String role) {
      this.role = role;
    }

	@Override
	public String toString() {
		return "SignupRequest [fname=" + fname + ", lname=" + lname + ", email=" + email + ", password=" + password
				+ ", department=" + department + ", role=" + role + "]";
	}
    
}
