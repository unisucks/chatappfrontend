import React from "react";
import chatapp1 from "../images/chatapp1.jpg";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const initialValue = {
    name: "",
    userName: "",
    email: "",
    password: "",
    gender: "",
    confirmPassword: "",
    profilePic: "",
  };
  const validation = Yup.object().shape({
    name: Yup.string().required("Please Enter your Name"),
    userName: Yup.string().required("Please fill your UserName"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .min(7, "Passwrod need to contain at least 7 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is Required")
      .oneOf([Yup.ref("password"), null], " Passwords must match"),
    gender: Yup.string().required("You need to select gender"),
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#CBD5CE",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "80%",
          maxWidth: 900,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          height: "700px",
        }}
      >
        <Formik
          initialValues={initialValue}
          validationSchema={validation}
          onSubmit={async (values, { resetForm }) => {
            try {
              const res = await fetch("http://localhost:3005/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
                credentials: "include",
              });
              const data = await res.json();
              if (data.error) {
                throw new Error(data.error);
              }
              localStorage.setItem("chat-user", JSON.stringify(data));

              navigate("/user");
              resetForm();
            } catch (error) {
              alert("Error in Registering", error.message);
            }
          }}
        >
          {({
            handleChange,
            values,
            errors,
            touched,
            handleSubmit,
            resetForm,
          }) => (
            <Box
              sx={{
                flex: 1,
                padding: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: "bold", color: "#2D5544" }}
              >
                Create an Account
              </Typography>
              <Typography sx={{ color: "gray", marginBottom: 2 }}>
                Please fill in the details to sign up.
              </Typography>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && touched.name ? (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.name}
                </Typography>
              ) : null}
              <TextField
                label="Username"
                name="userName"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={values.userName}
                onChange={handleChange}
              />
              {errors.userName && touched.userName ? (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.userName}
                </Typography>
              ) : null}
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email ? (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.email}
                </Typography>
              ) : null}
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && touched.password ? (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.password}
                </Typography>
              ) : null}
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  {errors.confirmPassword}
                </Typography>
              ) : null}
              <Typography sx={{ marginTop: 2, color: "gray" }}>
                Gender
              </Typography>
              <RadioGroup
                row
                name="gender"
                value={values.gender}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="Female"
                />
              </RadioGroup>
              {errors.gender && touched.gender ? (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    mt: "-20px",
                    mb: "10px",
                  }}
                >
                  {errors.gender}
                </Typography>
              ) : null}
              <Button
                onClick={handleSubmit}
                type="button"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#2D5544",
                  color: "white",
                  "&:hover": { backgroundColor: "#1E4033" },
                }}
              >
                Sign up
              </Button>
              <Typography sx={{ marginTop: 2, fontSize: 14, color: "gray" }}>
                Already Have an Accont?{" "}
                <Link to="/" sx={{ color: "#2D5544" }}>
                  Sign In
                </Link>
              </Typography>
            </Box>
          )}
        </Formik>
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#CBD5CE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={chatapp1} alt="chatapp" width="100%" height="100%"></img>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
