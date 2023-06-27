import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { handleUser } from "../actions";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import "../styles/UserProfileInformation.css";
import { updateUser } from "../utils/api";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { connect } from "react-redux";

const UserProfileInformation = (props) => {
  //We now need to set the data which originally is a empty object
  const { info } = props;
  // console.log("INFO :", info);
  const [fullName, setfullName] = useState(info.fullName);
  const [userName, setuserName] = useState(info.userName);
  const [email, setEmail] = useState(info.email);
  const [mobileNumber, setmobileNumber] = useState(info.mobileNumber);
  const [userAvatar, setUserAvatar] = useState(null);
  let error = [];

  //get methods for all fields.
  const getfullName = (event) => {
    setfullName(event.target.value);
  };
  const getuserName = (event) => {
    setuserName(event.target.value);
  };
  const getEmail = (event) => {
    setEmail(event.target.value);
  };

  //here we see if only numbers are being entred.
  const getmobileNumber = (event) => {
    setmobileNumber(event.target.value);
    !isNaN(event.target.value) && !isNaN(parseFloat(event.target.value))
      ? console.log("Correct number")
      : toast.error("Please enter only numbers") && setmobileNumber("");
  };
  //Functon to check validation of the data.
  const checkValidation = () => {
    if (fullName.length <= 6) {
      toast.warning("FullName should be more than 6 characters.");
      error.push("Fullname error");
    }
    if (userName.length <= 4) {
      toast.warning("FullName should be more than 4 characters.");
      error.push("Username error");
    }
    if (mobileNumber.length !== 10) {
      toast.warning("Mobile number should be of length 10");
      error.push("MobileNumber error");
    }

    //Regex expression to validate any kind of email.
    if (
      !new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ).test(email)
    ) {
      toast.warning("Enter valid email");
      error.push("Email error");
    }
  };

  //Submit button which basically checks the validaton first.
  const handleSubmit = (event) => {
    checkValidation();
    console.log("errors are", error);
    //If no errors, we then go on and patch the user.
    if (error.length === 0) {
      const formData = new FormData();
      formData.append("image", userAvatar);
      formData.append("fullName", fullName);
      formData.append("userName", userName);
      formData.append("mobileNumber", mobileNumber);
      formData.append("email", email);
      //Get the id of the user.
      updateUser(info._id, formData)
        .then((res) => {
          props.dispatch(handleUser(res.data.user._id));
          toast.success("Succesfully Updated.", toastStyler);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Form submission failed", toastStyler);
        });
    } else {
      toast.error("Form submission failed", toastStyler);
    }
    //on submit, set states to empty again.
    event.preventDefault();
    error = [];
  };

  //Rendering the component
  return (
    <div className="container">
      <Sidebar />
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Profile Information</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img src={info.avatar} alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{info.fullName}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{info.userName}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{info.dob}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{info.mobileNumber}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{info.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{info.panNumber}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" name="_method" value="patch">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username* (More than 4 characters)</label>
                  <input
                    type="text"
                    placeholder={info.userName}
                    className="userUpdateInput"
                    onChange={getuserName}
                    value={userName}
                    required
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name* (More than 6 characters)</label>
                  <input
                    type="text"
                    placeholder={info.fullName}
                    className="userUpdateInput"
                    onChange={getfullName}
                    value={fullName}
                    required
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder={info.email}
                    className="userUpdateInput"
                    onChange={getEmail}
                    value={email}
                    disabled
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone* (10 digits without country code)</label>
                  <input
                    type="text"
                    placeholder={info.mobileNumber}
                    className="userUpdateInput"
                    onChange={getmobileNumber}
                    value={mobileNumber}
                    required
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img className="userUpdateImg" src={info.avatar} alt="" />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => setUserAvatar(e.target.files[0])}
                  />
                </div>
                <button className="userUpdateButton" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

//Getting user from store as props.
function mapStateToProps(state) {
  //console.log("STATE BRUH: ", state);
  return {
    info: state.user.userData,
  };
}
export default connect(mapStateToProps)(UserProfileInformation);
