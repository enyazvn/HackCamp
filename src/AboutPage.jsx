import React, { useState } from 'react';
import { Upload, X, Heart, Users } from 'lucide-react';

const categories = {
  'Tops': ['T-Shirts', 'Tank Tops', 'Blouses', 'Sweaters', 'Hoodies', 'Crop Tops'],
  'Bottoms': ['Jeans', 'Pants', 'Shorts', 'Skirts', 'Leggings'],
  'Dresses': ['Mini Dresses', 'Midi Dresses', 'Maxi Dresses', 'Cocktail Dresses'],
  'Outerwear': ['Jackets', 'Coats', 'Blazers', 'Vests'],
  'Shoes': ['Sneakers', 'Boots', 'Heels', 'Flats', 'Sandals'],
  'Accessories': ['Bags', 'Jewelry', 'Hats', 'Scarves', 'Belts', 'Sunglasses']
};

const sizeOptions = {
  'Alpha': ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
  'Numerical': ['000', '00', '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
  'US Shoe': ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
};

const conditions = ['New with Tags', 'New', 'Like New', 'Fair'];

const colors = ['Black', 'White', 'Gray', 'Beige', 'Brown', 'Red', 'Pink', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Multi-Color', 'Metallic', 'Other'];

const styleTags = ['Casual', 'Formal', 'Business', 'Boho', 'Vintage', 'Streetwear', 'Athleisure', 'Y2K', 'Minimalist', 'Preppy', 'Grunge', 'Cottagecore'];

export default function ListingForm() {
  const [formData, setFormData] = useState({
    listingName: '',
    category: '',
    subcategory: '',
    gender: '',
    sizeType: '',
    size: '',
    brand: '',
    condition: '',
    colors: [],
    styleTags: [],
    description: '',
    tradePreferences: '',
    images: []
  });

  const [imagePreview, setImagePreview] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'category' && { subcategory: '' }),
      ...(field === 'sizeType' && { size: '' })
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (imagePreview.length + files.length > 3) {
      alert('Maximum 3 images allowed');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, file]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.listingName || !formData.category || !formData.subcategory || 
        !formData.gender || !formData.size || !formData.brand || 
        !formData.condition || formData.images.length === 0) {
      alert('Please fill in all required fields and upload at least one image');
      return;
    }

    const listingID = `listing_${Date.now()}`;
    
    const listing = {
      ...formData,
      listingID,
      listingStatus: 'active',
      location: 'Vancouver, BC',
      createdAt: new Date().toISOString()
    };

    console.log('Listing created:', listing);
    alert('Listing created successfully!');
    
    setFormData({
      listingName: '',
      category: '',
      subcategory: '',
      gender: '',
      sizeType: '',
      size: '',
      brand: '',
      condition: '',
      colors: [],
      styleTags: [],
      description: '',
      tradePreferences: '',
      images: []
    });
    setImagePreview([]);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
      <div className="w-full h-full max-w-sm bg-white flex flex-col rounded-lg shadow-lg">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Add Listing</h1>
          <p className="text-sm text-gray-500 mt-1">Create a new item to swap</p>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
          <div className="space-y-6">
            {/* Photos */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Photos <span className="text-gray-900">*</span> <span className="font-normal text-gray-500">(up to 3)</span>
              </label>
              <div className="flex gap-3">
                {imagePreview.map((img, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={img} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {imagePreview.length < 3 && (
                  <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer flex flex-col items-center justify-center bg-white">
                    <Upload size={20} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      multiple
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Listing Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Listing Name <span className="text-gray-900">*</span>
              </label>
              <input
                type="text"
                value={formData.listingName}
                onChange={(e) => handleInputChange('listingName', e.target.value)}
                placeholder="e.g., Brandy Melville Waldo Sweater"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category <span className="text-gray-900">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">Select category</option>
                  {Object.keys(categories).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Subcategory */}
            {formData.category && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subcategory <span className="text-gray-900">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.subcategory}
                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">Select subcategory</option>
                    {categories[formData.category].map(subcat => (
                      <option key={subcat} value={subcat}>{subcat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Gender <span className="text-gray-900">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">Select gender</option>
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Unisex">Unisex</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Sizing Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Sizing Type <span className="text-gray-900">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.sizeType}
                  onChange={(e) => handleInputChange('sizeType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">Select sizing type</option>
                  <option value="Alpha">Alpha (XS, S, M, L, XL)</option>
                  <option value="Numerical">Numerical (0, 2, 4, 6...)</option>
                  <option value="Shoe">Shoe Sizes</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Size */}
            {formData.sizeType && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Size <span className="text-gray-900">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">Select size</option>
                    {sizeOptions[formData.sizeType].map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Brand */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Brand <span className="text-gray-900">*</span>
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="e.g., Zara, H&M, Nike"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Condition <span className="text-gray-900">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">Select condition</option>
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Colors <span className="font-normal text-gray-500">(Select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => handleMultiSelect('colors', color)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      formData.colors.includes(color)
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Style Tags <span className="font-normal text-gray-500">(Select all that apply)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {styleTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleMultiSelect('styleTags', tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      formData.styleTags.includes(tag)
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description <span className="font-normal text-gray-500">(Optional)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Tell us more about this item..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
              />
            </div>

            {/* Trade Preferences */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Trade Preferences <span className="font-normal text-gray-500">(Optional)</span>
              </label>
              <textarea
                value={formData.tradePreferences}
                onChange={(e) => handleInputChange('tradePreferences', e.target.value)}
                placeholder="What are you looking to trade for?"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-full text-sm hover:bg-gray-800 transition-colors"
            >
              Create Listing
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-200 rounded-b-lg">
          <div className="flex justify-around items-center px-4 py-2">
            <button className="flex flex-col items-center justify-center py-2 min-w-[60px]">
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M16 3l5 5-5 5M21 8H9"/>
                  <path d="M8 21l-5-5 5-5M3 16h12"/>
                </svg>
              </div>
              <span className="text-xs text-gray-500">Swap</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 min-w-[60px]">
              <Heart className="w-6 h-6 mb-1 text-gray-400" fill="none" />
              <span className="text-xs text-gray-500">Likes</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 min-w-[60px]">
              <Users className="w-6 h-6 mb-1 text-gray-400" />
              <span className="text-xs text-gray-500">Matches</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 min-w-[60px]">
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-gray-400"></div>
              </div>
              <span className="text-xs text-gray-500">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}