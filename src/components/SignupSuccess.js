import React from "react";
import "./sucessstyle.css"
function SignupSuccess(){
    return(
        <div id="card" class="animated fadeIn">
            <div id="upper-side">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                version="1.1"
                xmlSpace="preserve"
                >
                <path d="M131.583 92.152l-.026-.041a2.402 2.402 0 00-3.316-.734l-31.782 20.257-4.74-12.65c-.483-1.29-1.882-1.958-3.124-1.493l-.045.017c-1.242.465-1.857 1.888-1.374 3.178l5.763 15.382c.131.351.334.65.579.898.028.029.06.052.089.08.08.073.159.147.246.209.071.051.147.091.222.133.058.033.115.069.175.097.081.037.165.063.249.091.065.022.128.047.195.063.079.019.159.026.239.037.074.01.147.024.221.027.097.004.194-.006.292-.014.055-.005.109-.003.163-.012a2.38 2.38 0 00.933-.346l34.305-21.865a2.398 2.398 0 00.736-3.314z"></path>
                <circle
                    cx="109.486"
                    cy="104.353"
                    r="32.53"
                    fill="none"
                    stroke="#fff"
                    strokeMiterlimit="10"
                    strokeWidth="5"
                ></circle>
                </svg>
                <h3 id="status">Success</h3>
                    </div>
                    <div id="lower-side">
                        <p id="message">
                            Congratulations, your account has been successfully created.
                        </p>
                        <a href="/" id="contBtn">Continue</a>
                    </div>
        </div>
    );
}
export default SignupSuccess;