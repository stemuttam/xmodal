import React, { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", dob: "", phone: "" });
  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to validate form data
  const validateForm = () => {
    let newErrors = {};
    
    // Check for empty fields
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = `Please fill out the ${key} field.`;
      }
    }

    // Email validation (must contain '@')
    if (formData.email && !formData.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    // Phone number validation (must be exactly 10 digits)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    // Date of Birth validation (should not be a future date)
    if (formData.dob && new Date(formData.dob) > new Date()) {
      alert("Invalid date of birth. Please enter a past date.");
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsOpen(false); // Close modal
      setFormData({ username: "", email: "", dob: "", phone: "" }); // Reset form
      setErrors({}); // Clear errors
    }
  };

  return (
    <div className="app"> {/* Outer div for application */}
      <h1>User Details Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && ( // Fully removes the modal when closed
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
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
      )}
    </div>
  );
}

export default App;
