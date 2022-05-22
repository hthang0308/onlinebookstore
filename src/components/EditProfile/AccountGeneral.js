// import React from "react";
// import Typography from "@mui/material/Typography";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import { Link } from "react-router-dom";

// const FormUserEdit = () => {
//   return (
//     <>
//       <div className="content-wrapper">
//         <div className="container">
//           <div className="row border-bottom">
//             <div className="col-lg-12">
//               <div className="account-info-wrapper mb-4">
//                 <Breadcrumbs aria-label="breadcrumb">
//                   <Link underline="hover" color="inherit" to="/my-account">
//                     My Account
//                   </Link>
//                   <Typography color="text.primary">Edit Profile</Typography>
//                 </Breadcrumbs>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default FormUserEdit;

import * as Yup from "yup";
import { put } from "../../utils/ApiCaller";
// import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useAuth from "./useAuth";
import useIsMountedRef from "./useIsMountedRef";
import { UploadAvatar } from "./upload";
// utils
// import { fData } from "./formatNumber";
//
import countries from "./countries";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import axios from "axios";

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  //   const { enqueueSnackbar } = useSnackbar();
  //const { user, updateProfile } = useAuth(LocalStorageUtils.getUser());
  var user = LocalStorageUtils.getUser();
  const UpdateUserSchema = Yup.object().shape({
    fullname: Yup.string().required("Name is required"),
  });
  //https://pbs.twimg.com/media/EYVxlOSXsAExOpX.jpg
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: user.fullname,
      email: user.email,
      photoURLL: "https://pbs.twimg.com/media/EYVxlOSXsAExOpX.jpg",
      phone: user.phone,
      country: user.country,
      address: user.address,
      balance: user.balance,
      city: user.city,
      role: user.isAdmin ? "Admin" : "Customer",
      about: user.about,
      isPublic: false,
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async () => {
      console.log({ ...values, ...user });
      put("/api/user/change-info", { ...user, ...values })
        .then((res) => {
          LocalStorageUtils.setUser(res.data.content);
          LocalStorageUtils.setToken(res.data.content.accessToken);
          alert(res.data.message);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue("photoURLL", {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              <UploadAvatar
                accept="image/*"
                disabled
                file={values.photoURLL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURLL && errors.photoURLL)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    {/* Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)} */}
                  </Typography>
                }
              />
              <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                {touched.photoURLL && errors.photoURLL}
              </FormHelperText>
              <h4>{LocalStorageUtils.getUser().username}</h4>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    {...getFieldProps("fullname")}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps("email")}
                  />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps("phone")}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps("address")}
                  />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps("country")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="City"
                    {...getFieldProps("city")}
                  />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Role"
                    disabled
                    {...getFieldProps("role")}
                  />
                  <TextField
                    fullWidth
                    label="Balance"
                    disabled
                    {...getFieldProps("balance")}
                  />
                </Stack>

                <TextField
                  {...getFieldProps("about")}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  label="About"
                />
              </Stack>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
