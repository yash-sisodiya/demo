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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
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
      cpassword: yup
        .string()
        .required("Confirm Password is Required")
        .oneOf([yup.ref("password")], "Must match confirm password"),
    }),
    onSubmit: (values) => {
      signUp();
    },
  });

  const signUp = async () => {
    try {
      setIsLoading(true);
      let req = {
        email: formik.values.email,
        password: formik.values.password,
        cpassword: formik.values.cpassword,
      };
      navigate("/login");
      console.log("Registed");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="authWrapper">
        <div className="title">Sign up</div>
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
                autoComplete="off"
                label="Password"
              />
              <FormHelperText>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </FormHelperText>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                name={"cpassword"}
                onChange={formik.handleChange}
                value={formik.values.cpassword}
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="off"
                label="Confirm Password"
              />
              <FormHelperText>
                {formik.touched.cpassword && formik.errors.cpassword
                  ? formik.errors.cpassword
                  : null}
              </FormHelperText>
            </FormControl>
            <button type="submit" className="submitButton">
              Sign up
            </button>
          </div>
        </form>
        <div className="redirection">
          Already have an account{" "}
          <span className="url" onClick={() => navigate("/login")}>
            Login?
          </span>
        </div>
      </div>
    </div>
  );
};
export default Signup;
