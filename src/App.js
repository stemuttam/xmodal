import React, { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", dob: "", phone: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = `Please fill out the ${key} field.`;
      }
    }

    if (formData.email && !formData.email.includes("@")) {
      if (!newErrors.email) {
        newErrors.email = "Invalid email. Please check your email address.";
      }
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      if (!newErrors.phone) {
        newErrors.phone = "Invalid phone number. Please enter a 10-digit phone number.";
      }
    }

    if (formData.dob && new Date(formData.dob) > new Date()) {
      if (!newErrors.dob) {
        newErrors.dob = "Invalid date of birth. Please enter a past date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsOpen(false);
      setFormData({ username: "", email: "", dob: "", phone: "" });
      setErrors({});
    }
  };

  return (
    <div>
      <h1>User Details Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Fill the Form</h2>
              <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" id="username" value={formData.username} onChange={handleChange} />
                {errors.username && <p className="error">{errors.username}</p>}

                <label>Email:</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}

                <label>Date of Birth:</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
                {errors.dob && <p className="error">{errors.dob}</p>}

                <label>Phone Number:</label>
                <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
                {errors.phone && <p className="error">{errors.phone}</p>}

                <button type="submit" className="submit-button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
