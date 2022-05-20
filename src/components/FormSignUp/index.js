import "./index.css"
import React, { useState } from "react";
import { Container, Typography, Card, CardContent, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Box, CardActions, Button } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { Navigate } from "react-router-dom";
import { post } from "../../utils/ApiCaller";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormSignUp = () => {
    const [username, setUsername] = useState('')

    const [password, setPassword] = useState({
        value: '',
        showPassword: false,
    });

    const [pwdConfirm, setPwdConfirm] = useState({
        value: '',
        showPwdConfirm: false,
    });

    const [snackbar, setSnackbar] = useState({
        isOpen: false,
        msg: '',
        type: ''
    })

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleChange1 = (prop) => (event) => {
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

    const handleChange2 = (prop) => (event) => {
        setPwdConfirm({ ...pwdConfirm, [prop]: event.target.value });
    };

    const handleClickShowPwdConfirm = () => {
        setPwdConfirm({
            ...pwdConfirm,
            showPwdConfirm: !pwdConfirm.showPwdConfirm,
        });
    };

    const handleMouseDownPwdConfirm = (event) => {
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

    const passwordMatch = () => (password.value === pwdConfirm.value)

    const isValid = () => {
        if (username === "" || password.value === "" || pwdConfirm.value === "")
            return false;
        return true
    }

    const handleSignUpBtnClick = () => {
        if (!isValid()) {
            handleShowSnackbar(true, "Don't leave any fields blank!!!", 'warning')
        }
        else if (!passwordMatch()) {
            handleShowSnackbar(true, "Passwords don't match!!!", 'error')
        }
        else {
            const newUserCredentials = {
                username,
                password: password.value
            };
            post("/api/user/signup", newUserCredentials)
                .then((res) => {
                    const user2_Ed = LocalStorageUtils.setUser(res.data.content);
                    if (user2_Ed === null) {
                        handleShowSnackbar(true, "Registration failed, try again!", "error")
                    } else {
                        LocalStorageUtils.setToken(res.data.content.accessToken);

                        if (res.data.message === "Signup successfully") {
                            alert("Sign up successfully");
                            window.location.reload();
                        }
                    }
                })
                .catch((err) => {
                    handleShowSnackbar(true, "Sign up failed. " + err.response.data.message, "error")
                });
        }
    }


    return (LocalStorageUtils.getUser()) ? (
        <Navigate to="/" />
    ) : (
        <Container maxWidth="lg" sx={{ minHeight: '65vh' }}>
            <Card sx={{ maxWidth: 500, mx: "auto" }} className="boxshadow">
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: 'center', my: 3 }}>
                        Sign Up
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
                                onChange={handleChange1('value')}
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
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="passwordConfirmTxt">Confirm password</InputLabel>
                            <OutlinedInput
                                id="passwordConfirmTxt"
                                type={pwdConfirm.showPwdConfirm ? 'text' : 'password'}
                                value={pwdConfirm.value}
                                onChange={handleChange2('value')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPwdConfirm}
                                            onMouseDown={handleMouseDownPwdConfirm}
                                            edge="end"
                                        >
                                            {pwdConfirm.showPwdConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm password"
                            />
                        </FormControl>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button sx={{ mx: 'auto', my: 5 }} onClick={handleSignUpBtnClick} variant="contained" size="large">Sign up</Button>
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
}

export default FormSignUp;