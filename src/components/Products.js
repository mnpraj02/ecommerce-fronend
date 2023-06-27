import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import EachProduct from "./EachProduct";
import Categories from "./Categories";
import "../styles/ProductsStyles.css";
import { connect } from "react-redux";
import { handleCategoryFilter, renderallProducts } from "../actions";
import ReactPaginate from "react-paginate";
import NoResult from "./NoResult";
function Products(props) {
  let searchResults = props.searchResults || [];
  // Hooks to check which filters are selected
  const [isFurnitureChecked, setIsFurnitureChecked] = useState(false);
  const [isAppliancesChecked, setIsAppliancesChecked] = useState(false);
  const [isFashionChecked, setIsFashionChecked] = useState(false);
  const [isElectronicsChecked, setIsElectronicsChecked] = useState(false);
  const [isBuyChecked, setIsBuyChecked] = useState(false);
  const [isRentChecked, setIsRentChecked] = useState(false);
  const [isFourStarChecked, setIsFourStarChecked] = useState(false);
  const [isThreeStarChecked, setIsThreeStarChecked] = useState(false);
  const [isTwoStarChecked, setIsTwoStarChecked] = useState(false);
  const [isOneStarChecked, setIsOneStarChecked] = useState(false);
  const [isSeventyFiveChecked, setIsSeventyFiveChecked] = useState(false);
  const [isFiftyChecked, setIsFiftyChecked] = useState(false);
  const [isTwentyFiveChecked, setIsTwentyFiveChecked] = useState(false);
  const [isTenChecked, setIsTenChecked] = useState(false);
  const [isLTHChecked, setIsLTHChecked] = useState(false);
  const [isHTLChecked, setIsHTLChecked] = useState(false);
  //  Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const ProductsPerPage = 8;
  const pagesVisited = pageNumber * ProductsPerPage;
  const pageCount = Math.ceil(searchResults.length / ProductsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // const handleCategoryClick = (category, isChecked) => {
  //   if (!isChecked) {
  //     props.dispatch(handleCategoryFilter(category));
  //   } else {
  //     props.dispatch(renderallProducts());
  //   }
  // };
  // Function for HTL Button to make it Radio
  const ChangeHTL = () => {
    if (isHTLChecked === true) {
      console.log("HTL 0");
      setIsHTLChecked(false);
    } else {
      setIsHTLChecked(true);
      console.log("HTL 1");

      if (isLTHChecked === true) {
        console.log("LTH 0");

        setIsLTHChecked(false);
      }
    }
  };
  // Function for LTH Button to make it Radio

  const ChangeLTH = () => {
    if (isLTHChecked === true) {
      setIsLTHChecked(false);
    } else {
      setIsLTHChecked(true);

      if (isHTLChecked === true) {
        setIsHTLChecked(false);
      }
    }
  };
  // Function for Buy Button to make it Radio
  const ChangeBuy = () => {
    if (isBuyChecked === true) {
      setIsBuyChecked(false);
    } else {
      setIsBuyChecked(true);

      if (isRentChecked === true) {
        setIsRentChecked(false);
      }
    }
  };
  // Function for Rent Button to make it Radio
  const ChangeRent = () => {
    if (isRentChecked === true) {
      setIsRentChecked(false);
    } else {
      setIsRentChecked(true);

      if (isBuyChecked === true) {
        setIsBuyChecked(false);
      }
    }
  };
  // Function for Category Buttons to make it Radio
  const ChangeElectronics = () => {
    if (isElectronicsChecked === true) {
      setIsElectronicsChecked(false);
    } else {
      setIsElectronicsChecked(true);

      if (isFashionChecked === true) {
        setIsFashionChecked(false);
      }
      if (isAppliancesChecked === true) {
        setIsAppliancesChecked(false);
      }
      if (isFurnitureChecked === true) {
        setIsFurnitureChecked(false);
      }
    }
  };
  const ChangeFurniture = () => {
    if (isFurnitureChecked === true) {
      setIsFurnitureChecked(false);
    } else {
      setIsFurnitureChecked(true);

      if (isFashionChecked === true) {
        setIsFashionChecked(false);
      }
      if (isAppliancesChecked === true) {
        setIsAppliancesChecked(false);
      }
      if (isElectronicsChecked === true) {
        setIsElectronicsChecked(false);
      }
    }
  };
  const ChangeAppliances = () => {
    if (isAppliancesChecked === true) {
      setIsAppliancesChecked(false);
    } else {
      setIsAppliancesChecked(true);

      if (isFashionChecked === true) {
        setIsFashionChecked(false);
      }
      if (isFurnitureChecked === true) {
        setIsFurnitureChecked(false);
      }
      if (isElectronicsChecked === true) {
        setIsElectronicsChecked(false);
      }
    }
  };
  const ChangeFashion = () => {
    if (isFashionChecked === true) {
      setIsFashionChecked(false);
    } else {
      setIsFashionChecked(true);

      if (isFurnitureChecked === true) {
        setIsFurnitureChecked(false);
      }
      if (isAppliancesChecked === true) {
        setIsAppliancesChecked(false);
      }
      if (isElectronicsChecked === true) {
        setIsElectronicsChecked(false);
      }
    }
  };
  // Function for Rating Buttons to make it Radio

  const ChangeFourStar = () => {
    if (isFourStarChecked === true) {
      setIsFourStarChecked(false);
    } else {
      setIsFourStarChecked(true);

      if (isThreeStarChecked === true) {
        setIsThreeStarChecked(false);
      }
      if (isTwoStarChecked === true) {
        setIsTwoStarChecked(false);
      }
      if (isOneStarChecked === true) {
        setIsOneStarChecked(false);
      }
    }
  };

  const ChangeThreeStar = () => {
    if (isThreeStarChecked === true) {
      setIsThreeStarChecked(false);
    } else {
      setIsThreeStarChecked(true);

      if (isFourStarChecked === true) {
        setIsFourStarChecked(false);
      }
      if (isTwoStarChecked === true) {
        setIsTwoStarChecked(false);
      }
      if (isOneStarChecked === true) {
        setIsOneStarChecked(false);
      }
    }
  };
  const ChangeTwoStar = () => {
    if (isTwoStarChecked === true) {
      setIsTwoStarChecked(false);
    } else {
      setIsTwoStarChecked(true);

      if (isFourStarChecked === true) {
        setIsFourStarChecked(false);
      }
      if (isThreeStarChecked === true) {
        setIsThreeStarChecked(false);
      }
      if (isOneStarChecked === true) {
        setIsOneStarChecked(false);
      }
    }
  };
  const ChangeOneStar = () => {
    if (isOneStarChecked === true) {
      setIsOneStarChecked(false);
    } else {
      setIsOneStarChecked(true);

      if (isFourStarChecked === true) {
        setIsFourStarChecked(false);
      }
      if (isTwoStarChecked === true) {
        setIsTwoStarChecked(false);
      }
      if (isThreeStarChecked === true) {
        setIsThreeStarChecked(false);
      }
    }
  };
  // Function for Discount Buttons to make it Radio

  const ChangeSeventyFive = () => {
    if (isSeventyFiveChecked === true) {
      setIsSeventyFiveChecked(false);
    } else {
      setIsSeventyFiveChecked(true);

      if (isFiftyChecked === true) {
        setIsFiftyChecked(false);
      }
      if (isTwentyFiveChecked === true) {
        setIsTwentyFiveChecked(false);
      }
      if (isTenChecked === true) {
        setIsTenChecked(false);
      }
    }
  };
  const ChangeFifty = () => {
    if (isFiftyChecked === true) {
      setIsFiftyChecked(false);
    } else {
      setIsFiftyChecked(true);

      if (isSeventyFiveChecked === true) {
        setIsSeventyFiveChecked(false);
      }
      if (isTwentyFiveChecked === true) {
        setIsTwentyFiveChecked(false);
      }
      if (isTenChecked === true) {
        setIsTenChecked(false);
      }
    }
  };
  const ChangeTwentyFive = () => {
    if (isTwentyFiveChecked === true) {
      setIsTwentyFiveChecked(false);
    } else {
      setIsTwentyFiveChecked(true);

      if (isFiftyChecked === true) {
        setIsFiftyChecked(false);
      }
      if (isSeventyFiveChecked === true) {
        setIsSeventyFiveChecked(false);
      }
      if (isTenChecked === true) {
        setIsTenChecked(false);
      }
    }
  };
  const ChangeTen = () => {
    if (isTenChecked === true) {
      setIsTenChecked(false);
    } else {
      setIsTenChecked(true);

      if (isFiftyChecked === true) {
        setIsFiftyChecked(false);
      }
      if (isTwentyFiveChecked === true) {
        setIsTwentyFiveChecked(false);
      }
      if (isSeventyFiveChecked === true) {
        setIsSeventyFiveChecked(false);
      }
    }
  };
  return (
    <div>
      <br />
      <Categories />
      <div className=" main-container">
        {/* Filter Container each sub-filter has one div and that div contains the filters */}
        <div className="filters-container">
          <div className="filter-department">
            <p className="filter-headings">Sort By:</p>
            <div className="sub-filters">
              <input
                type="checkbox"
                name="LTH"
                id="LTH"
                value="LTH"
                checked={isLTHChecked}
                onChange={() => {
                  // setIsLTHChecked(!isLTHChecked);
                  ChangeLTH();
                  // handleCategoryClick("?_sort=price", isLTHChecked);
                }}
              />
              <label htmlFor="LTH">Price: Low to High</label>
              <br />
              <input
                type="checkbox"
                name="HTL"
                id="HTL"
                value="HTL"
                checked={isHTLChecked}
                onChange={() => {
                  // setIsHTLChecked(!isHTLChecked);
                  // handleCategoryClick("?_sort=price&_order=desc", isHTLChecked);
                  ChangeHTL();
                }}
              />
              <label htmlFor="LTH">Price: High to Low</label>
            </div>
          </div>
          <div className="filter-department">
            <p className="filter-headings">Department</p>
            <div className="sub-filters">
              <input
                type="checkbox"
                name="department1"
                id="department1"
                value="Electronics"
                checked={isElectronicsChecked}
                onChange={() => {
                  // setIsElectronicsChecked(!isElectronicsChecked);
                  ChangeElectronics();
                  // handleCategoryClick(
                  //   "?Category=Mobiles&Category=Appliances&Category=Accessories",
                  //   isElectronicsChecked
                  // );
                }}
              />
              <label htmlFor="department1"> Electronics</label>
              <br />
              <input
                type="checkbox"
                name="department2"
                id="department2"
                value="Fashion"
                checked={isFashionChecked}
                onChange={() => {
                  // setIsFashionChecked(!isFashionChecked);
                  ChangeFashion();
                  // handleCategoryClick(z
                  //   "?Category=Mens&Category=Womens&Category=Kids",
                  //   isFashionChecked
                  // );
                }}
              />
              <label htmlFor="department2"> Fashion</label>
              <br />
              <input
                type="checkbox"
                name="department3"
                id="department3"
                value="Home Aplliances"
                checked={isAppliancesChecked}
                onChange={() => {
                  // setIsAppliancesChecked(!isAppliancesChecked);
                  ChangeAppliances();
                  // handleCategoryClick(
                  //   "?Category=Appliances",
                  //   isAppliancesChecked
                  // );
                }}
              />
              <label htmlFor="department3"> Home Appliances</label>
              <br />
              <input
                type="checkbox"
                name="department4"
                id="department4"
                value="Furniture"
                checked={isFurnitureChecked}
                onChange={() => {
                  // setIsFurnitureChecked(!isFurnitureChecked);
                  ChangeFurniture();
                  // handleCategoryClick("?Category=Home", isFurnitureChecked);
                }}
              />
              <label htmlFor="department4"> Furniture</label>
              <br />
            </div>
          </div>
          <div className="filter-department">
            <p className="filter-headings">Availability Type</p>
            <div className="sub-filters">
              <input
                type="checkbox"
                name="buy"
                id="buy"
                value="Buy"
                checked={isBuyChecked}
                onChange={() => {
                  // setIsBuyChecked(!isBuyChecked);
                  ChangeBuy();
                  // handleCategoryClick("?type=Buy", isBuyChecked);
                }}
              />
              <label htmlFor="buy"> Buy</label>
              <br />
              <input
                type="checkbox"
                name="rent"
                id="rent"
                value="Rent"
                checked={isRentChecked}
                onChange={() => {
                  // setIsRentChecked(!isRentChecked);
                  ChangeRent();
                  // handleCategoryClick("?type=Rent", isRentChecked);
                }}
              />
              <label htmlFor="rent"> Rent</label>
              <br />
            </div>
          </div>
          <div className="filter-department">
            <p className="filter-headings">Avg. Customer Review</p>
            <div className="sub-filters">
              <input
                type="checkbox"
                name="rating4"
                id="rating4"
                value="4"
                checked={isFourStarChecked}
                onChange={() => {
                  // setIsFourStarChecked(!isFourStarChecked);
                  ChangeFourStar();
                  // handleCategoryClick("?rating.rate_gte=4", isFourStarChecked);
                }}
              />
              <label htmlFor="rating4">
                <StarRatings
                  rating={4}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor="#FF9529"
                />
                &amp; Up
              </label>
              <br />
              <input
                type="checkbox"
                name="rating3"
                id="rating3"
                value="3"
                checked={isThreeStarChecked}
                onChange={() => {
                  ChangeThreeStar();
                  // setIsThreeStarChecked(!isThreeStarChecked);
                  // handleCategoryClick("?rating.rate_gte=3", isThreeStarChecked);
                }}
              />
              <label htmlFor="rating3">
                <StarRatings
                  rating={3}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor="#FF9529"
                />
                &amp; Up
              </label>
              <br />
              <input
                type="checkbox"
                name="rating2"
                id="rating2"
                value="2"
                checked={isTwoStarChecked}
                onChange={() => {
                  ChangeTwoStar();
                  // setIsTwoStarChecked(!isTwoStarChecked);
                  // handleCategoryClick("?rating.rate_gte=2", isTwoStarChecked);
                }}
              />
              <label htmlFor="rating2">
                <StarRatings
                  rating={2}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor="#FF9529"
                />
                &amp; Up
              </label>
              <br />
              <input
                type="checkbox"
                name="rating1"
                id="rating1"
                value="1"
                checked={isOneStarChecked}
                onChange={() => {
                  ChangeOneStar();
                  // setIsOneStarChecked(!isOneStarChecked);
                  // handleCategoryClick("?rating.rate_gte=1", isOneStarChecked);
                }}
              />
              <label htmlFor="rating1">
                <StarRatings
                  rating={1}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor="#FF9529"
                />
                &amp; Up
              </label>
              <br />
            </div>
          </div>
          <div className="filter-department">
            <p className="filter-headings">Discount</p>
            <div className="sub-filters">
              <input
                type="checkbox"
                id="discount1"
                name="discount1"
                value="75"
                checked={isSeventyFiveChecked}
                onChange={() => {
                  // setIsSeventyFiveChecked(!isSeventyFiveChecked);
                  ChangeSeventyFive();
                  // handleCategoryClick("?discount_gte=75", isSeventyFiveChecked);
                }}
              />
              <label htmlFor="discount1"> 75% and more</label>
              <br />
              <input
                type="checkbox"
                id="discount2"
                name="discount2"
                value="50"
                checked={isFiftyChecked}
                onChange={() => {
                  // setIsFiftyChecked(!isFiftyChecked);
                  ChangeFifty();
                  // handleCategoryClick("?discount_gte=50", isFiftyChecked);
                }}
              />
              <label htmlFor="discount2"> 50% and more</label>
              <br />
              <input
                type="checkbox"
                id="discount3"
                name="discount3"
                value="25"
                checked={isTwentyFiveChecked}
                onChange={() => {
                  // setIsTwentyFiveChecked(!isTwentyFiveChecked);
                  ChangeTwentyFive();
                  // handleCategoryClick("?discount_gte=25", isTwentyFiveChecked);
                }}
              />
              <label htmlFor="discount3"> 25% and more</label>
              <br />
              <input
                type="checkbox"
                id="discount4"
                name="discount4"
                value="10"
                checked={isTenChecked}
                onChange={() => {
                  // setIsTenChecked(!isTenChecked);
                  ChangeTen();
                  // handleCategoryClick("?discount_gte=10", isTenChecked);
                }}
              />
              <label htmlFor="discount4"> 10% and more</label>
              <br />
            </div>
          </div>
        </div>
        {/* Rendering EachProduct component using map function and sending data through props. */}
        {searchResults.length !== 0 ? (
          <div className="products-container">
            {searchResults
              .slice(pagesVisited, pagesVisited + ProductsPerPage)
              .map((item, index) => {
                return <EachProduct content={item} key={index} />;
              })}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBtns"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        ) : (
          <NoResult />
        )}
      </div>
    </div>
  );
}
// }

function mapStateToProps(state) {
  return {
    searchResults: state.search,
  };
}
export default connect(mapStateToProps)(Products);
// { store:{user, search}}
