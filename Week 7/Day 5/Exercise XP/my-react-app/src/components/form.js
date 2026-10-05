import React, { useState } from "react";
import Input from "./Input";

const nameRegex = /^[A-Za-z][A-Za-z\s'-]*$/;
const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};

  if (!values.firstName.trim()) errors.firstName = "First name is required";
  else if (!nameRegex.test(values.firstName.trim()))
    errors.firstName = "First name can only contain letters";

  if (!values.lastName.trim()) errors.lastName = "Last name is required";
  else if (!nameRegex.test(values.lastName.trim()))
    errors.lastName = "Last name can only contain letters";

  if (!values.phone.trim()) errors.phone = "Phone is required";
  else if (!phoneRegex.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number (7-15 digits)";

  if (!values.email.trim()) errors.email = "Email is required";
  else if (!emailRegex.test(values.email.trim()))
    errors.email = "Enter a valid email address";

  return errors;
}

function Form() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    setSubmitted(Object.keys(newErrors).length === 0);
  };

  return (
    // noValidate turns off the browser's built-in HTML validation
    <form onSubmit={handleSubmit} noValidate>
      <h2>Sign Up</h2>
      <Input label="First Name" name="firstName" value={values.firstName}
        onChange={handleChange} error={errors.firstName} />
      <Input label="Last Name" name="lastName" value={values.lastName}
        onChange={handleChange} error={errors.lastName} />
      <Input label="Phone" name="phone" value={values.phone}
        onChange={handleChange} error={errors.phone} />
      <Input label="Email" name="email" value={values.email}
        onChange={handleChange} error={errors.email} />
      <button type="submit">Submit</button>
      {submitted && <p style={{ color: "green" }}>Form submitted successfully!</p>}
    </form>
  );
}

export default Form;