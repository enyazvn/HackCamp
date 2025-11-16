import React, { useState, useEffect } from 'react';
import { Heart, X, ChevronDown, SlidersHorizontal, Tag, Package, Search, MapPin } from 'lucide-react';
import LikeActionPage from './LikeActionPage';

const FEED_API_URL = 'http://localhost:3000/api/feed';

// Footer Components
const FooterButton = ({ title, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        active 
          ? 'text-pink-500 font-bold' 
          : 'text-neutral-600 hover:text-neutral-900'
      }`}
    >
      {title}
    </button>
  );
};

const Footer = ({ activePage, onNavigate }) => {
  return (
    <div className="flex flex-row gap-1.5 items-center justify-center bg-white border-t border-neutral-200 py-2">
      <FooterButton 
        title="Home" 
        active={activePage === 'home'}
        onClick={() => onNavigate('home')}
      />
      <FooterButton 
        title="Likes" 
        active={activePage === 'likes'}
        onClick={() => onNavigate('likes')}
      />
      <FooterButton 
        title="Matches" 
        active={activePage === 'matches'}
        onClick={() => onNavigate('matches')}
      />
      <FooterButton 
        title="Profile" 
        active={activePage === 'profile'}
        onClick={() => onNavigate('profile')}
      />
    </div>
  );
};

const FeedPage = () => {
  const [activePage, setActivePage] = useState('home');
  const [currentListing, setCurrentListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLikeAction, setShowLikeAction] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filters, setFilters] = useState({
    sizes: [],
    articleTypes: [],
    styleTypes: [],
    distance: 25,
    colours: []
  });

  const userId = localStorage.getItem('userId');

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

  // Fetch a listing from the feed
  const fetchFeedListing = async () => {
    if (!userId) {
      setError('Not logged in');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${FEED_API_URL}/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setCurrentListing(data);
      } else {
        setError(data.message || 'No listings available');
      }
    } catch (err) {
      console.error('Feed fetch error:', err);
      setError('Could not connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedListing();
  }, [userId]);

  const handleLike = () => {
    setShowLikeAction(true);
  };

  const handleIgnore = () => {
    console.log('Ignored:', currentListing.id);
    fetchFeedListing(); // Load next listing
  };

  const handleViewProfile = () => {
    console.log('View profile for user:', currentListing.ownerId);
    // TODO: Navigate to user profile page
  };

  const handleLikeActionBack = () => {
    setShowLikeAction(false);
  };

  const handleLikeActionSuccess = () => {
    setShowLikeAction(false);
    fetchFeedListing(); // Load next listing
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page === 'profile') {
      window.location.href = '/profile';
    } else if (page === 'home') {
      // Already on feed
      fetchFeedListing();
    } else if (page === 'likes') {
      window.location.href = '/likes';
    } else if (page === 'matches') {
      window.location.href = '/matches';
    } else {
      alert(`${page} page coming soon!`);
    }
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

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="text-center text-white">
          <p className="mb-4">Please log in to view the feed</p>
          <a href="/login" className="text-pink-500 font-bold">Go to Login</a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="text-white">Loading feed...</div>
      </div>
    );
  }

  if (error || !currentListing) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="w-full h-full max-w-sm bg-white flex flex-col rounded-lg shadow-lg relative">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-gray-600 mb-4">{error || 'No more listings available'}</p>
              <button
                onClick={fetchFeedListing}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Refresh Feed
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 rounded-b-lg overflow-hidden">
            <Footer activePage={activePage} onNavigate={handleNavigate} />
          </div>
        </div>
      </div>
    );
  }

  if (showLikeAction) {
    return (
      <LikeActionPage 
        targetListing={currentListing}
        onBack={handleLikeActionBack}
        onSuccess={handleLikeActionSuccess}
      />
    );
  }

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
        <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
          <div className="bg-white p-4">
            {/* Listing Title */}
            <div className="mb-3">
              <h2 className="text-lg font-semibold">{currentListing.listingName}</h2>
              {/* Size | Gender | Location */}
              <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                <span>{currentListing.size}</span>
                <span>|</span>
                <span>{currentListing.gender}</span>
                <span>|</span>
                <MapPin className="w-3 h-3" />
                <span>{currentListing.location}</span>
              </div>
            </div>
            
            {/* Main Photo */}
            <div className="w-full aspect-square mb-4">
              <img 
                src={currentListing.mainPhoto || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'} 
                alt="Listing" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Content */}
            <div className="space-y-3">

              {/* Brand */}
              {currentListing.brand && currentListing.brand !== 'Not specified' && (
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{currentListing.brand}</span>
                </div>
              )}

              {/* Quality */}
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-gray-500" />
                <span className="capitalize">{currentListing.quality}</span>
              </div>

              {/* Colour Tags */}
              {currentListing.colours && currentListing.colours.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {currentListing.colours.map((colour, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
                    >
                      {colour}
                    </span>
                  ))}
                </div>
              )}

              {/* Clothing Tags */}
              {currentListing.clothingTags && currentListing.clothingTags.length > 0 && (
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
              )}

              {/* Style Tags */}
              {currentListing.styleTags && currentListing.styleTags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {currentListing.styleTags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-pink-50 rounded-full text-xs font-medium text-pink-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Details */}
              {currentListing.details && (
                <div>
                  <h3 className="font-semibold text-sm mb-1">Details</h3>
                  <p className="text-sm text-gray-700">{currentListing.details}</p>
                </div>
              )}

              {/* Looking For */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Search className="w-4 h-4 text-gray-500" />
                  <h3 className="font-semibold text-sm">Looking for: {currentListing.lookingFor}</h3>
                </div>
              </div>

              {/* Additional Photos */}
              {currentListing.additionalPhotos && currentListing.additionalPhotos.length > 0 && (
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
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center gap-6 px-4">
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

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 rounded-b-lg overflow-hidden">
          <Footer activePage={activePage} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;