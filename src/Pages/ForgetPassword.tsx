import React, { FC, ReactElement, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../style/login.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loginUser } from "../store/userSlice";
import { useAppDispatch } from "../store/hooks";


interface FormBannerProps {
  image: string;
}

const ForgetPassword: React.FC<FormBannerProps> = (props) => {

  const [email, setEmail] = useState<string>("")
  const user = useSelector((state:RootState)=>state.user.data);
  const loggedInUser = user.find((user)=> user.email === email)
  
  const dispatch = useAppDispatch();

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


   await dispatch(loginUser())
  
    if (loggedInUser) {
      const userId:any = loggedInUser.id; 
      sessionStorage.setItem("userId", userId);
      window.location.href = "/otp";
    }else{
      console.log("user is not exist in dbs");
      
    }
  }

  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col form-wrapper">
            <div className="form-banner">
              <img src={props.image} alt="loading"></img>
            </div>
            <div className="col-md-5 main-form">
              <Form>
                <h3 className="text-start">Forget Your Password</h3>
                <p className="text-start border-bottom">
                  Enter the email address associated with your account and We'll
                  help you to reset password.
                </p>
                <Form.Group className="mb-3 form-field">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Button onClick={handleSubmit} className="form-btn" variant="primary" type="submit">
                  Submit
                </Button>
                <div className="sign-up-link">
                  <p>Not a member?
                    <span><Link to="/signUp"> Sign up</Link></span>
                  </p>
                </div>
              </Form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;









// import React from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import '../style/login.css'

// interface formBannerProps{
//   image:JSX.Element
// }

// const ForgetPassword: React.FC<formBannerProps> = (props) => {
//   return (
//     <div>
//       <div className="container ">
//         <div className="row">
//           <div className="form-wrapper">
//             <div className="col-md-5 form-banner">
//               <img src={props.image} alt="loading"></img>
//             </div>
//             <Form className=" col-md-4">
//               <h3 className="text-start">Forget Your Password</h3>
//               <p className="text-start border-bottom">
//                 Enter the email address assciated with your account and We'll
//                 help you to reset password.
//               </p>

//               <Form.Group className="mb-3 form-field">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="xyz@gmail.com"
//                 />
//               </Form.Group>

//               <Button className="form-btn" variant="primary" type="submit">
//                 Submit
//               </Button>
//               <div className="sign-up-link">
//                 <p>
//                   Already a member?
//                   <a href="forget.html" className="link-underline-light ">
//                     Login now
//                   </a>
//                 </p>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;
