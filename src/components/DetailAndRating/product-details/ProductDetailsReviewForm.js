import * as Yup from "yup";
import PropTypes from "prop-types";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { styled } from "@mui/material/styles";
import {
  Button,
  Rating,
  TextField,
  Typography,
  FormHelperText,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { get, put } from "../../../utils/ApiCaller";
import LocalStorageUtils from "../../../utils/LocalStorageUtils";
import { useParams } from "react-router-dom";
// utils
// import fakeRequest from '../../../../utils/fakeRequest';

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

ProductDetailsReviewForm.propTypes = {
  onClose: PropTypes.func,
};

export default function ProductDetailsReviewForm({ onClose, ...other }) {
  const { bookID } = useParams();
  const ReviewSchema = Yup.object().shape({
    star: Yup.mixed().required("Star is required"),
    comment: Yup.string().required("Review is required"),
    username: Yup.string().required("Username is required"),
  });
  const formik = useFormik({
    initialValues: {
      star: null,
      comment: "",
      username: "",
    },
    validationSchema: ReviewSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      get(
        "/api/purchasing/my-purchase?username=" +
          LocalStorageUtils.getUser().username
      ).then((res) => {
        const items = res.data.content.map((carts) => carts.items);
        var mergeditems = [].concat.apply([], items);
        const books = mergeditems.map((item) => item.book);
        const bookslugs = books.map((book) => book.slug);
        if (bookslugs.includes(bookID)) values.isPurchased = true;
      });
      const obj = {
        book: bookID,
        rating: values,
      };
      put("/api/book/rate", obj)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
      resetForm();
      setSubmitting(false);
    },
  });

  const {
    errors,
    touched,
    resetForm,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  const onCancel = () => {
    onClose();
    resetForm();
  };

  return (
    <RootStyle {...other}>
      <Typography variant="subtitle1" gutterBottom>
        Add Review
      </Typography>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              spacing={1.5}
            >
              <Typography variant="body2">
                Your review about this product:
              </Typography>
              <Rating
                {...getFieldProps("star")}
                onChange={(event) =>
                  setFieldValue("star", Number(event.target.value))
                }
              />
            </Stack>
            {errors.star && (
              <FormHelperText error>
                {touched.star && errors.star}
              </FormHelperText>
            )}

            <TextField
              fullWidth
              label="Username *"
              {...getFieldProps("username")}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Review *"
              {...getFieldProps("comment")}
              error={Boolean(touched.comment && errors.comment)}
              helperText={touched.comment && errors.comment}
            />

            <Stack direction="row" justifyContent="flex-end">
              <Button
                type="button"
                color="inherit"
                variant="outlined"
                onClick={onCancel}
                sx={{ mr: 1.5 }}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Post review
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
