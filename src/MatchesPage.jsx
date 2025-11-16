import React, { useState, useEffect } from 'react';
import { Heart, Users, ChevronLeft, MoreVertical, Send, Image } from 'lucide-react';
import Footer from './Footer';

const MATCHES_API_URL = 'http://localhost:3000/api/matches';

const MatchesPage = () => {
  const [activePage, setActivePage] = useState('matches');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [matches, setMatches] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMatchActions, setShowMatchActions] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchMatches();
  }, [userId]);

  const fetchMatches = async () => {
    if (!userId) {
      setError('Not logged in');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${MATCHES_API_URL}/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setMatches(data.matches);
      } else {
        setError(data.message || 'Failed to load matches');
      }
    } catch (err) {
      console.error('Fetch matches error:', err);
      setError('Could not connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChatHistory = async (matchId) => {
    try {
      const response = await fetch(`${MATCHES_API_URL}/${matchId}/messages`);
      const data = await response.json();

      if (response.ok) {
        const formattedMessages = data.messages.map(msg => ({
          id: msg.id,
          sender: msg.sender === parseInt(userId) ? 'me' : 'them',
          type: msg.type || 'text',
          text: msg.text,
          image: msg.image,
          timestamp: formatTimestamp(msg.timestamp),
          status: msg.status
        }));
        setChatHistory(formattedMessages);
      }
    } catch (err) {
      console.error('Fetch messages error:', err);
    }
  };

  const formatTimestamp = (timestamp) => {
    // For demo purposes, always show "1m ago"
    return '1m ago';
  };

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    fetchChatHistory(match.id);
  };

  const handleBackToList = () => {
    setSelectedMatch(null);
    setChatHistory([]);
    setShowMatchActions(false);
  };

  const handleCompleteMatch = async () => {
    if (!selectedMatch) return;

    if (confirm('Mark this swap as complete? This will remove it from your matches.')) {
      try {
        const response = await fetch(`${MATCHES_API_URL}/${selectedMatch.id}/complete`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          alert('Match marked as complete! 🎉');
          setShowMatchActions(false);
          handleBackToList();
          fetchMatches();
        } else {
          alert('Failed to complete match. Please try again.');
        }
      } catch (error) {
        console.error('Complete match error:', error);
        alert('Could not connect to server.');
      }
    }
  };

  const handleCancelMatch = async () => {
    if (!selectedMatch) return;

    if (confirm('Cancel this match? This action cannot be undone.')) {
      try {
        const response = await fetch(`${MATCHES_API_URL}/${selectedMatch.id}/cancel`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          alert('Match cancelled.');
          setShowMatchActions(false);
          handleBackToList();
          fetchMatches();
        } else {
          alert('Failed to cancel match. Please try again.');
        }
      } catch (error) {
        console.error('Cancel match error:', error);
        alert('Could not connect to server.');
      }
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedMatch) {
      try {
        const response = await fetch(`${MATCHES_API_URL}/${selectedMatch.id}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: parseInt(userId),
            messageContent: messageInput,
            messageType: 'text'
          }),
        });

        if (response.ok) {
          const newMessage = {
            id: Date.now(),
            sender: 'me',
            type: 'text',
            text: messageInput,
            timestamp: 'Just now',
            status: 'Sent'
          };
          setChatHistory([...chatHistory, newMessage]);
          setMessageInput('');
        } else {
          alert('Failed to send message');
        }
      } catch (error) {
        console.error('Send message error:', error);
        alert('Could not send message');
      }
    }
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page === 'profile') {
      window.location.href = '/profile';
    } else if (page === 'home') {
      window.location.href = '/feed';
    } else if (page === 'likes') {
      window.location.href = '/likes';
    } else if (page === 'matches') {
      fetchMatches();
    }
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="text-center text-white">
          <p className="mb-4">Please log in to view matches</p>
          <a href="/login" className="text-pink-500 font-bold">Go to Login</a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-neutral-900">
        <div className="text-white">Loading matches...</div>
      </div>
    );
  }

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
            <div className="relative">
              <button 
                onClick={() => setShowMatchActions(!showMatchActions)}
                className="p-1"
              >
                <MoreVertical className="w-6 h-6 text-gray-900" />
              </button>
              
              {/* Actions Dropdown */}
              {showMatchActions && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <button
                    onClick={handleCompleteMatch}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    ✓ Mark as Complete
                  </button>
                  <button
                    onClick={handleCancelMatch}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    ✕ Cancel Match
                  </button>
                </div>
              )}
            </div>
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
            {chatHistory.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-sm">Start the conversation!</p>
              </div>
            ) : (
              chatHistory.map((message) => (
                <div key={message.id}>
                  {/* Timestamp */}
                  <div className="text-center mb-2">
                    <span className="text-xs text-gray-400">1m ago</span>
                  </div>

                  {/* Message */}
                  <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    {message.sender === 'them' && (
                      <img
                        src={selectedMatch.userAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
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
              ))
            )}
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

          <Footer activePage={activePage} onNavigate={handleNavigate} />
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
                Accept likes to start conversations!
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
                      src={match.userAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
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

        <Footer activePage={activePage} onNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default MatchesPage;