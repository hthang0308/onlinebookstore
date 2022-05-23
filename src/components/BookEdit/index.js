import { useEffect, useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
// material
import { Box, CircularProgress, Container } from "@mui/material";
// routes
import HeaderBreadcrumbs from "./HeaderBreadcrumbs";
import ProductNewForm from "./ProductNewForm";
import { get } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { pathname } = useLocation();
  const isEdit = pathname.includes("edit");

  const [bookDetail, setBookDetail] = useState({});
  const [isLoading, setIsLoading] = useState(isEdit ? true : false);

  const { bookID } = useParams();

  useEffect(() => {
    if (isEdit)
      // Get Book Detail
      get("/api/book/detail?book=" + bookID).then((res) => {
        setBookDetail(res.data.content);
        setIsLoading(false);
      });
  }, [bookID, isEdit]);

  if (!LocalStorageUtils.getUser().isAdmin) {
    return <div className="ml-2 mt-2">You are not an admin</div>;
  }
  return (
    <Container maxWidth="lg">
      <HeaderBreadcrumbs
        heading={!isEdit ? "Create a new book" : "Edit book"}
        links={[
          {
            name: !isEdit ? "All Books" : bookID,
            href: !isEdit ? "book" : "/book/" + bookID,
          },
          { name: !isEdit ? "New book" : "Edit" },
        ]}
      />
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress className="m-2" />
        </Box>
      ) : (
        <ProductNewForm isEdit={isEdit} currentProduct={bookDetail} />
      )}
    </Container>
  );
}
