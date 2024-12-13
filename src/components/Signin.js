import React from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import chatapp1 from "../images/chatapp1.jpg";
import { TextField, Button, Box, Typography } from "@mui/material";

const Signin = () => {
  const navigate = useNavigate();

  const initialValue = {
    email: "",
    password: "",
  };
  const validation = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
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
          height: "700px",
          maxWidth: 900,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Formik
          initialValues={initialValue}
          validationSchema={validation}
          onSubmit={async (values, { resetForm }) => {
            try {
              const res = await fetch("http://localhost:3005/auth/login", {
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
              resetForm();
              navigate("/user");
            } catch (error) {
              alert("Error in Login", error.message);
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
                sx={{
                  fontWeight: "bold",
                  color: "#2D5544",
                  mb: 3,
                  fontSize: "30px",
                }}
              >
                Welcome back
              </Typography>
              <Typography sx={{ color: "gray", mb: 5, fontSize: "20px" }}>
                Please enter your details.
              </Typography>

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
                <Typography sx={{ color: "red" }}>{errors.email}</Typography>
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
                <Typography sx={{ color: "red" }}>{errors.password}</Typography>
              ) : null}
              <Button
                type="button"
                variant="contained"
                onClick={handleSubmit}
                fullWidth
                sx={{
                  backgroundColor: "#2D5544",
                  color: "white",
                  marginTop: 2,
                  "&:hover": { backgroundColor: "#1E4033" },
                }}
              >
                Sign in
              </Button>
              <Typography sx={{ marginTop: 2, fontSize: 14, color: "gray" }}>
                Don't have an account?{" "}
                <Link to="/signup" sx={{ color: "#2D5544" }}>
                  Sign up
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

export default Signin;
