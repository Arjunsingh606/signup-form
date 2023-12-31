// Login.tsx
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {useAppSelector, useAppDispatch} from '../store/hooks'
import { loginUser } from "../store/userSlice";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";
import { log } from "console";

interface formBannerProps {
  image: string;
}

const Login: React.FC<formBannerProps> = (props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const user = useAppSelector((state:RootState)=> state.user.data);
    const loggedInUser = user.find((user)=> user.email === email && user.password === password)
    console.log(loggedInUser, "logged in use");
    
    
    const dispatch = useAppDispatch();
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
    
      await dispatch(loginUser())
      if (loggedInUser) {
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userPassword", password);
        window.location.href = "/home";
      }
    };
   
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col form-wrapper">
            <div className=" form-banner">
              <img src={props.image} alt="loading" />
            </div>
            <div className="col-md-5 main-form">
              <Form>
                <h3 className="text-start">Login</h3>
                <p className="text-start border-bottom">
                  Enter your credentials to access your account
                </p>
                <Form.Group
                  className="mb-3 form-field"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 form-field"
                  controlId="formBasicPassword"
                >
                  <div className="password-title">
                    <Form.Label>Password</Form.Label>
                    <p>
                      <Link to="/forgetPassword"> Forget Password?</Link>
                    </p>
                  </div>

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  onClick={handleLogin}
                  className="form-btn"
                  variant="primary"
                  type="submit"
                >
                  Login
                </Button>
                <div className="sign-up-link">
                  <p>
                    Not a member?
                    <span>
                      <Link to="/signUp"> Sign up</Link>
                    </span>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// const dispatch = useDispatch();
// const { users, status } = useSelector((state: RootState) => state.user);

// useEffect(() => {
//   dispatch(userFetchData());
// }, [dispatch]);


















