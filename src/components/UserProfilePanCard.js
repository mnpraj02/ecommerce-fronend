import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/UserProfilePanCard.css";
import { handleUser } from "../actions";

import {
  CalendarToday,
  LocationSearching,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { getUserById, updateUser } from "../utils/api";

const UserProfilePanCard = (props) => {
  const { info } = props;
  let email = info.email;
  //console.log("INFO :", info);
  const history = useHistory();
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  // const [fatherName, setFatherName] = useState("");
  // const [address, setAddress] = useState("");
  const [panNumber, setPanNumber] = useState("");
  let error = [];

  //We now need to set the data which originally is a empty object
  //get methods for all fields.
  useEffect(() => {
    getUserById(props.info._id).then((res) => {
      const newUser = res.data.data;
      setFullName(newUser.fullName);
      setDob(newUser.dob);
      setmobileNumber(newUser.mobileNumber);
      setPanNumber("ABCD12334");
    });
  }, []);

  const getFullName = (event) => {
    setFullName(event.target.value);
  };
  const getDob = (event) => {
    setDob(event.target.value);
  };
  const getPanNumber = (event) => {
    setPanNumber(event.target.value);
  };
  const getmobileNumber = (event) => {
    //here we see if only numbers are being entred.

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
    if (mobileNumber.length !== 10) {
      toast.warning("Mobile number should be of length 10");
      error.push("MobileNumber error");
    }
  };

  //Submit button which basically checks the validaton first.

  const handleSubmit = (event) => {
    checkValidation();
    if (error.length === 0) {
      //If no errors, we then go on and patch the user.

      const data = {
        fullName: fullName,
        dob: dob,
        mobileNumber: mobileNumber,
      };
      // //console.log("data entred " + data.fullName);
      // let url = "http://localhost:3000/users/" + info.id;
      updateUser(info._id, data).then((res) => {
        console.log(res.data.user);
        const newUser = res.data.user;
        setFullName(newUser.fullName);
        setDob(newUser.dob);
        setmobileNumber(newUser.mobileNumber);
        setPanNumber("ABCD1234");
      });

      props.dispatch(handleUser(props.info._id));
      toast.success("Succesfully Updated", toastStyler);
    } else {
      toast.error("Form submission failed", toastStyler);
    }

    //on submit, set states to empty again.

    event.preventDefault();
    setFullName("");
    setDob("");
    setPanNumber("");
    setmobileNumber("");
  };
  //Rendering the component

  return (
    <div className="container">
      <Sidebar />
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Electorent Card Information</h1>
          {/* <Link to="/newUser">
            <button className="userAddButton">Add Card</button>
          </Link> */}
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img src={info.avatar} alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{info.fullName}</span>
                <span className="userShowUserTitle">{"Developer"}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">PAN Account Details</span>
              <div className="userShowInfo">
                <CreditCardIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{"IXFPK2334K"}</span>
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
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Full Name on the card* (More than 6 characters)</label>
                  <input
                    type="text"
                    className="userUpdateInput"
                    onChange={getFullName}
                    value={fullName}
                    required
                  />
                </div>
                <div className="userUpdateItem">
                  <label>PAN Number*</label>
                  <input
                    type="text"
                    className="userUpdateInput"
                    onChange={getPanNumber}
                    value={"ABCD1234"}
                    required
                  />
                </div>
                <div className="userUpdateItem">
                  <label>DOB as per card*</label>
                  <input
                    type="date"
                    className="userUpdateInput"
                    onChange={getDob}
                    value={dob}
                    required
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone* (10 digits without country code)</label>
                  <input
                    type="text"
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
                  {/* <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label> */}
                  <input type="file" id="file" style={{ display: "none" }} />
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

function mapStateToProps(state) {
  //Getting user from store as props.

  //console.log("STATE BRUH: ", state);
  return {
    info: state.user.userData,
  };
}
export default connect(mapStateToProps)(UserProfilePanCard);
