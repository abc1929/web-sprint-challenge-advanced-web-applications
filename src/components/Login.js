import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import axiosWithAuth from "../helpers/axiosWithAuth";

import { useHistory } from "react-router-dom";
const Login = () => {
   // make a post request to retrieve a token from the api
   // when you have handled the token, navigate to the BubblePage route

   const history = useHistory();
   const username = useRef();
   const pass = useRef();
   const [error, setError] = useState("");

   return (
      <div>
         <h1>Welcome to the Bubble App!</h1>
         <div>
            <label>Username</label>
            <input
               placeholder="Username"
               //  defaultValue="Lambda School"
               onChange={() => setError("")}
               ref={username}
            />
            <label>Password</label>

            <input
               placeholder="Password"
               //  defaultValue="i<3Lambd4"
               onChange={() => setError("")}
               ref={pass}
            />
            {error && <p> Username or Password not valid. </p>}
            <div>
               <button
                  onClick={() => {
                     axios
                        .post("http://localhost:5000/api/login", {
                           username: username.current.value,
                           password: pass.current.value,
                        })
                        .then((res) => {
                           //  console.log(res.data.payload);
                           localStorage.setItem("token", res.data.payload);
                           history.push("/bubbles");
                        })
                        .catch((err) => setError("yes"));
                  }}
               >
                  Login
               </button>
               <button>Cancel</button>
            </div>
         </div>
      </div>
   );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
