import React from "react";
import { useLogin } from "../hooks/useLogin"; // Make sure the import path is correct
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { login, error, isLoading } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    }),
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });

  return (
    <form className="login" onSubmit={formik.handleSubmit}>
      <h3>Log In</h3>
      
      <label htmlFor="email">Email address:</label>
      <input 
        type="email" 
        id="email"
        {...formik.getFieldProps("email")}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="error">{formik.errors.email}</div>
      ) : null}
      
      <label htmlFor="password">Password:</label>
      <input 
        type="password" 
        id="password"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="error">{formik.errors.password}</div>
      ) : null}

      <button type="submit" disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
