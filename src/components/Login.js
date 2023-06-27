import axios from "axios";
import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom"; // eslint-disable-line
import { useHistory, Redirect } from "react-router-dom";
import { handleUser } from "../actions";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import "../styles/LoginStyle.css";

function Login(props) {
  const { authorized } = props;
  if (authorized) {
    <Redirect to="/userProfile" />;
  }
  const [useremail, setUserEmail] = useState(" ");
  const [password1, setPassword] = useState(" ");
  const history = useHistory();
  const incorrectCredentials = useRef(null);

  const LoginUser = () => {
    //Hitting the Login api using axios by sending the useremail and password to authenticate
    axios
      .post("/login", { useremail: useremail, password: password1 })
      .then((result) => {
        const token = result.data.token;
        console.log(result);
        localStorage.setItem("JWTToken", token);

        // console.log("JWTTOKEN IS :", JWTToken);
        incorrectCredentials.current.innerText = " ";
        history.goBack();
        // dispatch the user
        props.dispatch(handleUser(result.data.userId));
        // toast.success(localStorage.g)
        toast.success("Login Successfull", toastStyler);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Incorrect Login Credentials.. Please try again",
          toastStyler
        );
      });
  };
  // Show password feature
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className="login">
      <br />
      <br />
      <br />
      <br />
      <p
        // Using Refs to show the incorrect credentials msg
        ref={incorrectCredentials}
        style={{ textAlign: "center", color: "red" }}
      ></p>
      <div className="Container">
        <br />
        <h1>Sign In</h1>
        <label className="Label" htmlFor="useremail">
          <b>Enter Your Email</b>
        </label>
        <br />
        {/* Taking email as input */}
        <input
          className={["credentials", "login-input"].join(" ")}
          id="useremail"
          name="useremail"
          type="text"
          placeholder="abcd@gmail.com"
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <br />
        <label className="Label" htmlFor="password">
          <b>Password</b>
        </label>
        <br />
        {/* Taking Password as input */}
        <input
          // this is used to give multiple classnames to a component
          className={["credentials", "login-input"].join(" ")}
          placeholder="Password"
          id="password"
          name="password"
          type={passwordShown ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        {/* Show PASSWORD FUNCTIONALITY */}
        <div id="show-password">
          <input
            id="checkbox"
            type="checkbox"
            onClick={togglePasswordVisiblity}
          />
          <b> Show Password</b>
          <br />
        </div>
        <button className="submit" type="submit" onClick={LoginUser}>
          Submit
          <br />
        </button>
        <br />
        <br />
        <br />
        <div className="signup">
          <b>Don't have an account? </b>
          <b>
            <Link to="/signup">Create an account</Link>
          </b>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authorized: state.user.isLoggedIn,
  };
}

export default connect(mapStateToProps)(Login);
