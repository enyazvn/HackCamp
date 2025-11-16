import React, { useState } from 'react';
import { Plus, X, ChevronLeft } from 'lucide-react';

const ADD_LISTING_URL = 'http://localhost:3000/api/listings';

const AddListingPage = () => {
  const [formData, setFormData] = useState({
    listingName: '',
    listingDescription: '',
    tradePreferences: '',
    sizingTags: '',
    genderOfSizing: '',
    brand: '',
    condition: '',
    colour: '',
    articleTags: '',
    styleTags: '',
  });

  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState({ message: '', isSuccess: false });
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (pictures.length + files.length > 5) {
      setStatus({
        message: 'You can only upload up to 5 pictures.',
        isSuccess: false
      });
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictures(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPictures(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!userId) {
      setStatus({
        message: 'You must be logged in to create a listing.',
        isSuccess: false
      });
      return;
    }

    if (!formData.listingName || !formData.sizingTags || !formData.genderOfSizing || 
        !formData.condition || !formData.articleTags) {
      setStatus({
        message: 'Please fill in all required fields.',
        isSuccess: false
      });
      return;
    }

    if (pictures.length === 0) {
      setStatus({
        message: 'Please add at least one picture.',
        isSuccess: false
      });
      return;
    }

    setIsLoading(true);
    setStatus({ message: '', isSuccess: false });

    const payload = {
      userId: parseInt(userId),
      listingName: formData.listingName,
      listingDescription: formData.listingDescription || null,
      tradePreferences: formData.tradePreferences || null,
      sizingTags: formData.sizingTags,
      genderOfSizing: formData.genderOfSizing,
      brand: formData.brand || null,
      condition: formData.condition,
      colour: formData.colour || null,
      articleTags: formData.articleTags,
      styleTags: formData.styleTags || null,
      pictures: pictures,
      listingStatus: 'available'
    };

    try {
      const response = await fetch(ADD_LISTING_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          message: 'Listing created successfully! 🎉',
          isSuccess: true
        });
        
        setTimeout(() => {
          window.location.href = '/profile';
        }, 2000);
      } else {
        setStatus({
          message: data.message || 'Failed to create listing. Please try again.',
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
    <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900">
      <div className="w-full h-full max-w-sm bg-gradient-to-b from-pink-50 to-white flex flex-col rounded-lg shadow-lg overflow-y-auto">
        
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-neutral-200 sticky top-0 z-10 flex items-center justify-between">
          <button onClick={() => window.location.href = '/profile'} className="p-1">
            <ChevronLeft className="w-6 h-6 text-neutral-900" />
          </button>
          <h2 className="text-lg font-semibold text-neutral-900">Add New Listing</h2>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Status Message */}
          {status.message && (
            <div className={`p-4 rounded-lg text-sm font-medium ${
              status.isSuccess 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {status.message}
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
            
            {/* Listing Name */}
            <div>
              <label htmlFor="listingName" className="block text-sm font-medium text-gray-700 mb-2">
                Listing Title *
              </label>
              <input
                type="text"
                id="listingName"
                name="listingName"
                placeholder="e.g., Vintage Levi's Denim Jacket"
                value={formData.listingName}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Pictures Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pictures * (up to 5)
              </label>
              
              {/* Picture Grid */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {pictures.map((pic, index) => (
                  <div key={index} className="relative aspect-square">
                    <img 
                      src={pic} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {/* Upload Button */}
                {pictures.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-pink-500 transition-colors">
                    <Plus className="w-8 h-8 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="listingDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="listingDescription"
                name="listingDescription"
                placeholder="Why are you trading this item?"
                value={formData.listingDescription}
                onChange={handleChange}
                disabled={isLoading}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Trade Preferences */}
            <div>
              <label htmlFor="tradePreferences" className="block text-sm font-medium text-gray-700 mb-2">
                Trade Preferences <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                id="tradePreferences"
                name="tradePreferences"
                placeholder="What are you looking for?"
                value={formData.tradePreferences}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Article Tags */}
            <div>
              <label htmlFor="articleTags" className="block text-sm font-medium text-gray-700 mb-2">
                Article Type *
              </label>
              <select
                id="articleTags"
                name="articleTags"
                value={formData.articleTags}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              >
                <option value="">Select article type</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Sizing and Gender Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="sizingTags" className="block text-sm font-medium text-gray-700 mb-2">
                  Size *
                </label>
                <input
                  type="text"
                  id="sizingTags"
                  name="sizingTags"
                  placeholder="e.g., M, 8, 32"
                  value={formData.sizingTags}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="genderOfSizing" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  id="genderOfSizing"
                  name="genderOfSizing"
                  value={formData.genderOfSizing}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                >
                  <option value="">Select</option>
                  <option value="Unisex">Unisex</option>
                  <option value="Women's">Women's</option>
                  <option value="Men's">Men's</option>
                </select>
              </div>
            </div>

            {/* Brand and Condition Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="e.g., Nike, Zara"
                  value={formData.brand}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                >
                  <option value="">Select</option>
                  <option value="new">New</option>
                  <option value="like new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
            </div>

            {/* Colour */}
            <div>
              <label htmlFor="colour" className="block text-sm font-medium text-gray-700 mb-2">
                Colour
              </label>
              <input
                type="text"
                id="colour"
                name="colour"
                placeholder="e.g., Blue, Black, Multi-color"
                value={formData.colour}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Style Tags */}
            <div>
              <label htmlFor="styleTags" className="block text-sm font-medium text-gray-700 mb-2">
                Style Tags <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                id="styleTags"
                name="styleTags"
                placeholder="e.g., Streetwear, Vintage, Y2K"
                value={formData.styleTags}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={isLoading} 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating listing...
                </span>
              ) : (
                'Create Listing'
              )}
            </button>

            {/* Cancel Button */}
            <button 
              onClick={() => window.location.href = '/profile'}
              disabled={isLoading}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListingPage;