import React, { useState } from 'react';
import { Heart, Users, MessageCircle } from 'lucide-react';

const MatchesPage = () => {
  const [matches] = useState([
    {
      id: 1,
      itemImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&h=200&fit=crop',
      itemTitle: 'Brandy Melville Waldo Sweater',
      size: 'XS',
      firstName: 'Sarah',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      lastMessage: 'Hey! Would love to swap. When are you free to meet?',
      timestamp: '2m ago',
      unread: true
    },
    {
      id: 2,
      itemImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop',
      itemTitle: 'Vintage Levi\'s Denim Jacket',
      size: 'M',
      userName: 'Alex',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      lastMessage: 'Perfect! I can meet at UBC tomorrow',
      timestamp: '1h ago',
      unread: false
    },
    {
      id: 3,
      itemImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop',
      itemTitle: 'Aritzia Super Puff Jacket',
      size: 'S',
      userName: 'Emma',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      lastMessage: 'Thanks for accepting! Looking forward to it',
      timestamp: '3h ago',
      unread: false
    },
    {
      id: 4,
      itemImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop',
      itemTitle: 'Zara Knit Sweater',
      size: 'M',
      userName: 'Olivia',
      userAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
      lastMessage: 'Is this still available?',
      timestamp: '1d ago',
      unread: false
    }
  ]);

  const handleMatchClick = (match) => {
    alert(`Opening chat with ${match.userName} about ${match.itemTitle}`);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
      <div className="w-full h-full max-w-sm bg-white flex flex-col rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-200 rounded-t-lg">
          <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
          <p className="text-sm text-gray-500 mt-1">{matches.length} active conversations</p>
        </div>

        {/* Scrollable Matches List */}
        <div className="flex-1 overflow-y-auto pb-16">
          {matches.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6">
              <Users className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg font-medium">No matches yet</p>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Start swiping to find items you love!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {matches.map((match) => (
                <button
                  key={match.id}
                  onClick={() => handleMatchClick(match)}
                  className="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
                >
                  {/* Item Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={match.itemImage}
                      alt={match.itemTitle}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    {/* User Avatar Overlay */}
                    <img
                      src={match.userAvatar}
                      alt={match.userName}
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Item Title and Size */}
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm semi-bold text-gray-900 truncate">
                        {match.itemTitle}
                      </h3>
                      <span className="text-sm text-gray-500 flex-shrink-0">
                        {match.size}
                      </span>
                    </div>

                    {/* User Name */}
                    <p className="text-xs text-gray-600 mb-1">{match.userName}</p>

                    {/* Last Message */}
                    <p className={`text-sm truncate ${
                      match.unread ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}>
                      {match.lastMessage}
                    </p>
                  </div>

                  {/* Timestamp and Indicator */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">{match.timestamp}</span>
                    {match.unread}
                  </div>
                </button>
              ))}
            </div>
          )}
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

export default MatchesPage;