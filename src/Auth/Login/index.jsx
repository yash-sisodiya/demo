import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import "./../index.scss";
import { encryptCredentials } from "../../utilities";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid Email").required("Email is Required"),
      password: yup
        .string()
        .min(8, "Password must be atleast 8 characters")
        .max(15, "Must be 15 characters or less")
        .required("Password is Required")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol"),
    }),
    onSubmit: (values) => {
      signInClick();
    },
  });

  const signInClick = async () => {
    try {
      setIsLoading(true);
      encryptCredentials(
        formik.values.email.trim(),
        formik.values.password.trim()
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="authWrapper">
        <div className="title">Login</div>
        <form onSubmit={formik.handleSubmit} autoComplete="off" method="POST">
          <div className="inputWrapper">
            <TextField
              label="Email"
              variant="outlined"
              name={"email"}
              onChange={formik.handleChange}
              value={formik.values.email}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
              autoComplete="off"
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name={"password"}
                onChange={formik.handleChange}
                value={formik.values.password}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                autoComplete="off"
              />
              <FormHelperText>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </FormHelperText>
            </FormControl>
            <button type="submit" className="submitButton">
              Login
            </button>
          </div>
        </form>
        <div className="redirection">
          Not a member yet?
          <span className="url" onClick={() => navigate("/register")}>
            Sign Up here
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
