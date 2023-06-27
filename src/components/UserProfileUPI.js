/* This page renders all the  upis the user has added.  */

import "../styles/UserProfileUPI.css";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { handleUser } from "../actions";
import { connect } from "react-redux";
import { deleteUpi, getUpi } from "../utils/api";

const UserProfileUPI = (props) => {
  //Since  upi  is an array, we initiate the array.

  const [data, setData] = useState([]);
  const history = useHistory();
  const [rerender, setRerender] = useState(true);

  let newUser = props.user;
  useEffect(() => {
    getUpi(props.user._id).then((res) => {
      console.log("res");
      console.log(res.data.userUpi);
      let newArray = res.data.userUpi;
      newArray.forEach((upi) => {
        upi.id = upi._id.toString();
      });
      setData(newArray);
    });
  }, []);

  //This function handles delete on clicking taking the id as param.

  const handleDelete = (id) => {
    //We delete this particular id.
    let afterDelete = data.filter((item) => item.id !== id);

    //Set the array after deelte.
    setData(afterDelete);

    deleteUpi(id).then((response) => {
      console.log(response);
      setRerender(!rerender);
    });

    toast.warning("UPI Deleted", toastStyler);
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
      headerName: "UPI Type",
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
      headerName: "UPI Id",
      width: 220,
    },
    {
      field: "userName",
      headerName: "Name on UPI",
      width: 220,
    },
    {
      field: "mobileNumber",
      headerName: "Phone number",
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
              style={{ backgroundColor: "rgb(235, 83, 83)" }}
              onClick={() => handleDelete(params.row.id)}
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
          <h1 className="userTitle">Saved UPI</h1>
          <Link to="/newUPI">
            <button className="userAddButton">Add UPI</button>
          </Link>
        </div>
        <DataGrid
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
          rowHeight={80}
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
export default connect(mapStateToProps)(UserProfileUPI);
