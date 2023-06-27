/* This page renders all the adresses the user has added.  */

import "../styles/adressList.css";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleUser } from "../actions";
import { toastStyler } from "../commonEquipment";
import { deleteDeliveryAddress } from "../utils/api";
import { getDeliveryAddress } from "../utils/api";

const AdressList = (props) => {
  //Since delivery adresses is an array, we initiate the array.
  const [data, setData] = useState([]);
  // const history = useHistory();

  let newUser = props.user;
  useEffect(() => {
    getDeliveryAddress(props.user._id).then((res) => {
      console.log(res.data);
      let newArray = res.data;
      newArray.forEach((address) => {
        address.id = address._id.toString();
      });
      setData(newArray);
    });
  }, []);

  /*   console.log("delivery adresses are", props.user);
   */ //This function handles delete on clicking taking the id as param.
  const handleDelete = (id) => {
    //We delete this particular id.
    console.log(id);
    let afterDelete = data.filter((item) => item.id !== id);

    //Set the array after deelte.
    setData(afterDelete);

    //Set this as the new delivery adress
    newUser.deliveryAdress = afterDelete;

    // fetch(url, {
    //   method: "PATCH", // or 'PUT'
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newUser),
    // })
    deleteDeliveryAddress(id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Deleted!", data);
        props.dispatch(handleUser(props.user._id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    toast.warning("Adress Deleted", toastStyler);
  };

  //This is the schema for rendering the adresses in the table.
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "user",
      headerName: "Name",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
            {params.row.pincode}
          </div>
        );
      },
    },
    {
      field: "mobileNumber",
      headerName: "Phone Number",
      width: 180,
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
    },
    {
      field: "locationName",
      headerName: "Location Name",
      width: 200,
    },
    //We basically render some icons and buttons here.
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
      {/* Rendering the side bar having all components */}
      <Sidebar />
      <div className="adressList">
        <div className="userTitleContainer">
          <h1 className="userTitle">Delivery Adresses</h1>
          <Link to="/newAdress">
            <button className="userAddButton">Add Adress</button>
          </Link>
        </div>
        {/* This is the data we are gonna render using Datagrid from materail ui */}
        <DataGrid
          GridLines="None"
          rowHeight={80}
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[5]}
          checkboxSelection
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
export default connect(mapStateToProps)(AdressList);
