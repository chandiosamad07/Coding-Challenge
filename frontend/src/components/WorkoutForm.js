import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    load: Yup.number().required("Load is required"),
    reps: Yup.number().required("Reps is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      load: "",
      reps: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!user) {
        // Handle authentication error
        return;
      }

      const workout = { ...values };

      try {
        const response = await fetch('/api/workouts', {
          method: 'POST',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });

        const json = await response.json();

        if (!response.ok) {
          // Handle validation errors
        } else {
          formik.resetForm();
          // Dispatch action or update state
        }
      } catch (error) {
        // Handle fetch or other errors
      }
    },
  });

  const { touched, errors } = formik;

  return (
    <form className="create" onSubmit={formik.handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Name</label>
      <input 
        type="text"
        id="title"
        {...formik.getFieldProps("title")}
        className={touched.title && errors.title ? 'error' : ''}
      />
      {touched.title && errors.title && (
        <div className="error">{errors.title}</div>
      )}

      <label>Number</label>
      <input 
        type="number"
        id="load"
        {...formik.getFieldProps("load")}
        className={touched.load && errors.load ? 'error' : ''}
      />
      {touched.load && errors.load && (
        <div className="error">{errors.load}</div>
      )}

      <label>Street No</label>
      <input 
        type="number"
        id="reps"
        {...formik.getFieldProps("reps")}
        className={touched.reps && errors.reps ? 'error' : ''}
      />
      {touched.reps && errors.reps && (
        <div className="error">{errors.reps}</div>
      )}

      <button type="submit">Add Order</button>
    </form>
  );
}

export default WorkoutForm;
