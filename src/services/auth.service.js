import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(fname, lname, email, password, department, account) {
    return axios.post(API_URL + "signup", {
      fname,
      lname,
      email,
      password,
      department,
      account
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getDepartmentsList() {
    return axios.get(API_URL + "departments");
  }

  getRolesList() {
    return axios.get(API_URL + "roles");
  }

}

export default new AuthService();