import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAppDispatch } from "../store/hooks";
import { userPostData } from "../store/userSlice";
import "../style/login.css";
import { Link } from "react-router-dom";

interface formBannerProps {
  image: string;
}

const SignUp: React.FC<formBannerProps> = (props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (password !== confirmPass) {
      newErrors.confirmPass = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    switch (fieldName) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPass":
        setConfirmPass(value);
        break;
      default:
        break;
    }
  };

  const handleSubmitBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const formData: any = { firstName, lastName, email, password, confirmPass };

      try {
        await dispatch(userPostData(formData));
        console.log(formData, 'Data saved successfully');
      } catch (error) {
        console.error('----Error while saving data----:', error);
      }
    }
  };

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col form-wrapper">
            <div className="form-banner">
              <img className="img-fluid" src={props.image} alt="loading" />
            </div>
            <div className="col-md-5 main-form">
              <Form className=" ">
                <h3 className="text-start">SignUp</h3>
                <Form.Group className="mb-3 form-field">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={firstName}
                    onChange={(e) => handleFieldChange("firstName", e.target.value)}
                    type="text"
                    name="firstName"
                    placeholder=""
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </Form.Group>
                <Form.Group className="mb-3 form-field">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={lastName}
                    onChange={(e) => handleFieldChange("lastName", e.target.value)}
                    type="text"
                    name="lastName"
                    placeholder=""
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </Form.Group>
                <Form.Group className="mb-3 form-field">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </Form.Group>
                <Form.Group className="mb-3 form-field">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={password}
                    onChange={(e) => handleFieldChange("password", e.target.value)}
                    type="password"
                    name="password"
                    placeholder=""
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </Form.Group>
                <Form.Group className="mb-3 form-field">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    value={confirmPass}
                    onChange={(e) => handleFieldChange("confirmPass", e.target.value)}
                    type="password"
                    name="confirmPass"
                    placeholder=""
                  />
                  {errors.confirmPass && <span className="error-text">{errors.confirmPass}</span>}
                </Form.Group>
                <Button
                  onClick={handleSubmitBtn}
                  className="form-btn"
                  variant="primary"
                  type="submit"
                >
                  Sign Up
                </Button>
                <div className="sign-up-link">
                  Already a member?
                  <span>
                    <Link to="/"> Login now </Link>
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
