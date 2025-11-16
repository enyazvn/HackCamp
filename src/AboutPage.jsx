import React, { useState } from 'react';
import { Heart, X, MessageCircle, ExternalLink, MapPin, Tag } from 'lucide-react';

// Footer Components
const FooterButton = ({title}) => {
  return (
    <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
      {title}
    </button>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-row gap-1.5 items-center justify-center bg-white border-t border-neutral-200 py-2">
        <FooterButton title={"Home"} />
        <FooterButton title={"Likes"} />
        <FooterButton title={"Matches"} />
        <FooterButton title={"Profile"} />
    </div>
  );
};

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
          <Heart className="w-16 h-16 text-neutral-300 mb-4" />
          <p className="text-neutral-600 text-lg font-medium">No likes yet</p>
          <p className="text-neutral-400 text-sm mt-2">Check back later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900">
      <div className="w-full h-full max-w-sm bg-white flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-neutral-200">
          <h1 className="text-xl font-bold text-neutral-900">Likes</h1>
          <p className="text-sm text-neutral-500">{likes.length} people interested</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
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
          <div className="p-4 space-y-4">
            {/* Title and Status */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-neutral-900">{currentLike.title}</h2>
                <p className="text-sm text-neutral-600 mt-1">{currentLike.size} | Woman | {currentLike.location}</p>
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
              <div className="flex items-center text-sm text-neutral-600">
                <Tag className="w-4 h-4 mr-2" />
                {currentLike.brand}
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <span className="mr-2">📦</span>
                {currentLike.condition}
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <MapPin className="w-4 h-4 mr-2" />
                {currentLike.location}
              </div>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-2">
              {currentLike.colors.map((color, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium"
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
                  className="px-3 py-1 bg-neutral-200 text-neutral-800 rounded-full text-xs font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Details */}
            <div className="bg-neutral-50 rounded-lg p-3">
              <h3 className="font-semibold text-neutral-900 text-sm mb-2">Details</h3>
              <p className="text-sm text-neutral-700">{currentLike.details}</p>
            </div>

            {/* Looking For */}
            <div className="bg-blue-50 rounded-lg p-3">
              <h3 className="font-semibold text-neutral-900 text-sm mb-2">Looking for</h3>
              <p className="text-sm text-neutral-700">{currentLike.lookingFor}</p>
              <p className="text-xs text-neutral-500 mt-1 italic">Open to shoes size 6!</p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="bg-white border-t border-neutral-200 p-4 space-y-3">
          {/* Primary Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleIgnore}
              className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              <X className="w-5 h-5" />
              Ignore
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
              Accept Swap
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleViewListing}
              className="flex-1 border-2 border-neutral-300 hover:border-neutral-400 text-neutral-900 font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              View Full Listing
            </button>
          </div>
          
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default LikesScreen;