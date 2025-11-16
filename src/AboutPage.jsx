import React, { useState } from 'react';
import { MapPin, Settings, ChevronLeft } from 'lucide-react';

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

const ProfilePage = () => {
  const [activePage, setActivePage] = useState('profile');
  
  const profile = {
    firstName: 'Rae Lene',
    location: 'Vancouver',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
    sizing: ['XS', 'S'],
    style: ['Y2K', 'Officewear'],
    preferredMeetup: 'ubc, skytrain, etc.',
    bio: 'Looking for sweaters please! Happy to bundle',
    listings: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop',
        size: 'XS',
        name: 'Brandy Melville Waldo...',
        status: 'Active'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop',
        size: 'XS',
        name: 'Brandy Melville Waldo...',
        status: 'Active'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop',
        size: 'XS',
        name: 'Brandy Melville Waldo...',
        status: 'Active'
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop',
        size: 'XS',
        name: 'Brandy Melville Waldo...',
        status: 'Pending'
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop',
        size: 'XS',
        name: 'Brandy Melville Waldo...',
        status: 'Sold'
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop',
        size: 'XS',
        name: 'Brandy Melville Waldo...',
        status: 'Active'
      }
    ]
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    alert(`Navigating to ${page}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-green-500';
      case 'Pending':
        return 'bg-yellow-500';
      case 'Sold':
        return 'bg-red-500';
      default:
        return 'bg-neutral-500';
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
      <div className="w-full h-full max-w-sm bg-white flex flex-col rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-neutral-200 rounded-t-lg flex items-center justify-between">
          <button className="p-1">
            <ChevronLeft className="w-6 h-6 text-neutral-900" />
          </button>
          <button className="p-1">
            <Settings className="w-6 h-6 text-neutral-900" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Cover Image with Profile Picture */}
          <div className="relative">
            <img 
              src={profile.coverImage} 
              alt="Cover"
              className="w-full h-40 object-cover"
            />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <img 
                src={profile.profileImage} 
                alt={profile.firstName}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-14 px-4 space-y-4">
            {/* Name and Location */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-900">{profile.firstName}</h2>
              <div className="flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-neutral-600" />
                <span className="text-sm text-neutral-600">{profile.location}</span>
              </div>
            </div>

            {/* Sizing */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-2">Sizing</h3>
              <div className="flex gap-2">
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

            {/* Style */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-2">Style</h3>
              <div className="flex gap-2">
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

            {/* Preferred Meetup */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-2">Preferred Meetup</h3>
              <p className="text-sm text-neutral-700">{profile.preferredMeetup}</p>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-2">Bio</h3>
              <p className="text-sm text-neutral-700">{profile.bio}</p>
            </div>

            {/* Listings Grid */}
            <div className="pt-4">
              <div className="grid grid-cols-2 gap-3">
                {profile.listings.map((listing) => (
                  <div key={listing.id} className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {/* Overlay with listing info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b-lg">
                      <p className="text-white text-xs font-semibold">{listing.size} | {listing.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(listing.status)}`}></span>
                        <span className="text-white text-xs">{listing.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation - Fixed at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 rounded-b-lg overflow-hidden">
          <Footer activePage={activePage} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;