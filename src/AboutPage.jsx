import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

const LikeActionPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');

  // Sample user's closet items
  const userItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      name: 'Red Striped Sweater'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      name: 'Red Striped Sweater'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      name: 'Red Striped Sweater'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      name: 'Red Striped Sweater'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      name: 'Red Striped Sweater'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      name: 'Red Striped Sweater'
    }
  ];

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSendOffer = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to trade');
      return;
    }

    console.log('Sending offer with items:', selectedItems);
    console.log('Message:', message);
    
    // This would navigate to the Likes section in the actual app
    alert('Offer sent! This will appear in the Likes section.');
    
    // Reset
    setSelectedItems([]);
    setMessage('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900">
      <div className="w-full h-screen max-w-sm bg-white flex flex-col">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-4 px-4">
          <h1 className="text-lg font-semibold text-center">Select Item(s) to Trade</h1>
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
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark Overlay (shows when NOT selected) */}
                  {!isSelected && (
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  )}
                  
                  {/* Checkbox Circle */}
                  <div className="absolute top-2 left-2 w-5 h-5 rounded-full border-2 border-white bg-white flex items-center justify-center">
                    {isSelected && (
                      <Check className="w-3 h-3 text-black" strokeWidth={3} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Message Section */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional (Send a message)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <button
              onClick={handleSendOffer}
              className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <Send className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-black border-t border-gray-800">
          <div className="flex justify-around items-center px-4 py-2">
            <button className="flex flex-col items-center justify-center py-2 min-w-[60px]">
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M16 3l5 5-5 5M21 8H9"/>
                  <path d="M8 21l-5-5 5-5M3 16h12"/>
                </svg>
              </div>
              <span className="text-xs text-gray-400">Home</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 min-w-[60px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white mb-1">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="text-xs text-white font-semibold">Likes</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 min-w-[60px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-1">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span className="text-xs text-gray-400">Matches</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 min-w-[60px]">
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-gray-400"></div>
              </div>
              <span className="text-xs text-gray-400">Profile</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LikeActionPage;