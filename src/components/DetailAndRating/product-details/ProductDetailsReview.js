import PropTypes from "prop-types";
import { useState } from "react";
// material
import { Divider, Collapse } from "@mui/material";
//
import ProductDetailsReviewForm from "./ProductDetailsReviewForm";
import ProductDetailsReviewList from "./ProductDetailsReviewList";
import ProductDetailsReviewOverview from "./ProductDetailsReviewOverview";
import LocalStorageUtils from "../../../utils/LocalStorageUtils";

// ----------------------------------------------------------------------

ProductDetailsReview.propTypes = {
  product: PropTypes.object,
};

export default function ProductDetailsReview({ product }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    if (LocalStorageUtils.getUser()) setReviewBox((prev) => !prev);
    else {
      alert("You must be logged in to review");
    }
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <ProductDetailsReviewOverview
        product={product}
        onOpen={handleOpenReviewBox}
      />

      <Divider />

      <Collapse in={reviewBox}>
        <ProductDetailsReviewForm
          onClose={handleCloseReviewBox}
          id="move_add_review"
        />
        <Divider />
      </Collapse>

      <ProductDetailsReviewList product={product} />
    </>
  );
}
