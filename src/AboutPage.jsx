import React, { useState } from 'react';

// Define the URL of your backend API
const REGISTER_URL = 'http://localhost:3000/api/register';

const AboutPage = () => {
  // 1. Set up state to manage all form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    birthday: '', // YYYY-MM-DD format
    preferredMeetingLocation: '',
  });

  // State for handling loading, success, and error messages
  const [status, setStatus] = useState({ 
    message: '', 
    isSuccess: false 
  });
  const [isLoading, setIsLoading] = useState(false);

  // 2. Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ message: '', isSuccess: false });

    // Ensure birthday is null if empty, as an empty string might fail backend date validation
    const submissionData = {
        ...formData,
        birthday: formData.birthday || null // Send null if optional field is empty
    };

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Convert the JavaScript object to a JSON string for the body
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        // HTTP Status 201 (Created)
        setStatus({ 
          message: `Success! User registered with ID: ${data.userId}.`, 
          isSuccess: true 
        });
        // Optionally clear the form: setFormData({ ...initialState });
      } else {
        // HTTP Status 400, 409, 500, etc.
        // The backend sends error/message fields for these cases
        setStatus({ 
          message: `Registration failed: ${data.message || data.details || 'Unknown error'}`, 
          isSuccess: false 
        });
      }
    } catch (error) {
      console.error('Network or fetch error:', error);
      setStatus({ 
        message: 'Network error. Could not reach the server.', 
        isSuccess: false 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>👤 New User Registration</h1>
      <p>Please provide your details below.</p>
      
      {/* Display Status Message */}
      {status.message && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px', 
          borderRadius: '5px',
          backgroundColor: status.isSuccess ? '#d4edda' : '#f8d7da',
          color: status.isSuccess ? '#155724' : '#721c24'
        }}>
          {status.message}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        
        {/* Email Field (Required) */}
        <div className="form-group">
          <label htmlFor="email">Email Address (Required)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            style={inputStyle}
          />
        </div>
        
        {/* Password Field (Required) */}
        <div className="form-group">
          <label htmlFor="password">Password (Min 8 Chars, Required)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            minLength="8"
            style={inputStyle}
          />
        </div>
        
        {/* First Name Field (Required) */}
        <div className="form-group">
          <label htmlFor="firstname">First Name (Required)</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            disabled={isLoading}
            style={inputStyle}
          />
        </div>
        
        {/* Birthday Field (Optional) */}
        <div className="form-group">
          <label htmlFor="birthday">Birthday (YYYY-MM-DD)</label>
          <input
            type="date" // Uses the browser's date picker if supported
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            disabled={isLoading}
            pattern="\d{4}-\d{2}-\d{2}"
            style={inputStyle}
          />
        </div>
        
        {/* Preferred Meeting Location Field (Optional) */}
        <div className="form-group">
          <label htmlFor="preferredMeetingLocation">Preferred Meeting Location</label>
          <input
            type="text"
            id="preferredMeetingLocation"
            name="preferredMeetingLocation"
            value={formData.preferredMeetingLocation}
            onChange={handleChange}
            disabled={isLoading}
            style={inputStyle}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isLoading} 
          style={buttonStyle}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

// Simple inline styles for demonstration purposes
const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '8px 0 15px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '14px 20px',
  margin: '8px 0',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default AboutPage;