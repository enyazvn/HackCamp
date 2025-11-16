import React, { useState, useEffect } from 'react';
import { Send, Check, X } from 'lucide-react';

const LISTINGS_API_URL = 'http://localhost:3000/api/listings/user';
const LIKES_API_URL = 'http://localhost:3000/api/likes';

const LikeActionPage = ({ targetListing, onBack, onSuccess }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');
  const [userItems, setUserItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserListings = async () => {
      if (!userId) {
        setError('Not logged in');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${LISTINGS_API_URL}/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUserItems(data.listings);
        } else {
          setError(data.message || 'Failed to load your items');
        }
      } catch (err) {
        console.error('Fetch listings error:', err);
        setError('Could not connect to server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserListings();
  }, [userId]);

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSendOffer = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to trade');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(LIKES_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likerUserId: parseInt(userId),
          targetListingId: targetListing.id,
          offeredListingIds: selectedItems,
          message: message || null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Offer sent successfully! 🎉');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        alert(data.message || 'Failed to send offer. Please try again.');
      }
    } catch (error) {
      console.error('Send offer error:', error);
      alert('Could not connect to server. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900">
        <div className="text-white">Loading your items...</div>
      </div>
    );
  }

  if (error || userItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900">
        <div className="w-full h-screen max-w-sm bg-white flex flex-col items-center justify-center p-8">
          <p className="text-gray-600 mb-4 text-center">
            {error || 'You need to create listings before you can make offers'}
          </p>
          <button
            onClick={() => window.location.href = '/add-listing'}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
          >
            Create a Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900">
      <div className="w-full h-screen max-w-sm bg-white flex flex-col">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-4 px-4 flex items-center">
          <button onClick={onBack} className="mr-3">
            <X className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center pr-9">Select Item(s) to Trade</h1>
        </div>

        {/* Target Listing Info */}
        <div className="bg-pink-50 border-b border-pink-100 px-4 py-3">
          <p className="text-sm text-gray-600">Trading for:</p>
          <p className="text-sm font-semibold text-gray-900 mt-0.5">
            {targetListing.listingName} ({targetListing.size})
          </p>
        </div>

        {/* Grid of Items */}
        <div className="flex-1 overflow-y-auto bg-white p-2">
          <div className="grid grid-cols-2 gap-2">
            {userItems.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItemSelection(item.id)}
                  className="relative w-full aspect-square rounded-lg overflow-hidden focus:outline-none"
                >
                  {/* Image */}
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop'} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark Overlay (shows when NOT selected) */}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  )}
                  
                  {/* Checkbox Circle */}
                  <div className={`absolute top-2 left-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected 
                      ? 'border-white bg-white' 
                      : 'border-white bg-transparent'
                  }`}>
                    {isSelected && (
                      <Check className="w-3 h-3 text-black" strokeWidth={3} />
                    )}
                  </div>

                  {/* Item Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold truncate">
                      {item.size} | {item.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selection Counter */}
        {selectedItems.length > 0 && (
          <div className="bg-pink-50 px-4 py-2 border-t border-pink-100">
            <p className="text-sm text-pink-700 font-medium text-center">
              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
            </p>
          </div>
        )}

        {/* Bottom Message Section */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional (Send a message)"
              disabled={isSending}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50"
            />
            <button
              onClick={handleSendOffer}
              disabled={isSending || selectedItems.length === 0}
              className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Send className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeActionPage;