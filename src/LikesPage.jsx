import React, { useState, useEffect } from 'react';
import { Heart, X, MessageCircle, ExternalLink, MapPin, Tag, Users } from 'lucide-react';

const LIKES_API_URL = 'http://localhost:3000/api/likes/received';
const UPDATE_LIKE_URL = 'http://localhost:3000/api/likes';

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

const LikesPage = () => {
  const [activePage, setActivePage] = useState('likes');
  const [likes, setLikes] = useState([]);
  const [currentLikeIndex, setCurrentLikeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchLikes();
  }, [userId]);

  const fetchLikes = async () => {
    if (!userId) {
      setError('Not logged in');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${LIKES_API_URL}/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setLikes(data.likes);
      } else {
        setError(data.message || 'Failed to load likes');
      }
    } catch (err) {
      console.error('Fetch likes error:', err);
      setError('Could not connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    const currentLike = likes[currentLikeIndex];
    
    try {
      const response = await fetch(`${UPDATE_LIKE_URL}/${currentLike.id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        alert(`Match created with ${currentLike.userName}! Check your Matches.`);
        moveToNextLike();
      } else {
        alert('Failed to accept swap. Please try again.');
      }
    } catch (error) {
      console.error('Accept error:', error);
      alert('Could not connect to server.');
    }
  };

  const handleIgnore = async () => {
    const currentLike = likes[currentLikeIndex];
    
    try {
      const response = await fetch(`${UPDATE_LIKE_URL}/${currentLike.id}/ignore`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        moveToNextLike();
      } else {
        alert('Failed to ignore. Please try again.');
      }
    } catch (error) {
      console.error('Ignore error:', error);
      alert('Could not connect to server.');
    }
  };

  const moveToNextLike = () => {
    if (currentLikeIndex < likes.length - 1) {
      setCurrentLikeIndex(currentLikeIndex + 1);
    } else {
      // Refresh likes list
      setCurrentLikeIndex(0);
      fetchLikes();
    }
  };

  const handleMessage = () => {
    const currentLike = likes[currentLikeIndex];
    alert(`Opening chat with ${currentLike.userName}`);
  };

  const handleViewListing = () => {
    alert('Opening full listing details');
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page === 'profile') {
      window.location.href = '/profile';
    } else if (page === 'home') {
      window.location.href = '/feed';
    } else if (page === 'likes') {
      // Already on likes
      fetchLikes();
    } else if (page === 'matches') {
      window.location.href = '/matches';
    } else {
      alert(`${page} page coming soon!`);
    }
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="text-center text-white">
          <p className="mb-4">Please log in to view likes</p>
          <a href="/login" className="text-pink-500 font-bold">Go to Login</a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="text-white">Loading likes...</div>
      </div>
    );
  }

  const currentLike = likes[currentLikeIndex];

  if (!currentLike || likes.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="w-full h-full max-w-sm bg-white flex flex-col rounded-lg shadow-lg relative">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <Heart className="w-16 h-16 text-gray-300 mb-4 mx-auto" />
              <p className="text-gray-600 text-lg font-medium mb-2">No likes yet</p>
              <p className="text-gray-400 text-sm">Check back later!</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 rounded-b-lg overflow-hidden">
            <Footer activePage={activePage} onNavigate={handleNavigate} />
          </div>
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
              src={currentLike.coverImage || 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=300&fit=crop'} 
              alt={currentLike.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 right-3">
              <img 
                src={currentLike.profileImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'} 
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
                <p className="text-sm text-gray-600 mt-1">{currentLike.size} | {currentLike.location}</p>
                <p className="text-sm text-gray-500 mt-1">From: {currentLike.userName}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
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
            {currentLike.colors && currentLike.colors.length > 0 && (
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
            )}

            {/* Categories */}
            {currentLike.categories && currentLike.categories.length > 0 && (
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
            )}

            {/* Details */}
            {currentLike.details && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Details</h3>
                <p className="text-sm text-gray-700">{currentLike.details}</p>
              </div>
            )}

            {/* Looking For */}
            <div className="bg-blue-50 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Looking for</h3>
              <p className="text-sm text-gray-700">{currentLike.lookingFor}</p>
            </div>

            {/* Their Offer Message */}
            {currentLike.message && (
              <div className="bg-pink-50 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Message from {currentLike.userName}</h3>
                <p className="text-sm text-gray-700">{currentLike.message}</p>
              </div>
            )}

            {/* Offered Items */}
            {currentLike.offeredListings && currentLike.offeredListings.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">They're offering:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentLike.offeredListings.map((item) => (
                    <div key={item.id} className="relative">
                      <img 
                        src={item.image || 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop'} 
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg">
                        <p className="text-white text-xs font-semibold truncate">
                          {item.size} | {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
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
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 rounded-b-lg overflow-hidden">
          <Footer activePage={activePage} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

export default LikesPage;