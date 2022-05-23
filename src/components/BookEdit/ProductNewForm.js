import * as Yup from "yup";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  Chip,
  Grid,
  Stack,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import { post, put } from "../../utils/ApiCaller";
// utils
// routes
//
// ----------------------------------------------------------------------

const GENDER_OPTION = ["Men", "Women", "Kids"];

const CATEGORY_OPTION = [
  { group: "Clothing", classify: ["Shirts", "T-shirts", "Jeans", "Leather"] },
  {
    group: "Tailored",
    classify: ["Suits", "Blazers", "Trousers", "Waistcoats"],
  },
  {
    group: "Accessories",
    classify: ["Shoes", "Backpacks and bags", "Bracelets", "Face masks"],
  },
];

const TAGS_OPTION = [
  "Adventure",
  "Classic",
  "Comic Book",
  "Detective/Mystery",
  "Fantasy",
  "History",
  "Horror",
  "Romance",
  "Science Fiction",
  "Biography",
  "Cookbook",
  "Self-Help",
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const NewProductSchema = Yup.object().shape({
    bookName: Yup.string().required("Book's name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bookName: currentProduct?.bookName || "",
      description: currentProduct?.description || "",
      authorName: currentProduct?.authorName || "",
      publisherName: currentProduct?.publisherName || "",
      price: currentProduct?.price || "",
      picture: currentProduct?.picture || "",
      categories: currentProduct?.categories || [TAGS_OPTION[0]],
      inStock: Boolean(currentProduct?.inventoryType !== "out_of_stock"),
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (!isEdit) {
        post("/api/book/create", values)
          .then((res) => {
            alert(res.data.message);
            resetForm();
            window.location.reload();
          })
          .catch((err) => alert(err.response.data.message));
      } else {
        put("/api/book/update", { ...values, slug: currentProduct.slug })
          .then((res) => {
            alert(res.data.message);
            resetForm();
            window.location.reload();
          })
          .catch((err) => alert(err.response.data.message));
      }
      // try {
      //   await fakeRequest(500);
      //   resetForm();
      //   setSubmitting(false);
      //   enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      //   navigate(PATH_DASHBOARD.eCommerce.list);
      // } catch (error) {
      //   console.error(error);
      //   setSubmitting(false);
      //   setErrors(error);
      // }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Book name"
                  {...getFieldProps("bookName")}
                  error={Boolean(touched.bookName && errors.bookName)}
                  helperText={touched.bookName && errors.bookName}
                />

                <div>
                  <LabelStyle>Description</LabelStyle>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </div>
                <TextField
                  fullWidth
                  label="Image Url"
                  {...getFieldProps("picture")}
                  error={Boolean(touched.picture && errors.picture)}
                  helperText={touched.picture && errors.picture}
                />
              </Stack>
              <br />
              <div>
                <Autocomplete
                  multiple
                  freeSolo
                  value={values.categories}
                  onChange={(event, newValue) => {
                    setFieldValue("categories", newValue);
                  }}
                  options={TAGS_OPTION.map((option) => option)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        size="small"
                        label={option}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField label="Categories" {...params} />
                  )}
                />
              </div>
              <br />
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Author Name"
                  {...getFieldProps("authorName")}
                />
                <TextField
                  fullWidth
                  label="Publisher Name"
                  {...getFieldProps("publisherName")}
                />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={8} md={6}>
            <Stack spacing={2}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="20.000"
                    label="Price"
                    {...getFieldProps("price")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₫</InputAdornment>
                      ),
                      type: "number",
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Stack>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={8} md={2}>
            <Card sx={{ p: 3 }}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <FormControlLabel
                  control={
                    <Switch
                      {...getFieldProps("inStock")}
                      checked={values.inStock}
                    />
                  }
                  label="In stock"
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {!isEdit ? "Create Book" : "Save Changes"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
