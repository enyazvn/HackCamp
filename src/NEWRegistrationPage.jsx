import React, { useState } from 'react';

const REGISTER_URL = 'http://localhost:3000/api/register';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    birthday: '',
    preferredMeetingLocation: '',
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [status, setStatus] = useState({ message: '', isSuccess: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.firstname || !formData.email || !formData.password) {
      setStatus({ 
        message: 'Please fill in all required fields.', 
        isSuccess: false 
      });
      return;
    }

    if (!termsAccepted) {
      setStatus({ 
        message: 'Please accept the terms and conditions.', 
        isSuccess: false 
      });
      return;
    }

    if (formData.password.length < 8) {
      setStatus({ 
        message: 'Password must be at least 8 characters.', 
        isSuccess: false 
      });
      return;
    }

    setIsLoading(true);
    setStatus({ message: '', isSuccess: false });

    const submissionData = {
      ...formData,
      birthday: formData.birthday || null
    };

    try {
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          message: `Welcome to Renewd, ${formData.firstname}! 🎉 Redirecting to login...`, 
          isSuccess: true 
        });
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setStatus({ 
          message: data.message || data.details || 'Registration failed. Please try again.', 
          isSuccess: false 
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus({ 
        message: 'Could not connect to server. Please check your connection.', 
        isSuccess: false 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Outer Container: White frame
    <div className="flex items-center justify-center h-screen w-screen bg-white"> 
      
      {/* Inner Container: Reverted to bg-green-800 */}
      <div 
        className="w-full h-full max-w-sm bg-green-800 flex flex-col px-8 py-12 shadow-lg rounded-lg"
      >
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1> 
          {/* Reverted to text-lime-300 */}
          <p className="text-lime-300 text-sm">Join RENEW'D and match with clothes you'll love</p>
        </div>

        {/* Status Message */}
        {status.message && (
          <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            status.isSuccess 
              ? 'bg-lime-400 text-gray-900' // Success background reverted to lime
              : 'bg-red-600 text-white'     
          }`}>
            {status.message}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4 overflow-y-auto"> 
          
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-semibold text-white mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white border-0 rounded-full focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white border-0 rounded-full focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white border-0 rounded-full focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
            />
            {/* Reverted to text-gray-300 */}
            <p className="mt-1 text-xs text-gray-300">Must be at least 8 characters</p>
          </div>

          {/* Birthday */}
          <div>
            <label htmlFor="birthday" className="block text-sm font-semibold text-white mb-2">
              Birthday <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white border-0 rounded-full focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
            />
          </div>

          {/* Preferred Meeting Location */}
          <div>
            <label htmlFor="preferredMeetingLocation" className="block text-sm font-semibold text-white mb-2">
              Preferred Meeting Location
            </label>
            <input
              type="text"
              id="preferredMeetingLocation"
              name="preferredMeetingLocation"
              placeholder="e.g., Downtown Toronto, Queen St W"
              value={formData.preferredMeetingLocation}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white border-0 rounded-full focus:ring-2 focus:ring-lime-400 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
            />
            {/* Reverted to text-gray-300 */}
            <p className="mt-1 text-xs text-gray-300">Where do you prefer to swap items?</p>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start pt-2">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              disabled={isLoading}
              className="mt-1 h-4 w-4 text-lime-400 border-gray-400 rounded focus:ring-lime-400"
            />
            <label htmlFor="terms" className="ml-2 text-xs text-white"> 
              I agree to the <span className="text-lime-400 font-semibold underline">Terms of Service</span> and <span className="text-lime-400 font-semibold underline">Privacy Policy</span>
            </label>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            disabled={isLoading} 
            className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-4 px-6 rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg mt-6"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating your account...
              </span>
            ) : (
              'Start Swapping'
            )}
          </button>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-300"> 
            Already have an account?{' '}
            <a href="/login" className="text-lime-400 font-bold hover:text-lime-300 transition-colors underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;