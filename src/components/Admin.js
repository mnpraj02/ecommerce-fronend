/* This page renders all the debit cards the user has added.  */

import "../styles/UserProfileDebitCard.css";
import AdminSidebar from "./AdminSidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { toastStyler } from "../commonEquipment";
import { handleUser } from "../actions";
import { connect } from "react-redux";
import { deleteProduct, getAllProducts } from "../utils/api";

const Admin = (props) => {
  //Since  debit cards is an array, we initiate the array.

  const [data, setData] = useState([]);
  // console.log("Hi");
  // let newUser = props.user;
  useEffect(() => {
    Promise.resolve(
      getAllProducts().then((res) => {
        console.log(res.data.products);
        setData(res.data.products);
        let newArray = res.data.products;
        newArray.forEach((product) => {
          product.id = product._id.toString();
        });
        setData(newArray);
      })
    );
  }, []);

  const handleEdit=(id)=>{
  }
  //This function handles delete on clicking taking the id as param.
  const handleDelete = (id) => {
    //We delete this particular id.
    let afterDelete = data.filter((item) => item.id !== id);

    //Set the array after deelte.
    setData(afterDelete);
    //Set this as the new delivery adress

    deleteProduct(id).then((response) => {
      console.log(response);
    });
    // .then((data) => {
    //   console.log("Successfully Deleted", data);
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });

    toast.warning("Product Deleted", toastStyler);
  };

  //This is the schema for rendering the adresses in the table.

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "productName",
      headerName: "Product",
      width: 240,
    },
    {
      field: "quantity",
      headerName: "Qty",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 100,
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "edit",
      headerName: "EDIT",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="userListEdit"
              onClick={() => handleEdit(params.row.id)}
              style={{ backgroundColor: "rgb(235, 83, 83)" }}
            >
              Edit
            </button>
          </>
        );
      },
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
      <AdminSidebar />
      <div className="adressList">
        <div className="userTitleContainer">
          <h1 className="userTitle">Admin Portal</h1>
          <Link to="/newProduct">
            <button className="userButton">Add Product</button>
          </Link>
        </div>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
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
export default connect(mapStateToProps)(Admin);
