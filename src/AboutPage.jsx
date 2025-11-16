import React, { useState } from 'react';
import { Heart, Users, ChevronLeft, MoreVertical, Send, Image } from 'lucide-react';

const MatchesPage = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const [matches] = useState([
    {
      id: 1,
      itemImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&h=200&fit=crop',
      itemTitle: 'Brandy Melville Waldo Sweater',
      size: 'XS',
      userName: 'Sarah',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      lastMessage: 'Hey! Would love to swap. When are you free to meet?',
      timestamp: '2m ago',
      unread: true,
      myListing: {
        itemImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop',
        itemTitle: 'North Face Puffer',
        size: 'M'
      },
      chatHistory: [
        {
          id: 1,
          sender: 'them',
          type: 'image',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          text: 'Love the sweater',
          timestamp: 'Yesterday 11:04PM'
        },
        {
          id: 2,
          sender: 'me',
          type: 'text',
          text: 'Thanks, love your jacket! Are you free to meet on Friday at Metrotown?',
          timestamp: 'Today 7:41AM',
          status: 'Sent'
        }
      ]
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
      unread: false,
      myListing: {
        itemImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop',
        itemTitle: 'Zara Leather Jacket',
        size: 'S'
      },
      chatHistory: [
        {
          id: 1,
          sender: 'me',
          type: 'text',
          text: 'Hi! Interested in swapping?',
          timestamp: 'Yesterday 3:20PM',
          status: 'Read'
        },
        {
          id: 2,
          sender: 'them',
          type: 'text',
          text: 'Perfect! I can meet at UBC tomorrow',
          timestamp: '1h ago'
        }
      ]
    }
  ]);

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  const handleBackToList = () => {
    setSelectedMatch(null);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      alert(`Sending: ${messageInput}`);
      setMessageInput('');
    }
  };

  // Chat View
  if (selectedMatch) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="w-full h-full max-w-sm bg-white flex flex-col rounded-lg shadow-lg relative">
          {/* Chat Header */}
          <div className="bg-white px-4 py-3 border-b border-gray-200 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button onClick={handleBackToList} className="p-1">
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate">
                  {selectedMatch.itemTitle}
                </h2>
                <p className="text-sm text-gray-500">{selectedMatch.size}</p>
              </div>
            </div>
            <button className="p-1">
              <MoreVertical className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          {/* Trade Info Bar */}
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
            <p className="text-xs text-gray-600 mb-2">Trading with {selectedMatch.userName}</p>
            <div className="flex items-center gap-3">
              {/* Their Item */}
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={selectedMatch.itemImage}
                  alt={selectedMatch.itemTitle}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    {selectedMatch.itemTitle}
                  </p>
                  <p className="text-xs text-gray-600">{selectedMatch.size}</p>
                </div>
              </div>

              {/* Swap Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
                <path d="M16 3l5 5-5 5M21 8H9"/>
                <path d="M8 21l-5-5 5-5M3 16h12"/>
              </svg>

              {/* My Item */}
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={selectedMatch.myListing.itemImage}
                  alt={selectedMatch.myListing.itemTitle}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    {selectedMatch.myListing.itemTitle}
                  </p>
                  <p className="text-xs text-gray-600">{selectedMatch.myListing.size}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {selectedMatch.chatHistory.map((message) => (
              <div key={message.id}>
                {/* Timestamp */}
                <div className="text-center mb-2">
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>

                {/* Message */}
                <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'them' && (
                    <img
                      src={selectedMatch.userAvatar}
                      alt={selectedMatch.userName}
                      className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
                    />
                  )}

                  <div className={`max-w-[70%] ${message.sender === 'me' ? 'ml-auto' : ''}`}>
                    {message.type === 'image' ? (
                      <div className="relative">
                        <img
                          src={message.image}
                          alt="Shared image"
                          className="rounded-lg w-full"
                        />
                        {message.text && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-lg">
                            <p className="text-white text-sm">{message.text}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'me'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    )}
                    {message.sender === 'me' && message.status && (
                      <p className="text-xs text-gray-400 text-right mt-1">{message.status}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 px-4 py-3 pb-20">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Image className="w-6 h-6" />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                <Send className="w-5 h-5" />
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

  // Matches List View
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
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
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
                    {match.unread && (
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    )}
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