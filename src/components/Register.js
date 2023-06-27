import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom"; // eslint-disable-line
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import "../styles/RegisterStyle.css";
import { createUser, queryEmail } from "../utils/api";
function Register() {
  const history = useHistory();
  //Declaring React Hooks to store the user data and post it to the JSON-Server.
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userName, setUserName] = useState("Naveen_topper");
  const [mobile_number, setMobilenumber] = useState("");
  const [userPassword, setPassword] = useState("");
  // Hooks created for Show Password feature.
  const [passwordShown, setPasswordShown] = useState(false);
  const isUser = useRef(null);
  // Show password function to toggle the password type from text to password.
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // Function declared to post the users details to the JSON-Server.
  const registerUser = async (event) => {
    //Fetching the JSON-Server

    // Validating Mobile Number
    if (mobile_number.length !== 10) {
      toast.error("Enter valid Mobile Number", toastStyler);
    } else {
      if (useremail.indexOf("@") < 0) {
        console.log(useremail.indexOf("@"));
        toast.error("Enter Valid Email id", toastStyler);
      } else {
        const userData = {
          fullName: firstname + " " + lastname,
          userName,
          password: userPassword,
          email: useremail,
          mobileNumber: mobile_number,
        };

        const res = await queryEmail(useremail);
        console.log(res.data.user);

        const value = res.data.user;
        if (value) {
          toast.error("A user already exists with the given emailID");
        } else {
          createUser(userData)
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          event.preventDefault();
          history.push("/");
        }
      }
    }
  };
  return (
    <React.Fragment>
      <div className="signup-form">
        <div className="form-container">
          <p ref={isUser} style={{ textAlign: "center", color: "red" }}></p>
          <br />
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>
          <div>
            <label className="Label" htmlFor="fname">
              <h3>Your Name</h3>
            </label>
            <br />
            <input
              className="input-field width-43"
              type="text"
              name="fname"
              id="fname"
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <input
              className="input-field width-43"
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <label className="Label" htmlFor="username">
              <h3>User Name</h3>
            </label>
            <br />
            <input
              className="input-field width-90"
              type="text"
              name="lname"
              id="username"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="Label" htmlFor="email_id">
              <h3>Email id</h3>
            </label>
            <input
              className="input-field width-90"
              type="email"
              name="email_id"
              id="email_id"
              placeholder="example@gmail.com"
              onChange={(e) => setUseremail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="Label" htmlFor="mobile_number">
              <h3>Mobile Number</h3>
            </label>
            <input
              className="input-field width-90"
              type="number"
              name="mobile_number"
              id="mobile_number"
              placeholder="8688358501"
              onChange={(e) => {
                setMobilenumber(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label className="Label" htmlFor="password">
              <h3>Password</h3>
            </label>
            <input
              className="input-field width-90"
              placeholder="Password"
              id="password"
              name="password"
              type={passwordShown ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
          </div>
          <div id="showpassword">
            <input
              id="checkbox"
              type="checkbox"
              onClick={togglePasswordVisiblity}
            />
            <b> Show Password</b>
            <br />
          </div>
          <button
            type="submit"
            className="submit-register"
            onClick={registerUser}
          >
            Register
          </button>
          <br />
          <br />
          <br />
          <p style={{ textAlign: "center" }}>
            <b>Existing User ? </b>
            <Link to="/login">Sign in</Link>
          </p>
          <br />
          <br />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Register;
