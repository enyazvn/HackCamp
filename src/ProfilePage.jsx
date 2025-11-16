import React, { useState, useEffect } from 'react';
import { MapPin, Settings, ChevronLeft, Plus, LogOut } from 'lucide-react';

const PROFILE_API_URL = 'http://localhost:3000/api/profile';

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

const ProfilePage = () => {
  const [activePage, setActivePage] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError('Not logged in');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${PROFILE_API_URL}/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setProfile(data);
        } else {
          setError(data.message || 'Failed to load profile');
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Could not connect to server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page === 'profile') {
      // Already on profile, just refresh
      window.location.reload();
    } else if (page === 'home') {
      // Navigate to feed
      window.location.href = '/feed';
    } else if (page === 'likes') {
      // Navigate to likes
      window.location.href = '/likes';
    } else if (page === 'matches') {
      // Navigate to matches
      window.location.href = '/matches';
    } else {
      alert(`${page} page coming soon! Staying on profile.`);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userFirstname');
      window.location.href = '/login';
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status && status.toLowerCase();
    switch(statusLower) {
      case 'available':
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'sold':
        return 'bg-red-500';
      default:
        return 'bg-neutral-500';
    }
  };

  const getStatusLabel = (status) => {
    const statusLower = status && status.toLowerCase();
    if (statusLower === 'available') return 'Active';
    return status && status.charAt(0).toUpperCase() + status.slice(1) || 'Unknown';
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="text-center text-white">
          <p className="mb-4">Please log in to view your profile</p>
          <a href="/login" className="text-pink-500 font-bold">Go to Login</a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="text-center text-white">
          <p className="mb-4">{error || 'Profile not found'}</p>
          <a href="/login" className="text-pink-500 font-bold">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
      <div className="w-full h-full max-w-sm bg-white flex flex-col rounded-lg shadow-lg relative">
        <div className="bg-white px-4 py-3 border-b border-neutral-200 rounded-t-lg flex items-center justify-between">
          <button onClick={() => window.location.href = '/feed'} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-neutral-900" />
          </button>
          <h2 className="text-lg font-semibold text-neutral-900">Profile</h2>
          <div className="flex items-center gap-2">
            <button onClick={handleLogout} className="p-1 hover:bg-gray-100 rounded-lg transition-colors" title="Logout">
              <LogOut className="w-5 h-5 text-neutral-900" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors" title="Settings">
              <Settings className="w-5 h-5 text-neutral-900" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-16">
          <div className="relative">
            <img 
              src={profile.coverImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop'} 
              alt="Cover"
              className="w-full h-40 object-cover"
            />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <img 
                src={profile.profileImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'} 
                alt={profile.firstName}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
          </div>

          <div className="pt-14 px-4 space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-900">{profile.firstName}</h2>
              <div className="flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-neutral-600" />
                <span className="text-sm text-neutral-600">{profile.location}</span>
              </div>
            </div>

            {profile.sizing && profile.sizing.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-neutral-900 mb-2">Sizing</h3>
                <div className="flex gap-2 flex-wrap">
                  {profile.sizing.map((size, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.style && profile.style.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-neutral-900 mb-2">Style</h3>
                <div className="flex gap-2 flex-wrap">
                  {profile.style.map((styleTag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium"
                    >
                      {styleTag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-2">Preferred Meetup</h3>
              <p className="text-sm text-neutral-700">{profile.preferredMeetup}</p>
            </div>

            {profile.bio && (
              <div>
                <h3 className="text-sm font-bold text-neutral-900 mb-2">Bio</h3>
                <p className="text-sm text-neutral-700">{profile.bio}</p>
              </div>
            )}

            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-neutral-900">
                  My Listings ({profile.listingCount})
                </h3>
                <button 
                  onClick={() => window.location.href = '/add-listing'}
                  className="flex items-center gap-1 px-3 py-1.5 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {profile.listings.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">
                  <p className="mb-4">No listings yet</p>
                  <button 
                    onClick={() => window.location.href = '/add-listing'}
                    className="px-6 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
                  >
                    Create Your First Listing
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {profile.listings.map((listing) => (
                    <div key={listing.id} className="relative">
                      <img 
                        src={listing.image || 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop'} 
                        alt={listing.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg">
                        <p className="text-white text-xs font-semibold truncate">
                          {listing.size} | {listing.name}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={`w-2 h-2 rounded-full ${getStatusColor(listing.status)}`}></span>
                          <span className="text-white text-xs">{getStatusLabel(listing.status)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 rounded-b-lg overflow-hidden">
          <Footer activePage={activePage} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;