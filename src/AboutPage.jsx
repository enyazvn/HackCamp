import React, { useState } from 'react';
import { Heart, X, ChevronDown, SlidersHorizontal } from 'lucide-react';

const FeedPage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    size: 'All',
    articleType: 'All',
    styleType: 'All',
    distance: 25,
    colour: 'All'
  });

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

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900">
      <div className="w-full h-screen max-w-sm bg-white flex flex-col relative">
        
        {/* Header with Filters */}
        <div className="bg-white border-b border-gray-200 p-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap">
              Size <ChevronDown className="w-3 h-3" />
            </button>
            
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap">
              Type <ChevronDown className="w-3 h-3" />
            </button>
            
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap">
              Style <ChevronDown className="w-3 h-3" />
            </button>
            
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap">
              Distance <ChevronDown className="w-3 h-3" />
            </button>
            
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-sm whitespace-nowrap">
              Colour <ChevronDown className="w-3 h-3" />
            </button>
          </div>
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
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <span className="font-medium">{currentListing.brand}</span>
                </div>

                {/* Quality */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
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

                {/* Details */}
                <div>
                  <h3 className="font-semibold text-sm mb-1">Details</h3>
                  <p className="text-sm text-gray-700">{currentListing.details}</p>
                </div>

                {/* Looking For */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
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

        {/* Bottom Action Buttons */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-center gap-6">
            {/* Ignore Button */}
            <button
              onClick={handleIgnore}
              className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-7 h-7 text-gray-600" />
            </button>

            {/* View Wardrobe Button */}
            <button
              onClick={handleViewProfile}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-7 h-7 text-gray-600" viewBox="0 0 512 512" fill="currentColor">
                <path d="M239.5 41.9c-9-16.6-29.6-23.5-47.4-15.9C144 48.1 104.5 96 104.5 152.8c0 13.3 10.8 24 24 24s24-10.7 24-24c0-31.8 21.9-58.6 51.3-66.1 14.5-3.7 23.2-18.5 19.4-33-1.2-4.6-3.4-8.7-6.4-12.2 7 1.1 13.7 4.2 19.1 9.2 7.5 7 13.7 15.8 17.6 25.5 3.4 8.5 10.4 15.4 19.1 18.8 10.8 4.2 23.1 2.7 32.4-4.1 5.8-4.3 10.1-10.3 12.3-17.3 2.2-7 2.2-14.6 0-21.6-4.4-14.1-11.7-27.2-21.5-38.3-9.8-11.1-21.9-20.2-35.3-26.5zm32 89.6c-1-2.5-2.2-4.9-3.7-7.1 2.5 3.9 4.5 8.2 5.7 12.6 2.5 9.4 2.3 19.4-1 28.7-3.3 9.3-9.3 17.4-17.3 23.2-12.5 9.1-28.8 11.4-43.2 5.5-11.6-4.5-21-13.7-25.5-25.5-5.2-13-11.9-25.2-20.2-36.2-8.2-11-18.1-21-29.2-29.2C119.6 92.6 96.5 83.3 72.3 80c-15.2-2.1-30.6-.3-45.2 5.2-14.6 5.5-28.2 14-39.6 24.8C-24.8 121.8-36 137.5-42.3 155c-6.3 17.5-8.8 36.3-7.2 55 1.6 18.7 7.2 37 16.5 53.5 9.3 16.5 22.3 31.2 37.8 43.2 15.5 12 33.3 20.3 52 24.3 18.7 4 38.1 3.5 56.8-1.5 18.7-5 36.3-14.2 51.8-26.8 15.5-12.6 28.8-28.6 39-46.8 10.2-18.2 17.2-38.5 20.5-59.5 3.3-21 2.8-42.6-1.5-63.5-4.3-20.9-12.3-41.1-23.5-59.5-11.2-18.4-25.5-35-42.2-48.5z"/>
                <path d="M471.2 387.9L263.6 235.5c-3.5-2.6-7.7-4-12-4s-8.5 1.4-12 4L31.8 387.9C11.7 403.5 0 427.8 0 453.5c0 32.6 26.4 59 59 59h394c32.6 0 59-26.4 59-59 0-25.7-11.7-50-31.8-65.6z"/>
              </svg>
            </button>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className="w-14 h-14 rounded-full bg-pink-500 flex items-center justify-center hover:bg-pink-600 transition-colors"
            >
              <Heart className="w-7 h-7 text-white fill-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;