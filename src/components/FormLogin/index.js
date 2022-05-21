import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Box, CardActions, Button } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { post } from "../../utils/ApiCaller";
import "./index.css"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormLogin = () => {
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState({
    value: '',
    showPassword: false,
  });

  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    msg: '',
    type: ''
  })

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleShowSnackbar = (isOpen, msg = '', type = '') => {
    setSnackbar({ isOpen, msg, type })
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ ...snackbar, isOpen: false })
  }

  const isValid = () => {
    if (username === "" || password.value === "")
      return false;
    return true
  }

  const handleSignInBtnClick = () => {
    if (!isValid()) {
      handleShowSnackbar(true, "Don't leave any fields blank!!!", "warning")
    }
    else {
      const newUserCredentials = {
        username,
        password: password.value
      };

      post("/api/user/login", newUserCredentials)
        .then((res) => {
          const user2_Ed = LocalStorageUtils.setUser(res.data.content);
          if (user2_Ed === null) {
            handleShowSnackbar(true, "Login failed, try again!", "error")
          } else {
            LocalStorageUtils.setToken(res.data.content.accessToken);

            if (res.data.message === "Login successfully") {

              alert("Login successfully");
              window.location.reload();
            }
          }
        })
        .catch((err) => {
          handleShowSnackbar(true, "Login failed. " + err.response.data.message, "error")
        });
    }
  }

  return (LocalStorageUtils.getUser()) ? (
    <Navigate to="/" />
  ) : (
    <Container maxWidth="lg" sx={{ minHeight: '65vh' }}>
      <Card sx={{ maxWidth: 500, mx: 'auto' }} className="boxshadow">
        <CardContent>
          <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: 'center', my: 3 }}>
            Sign In
          </Typography>
          <Box sx={{ mx: 'auto', mt: 7, maxWidth: 400 }}>
            <FormControl fullWidth variant="outlined">
              <TextField id="usernameTxt" label="Username" variant="outlined" value={username} onChange={handleUsernameChange} />
            </FormControl>
            <FormControl fullWidth sx={{ my: 3 }} variant="outlined">
              <InputLabel htmlFor="passwordTxt">Password</InputLabel>
              <OutlinedInput
                id="passwordTxt"
                type={password.showPassword ? 'text' : 'password'}
                value={password.value}
                onChange={handlePasswordChange('value')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {password.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
        </CardContent>
        <CardActions>
          <Button sx={{ mx: 'auto', my: 5 }} onClick={handleSignInBtnClick} variant="contained" size="large">Sign in</Button>
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbar.isOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Container>
  )
};

export default FormLogin;
