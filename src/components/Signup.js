import React, { Component, useState } from "react";
import { SiTwitter } from "react-icons/si";
import { SiFacebook } from "react-icons/si";
// import Login from "./Login";
import SignupSuccess from "./SignupSuccess";
import "./signupStyle.css";
function Signup() {
        // React States
        const [errorMessages, setErrorMessages] = useState({});
        const [isSubmitted, setIsSubmitted] = useState(false);

        // User Login info
        const database = [
            {
                fname: "first1",
                lname: "last1",
                username: "user1@gmail.com",
                password: "password1",
                role: "FU"
            },
            {
                fname: "first2",
                lname: "last2",
                username: "user2@gmail.com",
                password: "password2",
                role: "BC"
            }
        ];

        const errors = {
            email: "invalid email",
            password: "invalid password"
        };

        const handleSubmit = (event) => {
            //Prevent page reload
            event.preventDefault();

            var { fname, lname, email, password, roles } = document.forms[0];
            setIsSubmitted(true);

            // Find user login info
            // const userData = database.find((user) => user.username === email.value);

            // Compare user info
            // if (userData) {
            // if (userData.password !== password.value) {
            //     // Invalid password
            //     setErrorMessages({ name: "password", message: errors.password });
            // } else {
            //     setIsSubmitted(true);
            // }
            // } else {
            // // Username not found
            // setErrorMessages({ name: "email", message: errors.email });
            // }
        };

        // Generate JSX code for error message
        const renderErrorMessage = (name) =>
            name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
            );
    
    const renderForm = (
        <div className="box-form">
            <div className="right">
                <form onSubmit={handleSubmit}>
                    <h1>Sign up</h1> 
                    <div className="inputs">
                        <input type="firstname" name="fname" placeholder="First name"/>
                        <input type="lastname" name="lname" placeholder="Last name"/>
                        <input type="email" name="email" placeholder="Enter Email"/>
                        <input type="password"  name="password" placeholder="Enter password"/>
                        <input type="ConfirmPassword" placeholder="Enter ConfirmPassword"/>

                        {/* <label className="dropdown">
                            <div class="dd-button"> Dropdown</div>
                            <input type="checkbox" class="dd-input" id="test"></input>
                            <ul class="dd-menu">
                                <li>Fresh User</li>
                                <li>Business Challenger</li>
                            </ul>
                        </label> */}

                        <br></br>
                        <br></br>
                        <select name="Role" className="selectButton">
                            <option value="none" selected disabled hidden>Select your role</option>
                            <option value="FU">Fresher User</option>
                            <option value="BC">Business Challenger</option>
                        </select>

                    </div>
                    <button type="submit">Register</button>
                    <br></br>
                    <p className="forgot-password text-right">
                        Already registered <a href="/signin">sign in?</a>
                    </p>
                </form>
            </div>

            <div class="left">
                <div class="overlay">
                    <h1>Echo.</h1>
                    <p>Let your ideas and thoughts reverberate through the organization</p>
                    <span>
                        <p>Login with social media</p>
                        <a href="#"> <SiFacebook /> </a>
                        <a href="#"><SiTwitter /></a>
                    </span>
                </div>
            </div>
        </div> 
    )


    return (
        <div className="app">
        <div>
            {isSubmitted ? <div> <SignupSuccess /></div> : renderForm}
        </div>
        </div>
    );
}
export default Signup;