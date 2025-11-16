import React, { useState } from 'react';
import { Heart, X, MessageCircle, ExternalLink, MapPin, Tag, Users } from 'lucide-react';

const LikesScreen = () => {
  const [likes] = useState([
    {
      id: 1,
      coverImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=300&fit=crop',
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      title: 'Brandy Melville Waldo Sweater',
      size: 'XS, XXS',
      brand: 'Brandy Melville',
      condition: 'Used, Like New',
      colors: ['Red', 'White'],
      categories: ['Shirt', 'T-Shirt', 'Officewear'],
      status: 'Active',
      details: "Only worn once, getting rid of as I'm WFH",
      lookingFor: 'sweats, hoodies',
      location: 'Vancouver',
      userName: 'Sarah M.',
    },
    {
      id: 2,
      coverImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      title: 'Vintage Levi\'s Denim Jacket',
      size: 'M',
      brand: 'Levi\'s',
      condition: 'Used, Good',
      colors: ['Blue'],
      categories: ['Jacket', 'Denim', 'Casual'],
      status: 'Pending',
      details: 'Classic vintage fit, some distressing adds character',
      lookingFor: 'leather jackets, blazers',
      location: 'Vancouver',
      userName: 'Alex T.',
    }
  ]);

  const [currentLikeIndex, setCurrentLikeIndex] = useState(0);
  const currentLike = likes[currentLikeIndex];

  const handleAccept = () => {
    alert(`Starting conversation with ${currentLike.userName}!`);
    // Move to next like
    if (currentLikeIndex < likes.length - 1) {
      setCurrentLikeIndex(currentLikeIndex + 1);
    }
  };

  const handleIgnore = () => {
    // Move to next like
    if (currentLikeIndex < likes.length - 1) {
      setCurrentLikeIndex(currentLikeIndex + 1);
    } else {
      alert('No more likes to review!');
    }
  };

  const handleMessage = () => {
    alert(`Opening chat with ${currentLike.userName}`);
  };

  const handleViewListing = () => {
    alert('Opening full listing details');
  };

  if (!currentLike) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="w-full h-full max-w-sm bg-white flex flex-col items-center justify-center p-4">
          <Heart className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-gray-600 text-lg font-medium">No likes yet</p>
          <p className="text-gray-400 text-sm mt-2">Check back later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
      <div className="w-full h-full max-w-sm bg-white flex flex-col rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-200 rounded-t-lg">
          <h1 className="text-2xl font-bold text-gray-900">Likes</h1>
          <p className="text-sm text-gray-500 mt-1">{likes.length} people interested</p>
        </div>

        {/* Scrollable Content */}

        <div className="flex-1 overflow-y-auto pb-24">
          {/* Cover Image with Profile Picture */}
          <div className="relative">
            <img 
              src={currentLike.coverImage} 
              alt={currentLike.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 right-3">
              <img 
                src={currentLike.profileImage} 
                alt={currentLike.userName}
                className="w-16 h-16 rounded-full border-2 border-white shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Item Details */}
          <div className="px-6 py-6 space-y-6">
            {/* Title and Status */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{currentLike.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{currentLike.size} | Woman | {currentLike.location}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                currentLike.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {currentLike.status}
              </span>
            </div>

            {/* Brand and Condition */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Tag className="w-4 h-4 mr-2" />
                {currentLike.brand}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📦</span>
                {currentLike.condition}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {currentLike.location}
              </div>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-2">
              {currentLike.colors.map((color, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {color}
                </span>
              ))}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {currentLike.categories.map((category, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Details */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Details</h3>
              <p className="text-sm text-gray-700">{currentLike.details}</p>
            </div>

            {/* Looking For */}
            <div className="bg-blue-50 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Looking for</h3>
              <p className="text-sm text-gray-700">{currentLike.lookingFor}</p>
              <p className="text-xs text-gray-500 mt-1 italic">Open to shoes size 6!</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {/* Primary Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleIgnore}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Ignore
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-1 transition-colors"
                >
                  <Heart className="w-5 h-5" fill="currentColor" />
                  Accept Swap
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleViewListing}
                  className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  View Full Listing
                </button>
              </div>
            </div>
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
};

export default LikesScreen;