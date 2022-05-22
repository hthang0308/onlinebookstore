import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, Card, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { put } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  // const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
  });
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values) => {
      put("/api/user/change-password", {
        ...values,
        username: LocalStorageUtils.getUser().username,
      })
        .then((res) => {
          console.log({
            ...values,
            username: LocalStorageUtils.getUser().username,
          });
          LocalStorageUtils.setUser(res.data.content);
          LocalStorageUtils.setToken(res.data.content.accessToken);
          alert(res.data.message);
          window.location.reload();
        })
        .catch((err) => alert(err.response.data.message));
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps("currentPassword")}
              fullWidth
              autoComplete="on"
              type="password"
              label="Old Password"
              error={Boolean(touched.currentPassword && errors.currentPassword)}
              helperText={touched.currentPassword && errors.currentPassword}
            />

            <TextField
              {...getFieldProps("newPassword")}
              fullWidth
              autoComplete="on"
              type="password"
              label="New Password"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={
                (touched.newPassword && errors.newPassword) ||
                "Password must be minimum 6+"
              }
            />

            <TextField
              {...getFieldProps("confirmNewPassword")}
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirm New Password"
              error={Boolean(
                touched.confirmNewPassword && errors.confirmNewPassword
              )}
              helperText={
                touched.confirmNewPassword && errors.confirmNewPassword
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
