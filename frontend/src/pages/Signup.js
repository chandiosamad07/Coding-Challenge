import React from "react";
import { useSignup } from "../hooks/useSignup";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const { signup, error, isLoading } = useSignup();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
      name: "",
      occupation: "",
      country: "",
      city: "",
      address: "",
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
      phone: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      occupation: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      await signup(values);
    },
  });

  return (
    <form className="signup" onSubmit={formik.handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        id="email"
        {...formik.getFieldProps("email")}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="error">{formik.errors.email}</div>
      ) : null}
      
      <label>Password:</label>
      <input 
        type="password" 
        id="password"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="error">{formik.errors.password}</div>
      ) : null}

      <label>Phone:</label>
      <input
        type="text"
        id="phone"
        {...formik.getFieldProps("phone")}
      />
      {formik.touched.phone && formik.errors.phone ? (
        <div className="error">{formik.errors.phone}</div>
      ) : null}

      <label>Name:</label>
      <input
        type="text"
        id="name"
        {...formik.getFieldProps("name")}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="error">{formik.errors.name}</div>
      ) : null}

      <label>Occupation:</label>
      <input
        type="text"
        id="occupation"
        {...formik.getFieldProps("occupation")}
      />
      {formik.touched.occupation && formik.errors.occupation ? (
        <div className="error">{formik.errors.occupation}</div>
      ) : null}

      <label>Country:</label>
      <input
        type="text"
        id="country"
        {...formik.getFieldProps("country")}
      />
      {formik.touched.country && formik.errors.country ? (
        <div className="error">{formik.errors.country}</div>
      ) : null}

      <label>City:</label>
      <input
        type="text"
        id="city"
        {...formik.getFieldProps("city")}
      />
      {formik.touched.city && formik.errors.city ? (
        <div className="error">{formik.errors.city}</div>
      ) : null}

      <label>Address:</label>
      <input
        type="text"
        id="address"
        {...formik.getFieldProps("address")}
      />
      {formik.touched.address && formik.errors.address ? (
        <div className="error">{formik.errors.address}</div>
      ) : null}

      <button type="submit" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
