import React, { useState } from "react";
import Review from "./Review";
import "../styles/Reviews.css";
import ReactPaginate from "react-paginate";

function Reviews(props) {
  const reviews = props.items; //All reviews from the product sent from the product page

  //Pagination in Reviews
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(reviews.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayReviews = reviews
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((review) => {
      return <Review content={review} key={review._id} />;
    });

  return (
    <div className="display-reviews">
      <h1 className="reviews-heading">Reviews:</h1>
      {/* The review are displayed based on the code written on line 19 */}
      {displayReviews}
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
  );
}

export default Reviews;
