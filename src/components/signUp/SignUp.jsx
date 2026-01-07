import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast, Toaster } from "sonner";


const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: null,
  });

  const [error, setError] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const validateUserName = (name) =>
    /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(name)
      ? ""
      : "Name should not contain numbers or symbols";

  const validatePhone = (phone) =>
    /^\d{10}$/.test(phone) ? "" : "Phone must be 10 digits";

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ""
      : "Enter a valid email";

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)
      ? ""
      : "Password must have 1 uppercase & 1 number";

  const validateProfilePicture = (file) => {
    if (!file) return "Profile picture required";
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type))
      return "Only JPG, JPEG, PNG allowed";
    if (file.size > 2 * 1024 * 1024)
      return "File size must be under 2MB";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "userName")
      setError((p) => ({ ...p, userName: validateUserName(value) }));
    if (name === "phone")
      setError((p) => ({ ...p, phone: validatePhone(value) }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      userName: validateUserName(formData.userName),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      profilePicture: validateProfilePicture(formData.profilePicture),
    };

    setError(errors);
    if (Object.values(errors).some((err) => err)) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataToSend.append(key, value)
    );

    try {
      await axiosInstance.post("/auth/signup", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Registration successful");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Signup</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <input name="userName" placeholder="Username" onChange={handleChange} />
            {error.userName && <p>{error.userName}</p>}

            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            {error.email && <p>{error.email}</p>}

            <input name="phone" placeholder="Phone" onChange={handleChange} />
            {error.phone && <p>{error.phone}</p>}

            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            {error.password && <p>{error.password}</p>}

            <input type="file" onChange={handleFileChange} />
            {error.profilePicture && <p>{error.profilePicture}</p>}

            <button type="submit">Sign Up</button>
          </form>

          <a href="/">Sign In</a>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default SignUp;
