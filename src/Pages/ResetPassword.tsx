// ResetPassword.tsx

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { resetPassword } from "../store/userSlice";
import { useAppDispatch } from "../store/hooks";

interface ResetPasswordProps {
  image: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ image }) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const userId = sessionStorage.getItem("userId") || "";

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(resetPassword({ userId, newPassword }));
      alert("password changed successfully");
    } catch (error) {
      console.error("Password reset failed", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col form-wrapper">
            <div className=" form-banner">
              <img src={image} alt="loading" />
            </div>
            <div className="col-md-5 main-form">
              <Form onSubmit={handleSubmit}>
                <h3 className="text-start">Reset Password</h3>

                <Form.Group className="mb-3 form-field">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="new-password"
                    placeholder=""
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 form-field">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm-password"
                    placeholder=""
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button className="form-btn" variant="primary" type="submit">
                  Submit
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

export default ResetPassword;
