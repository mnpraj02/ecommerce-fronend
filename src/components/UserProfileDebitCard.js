/* This page renders all the debit cards the user has added.  */

import "../styles/UserProfileDebitCard.css";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { handleUser } from "../actions";
import { connect } from "react-redux";
import { deleteCard } from "../utils/api";
import { getCards } from "../utils/api";

const UserProfileDebitCard = (props) => {
  //Since  debit cards is an array, we initiate the array.

  const [data, setData] = useState([]);
  // console.log("Hi");
  let newUser = props.user;
  useEffect(() => {
    Promise.resolve(
      getCards(props.user._id).then((res) => {
        console.log("res");
        console.log(res.data.userDebitCards);
        // setData(res.data.userDebitCards);
        let newArray = res.data.userDebitCards;
        newArray.forEach((card) => {
          card.id = card._id.toString();
        });
        setData(newArray);
      })
    );
  }, []);

  //This function handles delete on clicking taking the id as param.
  const handleDelete = (id) => {
    //We delete this particular id.
    let afterDelete = data.filter((item) => item.id !== id);

    //Set the array after deelte.
    setData(afterDelete);
    //Set this as the new delivery adress

    deleteCard(id).then((response) => {
      console.log(response);

      props.dispatch(handleUser(props.user._id));
    });
    // .then((data) => {
    //   console.log("Successfully Deleted", data);
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });

    toast.warning("Debit Card Deleted", toastStyler);
  };

  //This is the schema for rendering the adresses in the table.

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "types",
      headerName: "Card Type",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.type}
          </div>
        );
      },
    },
    {
      field: "cardNo",
      headerName: "Card Number",
      width: 220,
    },
    {
      field: "nameOnCard",
      headerName: "Name on card",
      width: 220,
    },
    {
      field: "expiry",
      headerName: "Expiry Date",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="userListEdit"
              onClick={() => handleDelete(params.row.id)}
              style={{ backgroundColor: "rgb(235, 83, 83)" }}
            >
              Delete
            </button>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  //this is the component we are gonna return

  return (
    <div className="container">
      <Sidebar />
      <div className="adressList">
        <div className="userTitleContainer">
          <h1 className="userTitle">Debit Cards</h1>
          <Link to="/newCard">
            <button className="userAddButton">Add Card</button>
          </Link>
        </div>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[5]}
          checkboxSelection
          rowHeight={80}
          sx={{
            boxShadow: 20,
            borderBottom: "none",
            borderRadius: 7,
          }}
        />
      </div>
    </div>
  );
};

//getting user as props from store.

function mapStateToProps(state) {
  return {
    user: state.user.userData,
  };
}
export default connect(mapStateToProps)(UserProfileDebitCard);
