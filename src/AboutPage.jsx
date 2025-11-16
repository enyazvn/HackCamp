import React, { useState } from 'react';
import { Heart, X, ChevronDown, SlidersHorizontal, Tag, Package, Search } from 'lucide-react';

const FeedPage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filters, setFilters] = useState({
    sizes: [],
    articleTypes: [],
    styleTypes: [],
    distance: 25,
    colours: []
  });

  // Filter options
  const sizeOptions = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
  const articleTypeOptions = {
    'Tops': ['T-Shirts', 'Tank Tops', 'Blouses', 'Sweaters', 'Hoodies', 'Crop Tops'],
    'Bottoms': ['Jeans', 'Pants', 'Shorts', 'Skirts', 'Leggings'],
    'Dresses': ['Mini Dresses', 'Midi Dresses', 'Maxi Dresses', 'Cocktail Dresses'],
    'Outerwear': ['Jackets', 'Coats', 'Blazers', 'Vests'],
    'Shoes': ['Sneakers', 'Boots', 'Heels', 'Flats', 'Sandals'],
    'Accessories': ['Bags', 'Jewelry', 'Hats', 'Scarves', 'Belts', 'Sunglasses']
  };
  const styleTypeOptions = ['Casual', 'Formal', 'Business', 'Boho', 'Vintage', 'Streetwear', 'Athleisure', 'Y2K', 'Minimalist', 'Preppy', 'Grunge', 'Cottagecore'];
  const colourOptions = ['Black', 'White', 'Gray', 'Beige', 'Brown', 'Red', 'Pink', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Multi-Color', 'Metallic', 'Other'];

  // Sample listing data
  const listings = [
    {
      id: 1,
      mainPhoto: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      size: 'XS, XXS',
      gender: 'Woman',
      location: 'Vancouver',
      brand: 'Brandy Melville',
      quality: 'Used, Like New',
      colours: ['Red', 'White'],
      clothingTags: ['Shirt', 'T-Shirt', 'Officewear'],
      details: 'Only worn once, getting rid of as I\'m WFH',
      lookingFor: 'sweats, hoodies',
      additionalNote: 'Open to shoes size 6!',
      additionalPhotos: [
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
        'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400'
      ]
    },
    {
      id: 2,
      mainPhoto: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      size: 'M',
      gender: 'Unisex',
      location: 'Vancouver',
      brand: 'KAZO',
      quality: 'Used, Good',
      colours: ['Navy'],
      clothingTags: ['Jacket', 'Outerwear'],
      details: 'Warm navy jacket, perfect for fall',
      lookingFor: 'sweaters, cardigans',
      additionalNote: '',
      additionalPhotos: [
        'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400',
        'https://images.unsplash.com/photo-1548126032-079b-67b6f1e0?w=400'
      ]
    }
  ];

  const currentListing = listings[currentCardIndex];

  const handleLike = () => {
    console.log('Liked:', currentListing.id);
    if (currentCardIndex < listings.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleIgnore = () => {
    console.log('Ignored:', currentListing.id);
    if (currentCardIndex < listings.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleViewProfile = () => {
    console.log('View profile for listing:', currentListing.id);
  };

  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const getFilterLabel = (filterType) => {
    const count = filters[filterType].length;
    if (count === 0) return filterType.charAt(0).toUpperCase() + filterType.slice(1, -1);
    return `${filterType.charAt(0).toUpperCase() + filterType.slice(1, -1)} (${count})`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900">
      <div className="w-full h-screen max-w-sm bg-white flex flex-col relative">
        
        {/* Header with Filters */}
        <div className="bg-white border-b border-gray-200 p-3 relative">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'size' ? null : 'size')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap"
            >
              {getFilterLabel('sizes')} <ChevronDown className="w-3 h-3" />
            </button>
            
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'distance' ? null : 'distance')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap"
            >
              Distance <ChevronDown className="w-3 h-3" />
            </button>
            
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'style' ? null : 'style')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap"
            >
              {getFilterLabel('styleTypes')} <ChevronDown className="w-3 h-3" />
            </button>
            
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap"
            >
              {getFilterLabel('articleTypes')} <ChevronDown className="w-3 h-3" />
            </button>
            
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'colour' ? null : 'colour')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap"
            >
              {getFilterLabel('colours')} <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Dropdown Menus */}
          {activeDropdown === 'size' && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 max-h-64 overflow-y-auto mt-1">
              <div className="p-3">
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleFilter('sizes', size)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        filters.sizes.includes(size)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeDropdown === 'type' && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 max-h-96 overflow-y-auto mt-1">
              <div className="p-3">
                {Object.keys(articleTypeOptions).map(category => (
                  <div key={category} className="mb-4 last:mb-0">
                    <h3 className="text-xs font-semibold text-gray-900 mb-2 px-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {articleTypeOptions[category].map(subtype => (
                        <button
                          key={subtype}
                          onClick={() => toggleFilter('articleTypes', subtype)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            filters.articleTypes.includes(subtype)
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {subtype}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeDropdown === 'style' && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 max-h-64 overflow-y-auto mt-1">
              <div className="p-3">
                <div className="flex flex-wrap gap-2">
                  {styleTypeOptions.map(style => (
                    <button
                      key={style}
                      onClick={() => toggleFilter('styleTypes', style)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        filters.styleTypes.includes(style)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeDropdown === 'distance' && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 mt-1">
              <div className="p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance: {filters.distance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={filters.distance}
                  onChange={(e) => setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activeDropdown === 'colour' && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50 max-h-64 overflow-y-auto mt-1">
              <div className="p-3">
                <div className="flex flex-wrap gap-2">
                  {colourOptions.map(colour => (
                    <button
                      key={colour}
                      onClick={() => toggleFilter('colours', colour)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        filters.colours.includes(colour)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {colour}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content - Scrollable Card */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {currentListing ? (
            <div className="bg-white p-4">
              {/* Listing Title */}
              <div className="mb-3">
                <h2 className="text-lg font-semibold">Brandy Melville Waldo Sweater</h2>
                {/* Size | Gender | Location */}
                <div className="text-sm text-gray-500 mt-0.5">
                  {currentListing.size} | {currentListing.gender} | {currentListing.location}
                </div>
              </div>
              
              {/* Main Photo */}
              <div className="w-full aspect-square mb-4">
                <img 
                  src={currentListing.mainPhoto} 
                  alt="Listing" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Content */}
              <div className="space-y-3">

                {/* Brand */}
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{currentListing.brand}</span>
                </div>

                {/* Quality */}
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span>{currentListing.quality}</span>
                </div>

                {/* Colour Tags */}
                <div className="flex gap-2 flex-wrap">
                  {currentListing.colours.map((colour, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: colour.toLowerCase() === 'red' ? '#fee2e2' : 
                                       colour.toLowerCase() === 'white' ? '#f3f4f6' :
                                       colour.toLowerCase() === 'navy' ? '#dbeafe' : '#f3f4f6',
                        color: colour.toLowerCase() === 'red' ? '#991b1b' : 
                               colour.toLowerCase() === 'white' ? '#1f2937' :
                               colour.toLowerCase() === 'navy' ? '#1e3a8a' : '#1f2937'
                      }}
                    >
                      {colour}
                    </span>
                  ))}
                </div>

                {/* Clothing Tags */}
                <div className="flex gap-2 flex-wrap">
                  {currentListing.clothingTags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Floating Action Buttons - Hinge Style */}
                <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6 px-4">
                  {/* Ignore Button */}
                  <button
                    onClick={handleIgnore}
                    className="w-16 h-16 bg-neutral-300 hover:bg-neutral-400 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  >
                    <X className="w-8 h-8 text-neutral-700" strokeWidth={3} />
                  </button>

                  {/* View Wardrobe Button */}
                  <button
                    onClick={handleViewProfile}
                    className="w-14 h-14 bg-neutral-200 hover:bg-neutral-300 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  >
                    <svg className="w-7 h-7 text-neutral-700" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M471.2 387.9L263.6 235.5c-3.5-2.6-7.7-4-12-4s-8.5 1.4-12 4L31.8 387.9C11.7 403.5 0 427.8 0 453.5c0 32.6 26.4 59 59 59h394c32.6 0 59-26.4 59-59 0-25.7-11.7-50-31.8-65.6z"/>
                    </svg>
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={handleLike}
                    className="w-16 h-16 bg-white hover:bg-neutral-50 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                  >
                    <Heart className="w-8 h-8 text-red-500" fill="currentColor" strokeWidth={0} />
                  </button>
                </div>
                {/* Details */}
                <div>
                  <h3 className="font-semibold text-sm mb-1">Details</h3>
                  <p className="text-sm text-gray-700">{currentListing.details}</p>
                </div>

                {/* Looking For */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Search className="w-4 h-4 text-gray-500" />
                    <h3 className="font-semibold text-sm">Looking for {currentListing.lookingFor}</h3>
                  </div>
                  {currentListing.additionalNote && (
                    <p className="text-sm text-gray-600 italic">{currentListing.additionalNote}</p>
                  )}
                </div>

                {/* Additional Photos */}
                {currentListing.additionalPhotos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {currentListing.additionalPhotos.map((photo, idx) => (
                      <div key={idx} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={photo} 
                          alt={`Additional ${idx + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No more listings</p>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default FeedPage;