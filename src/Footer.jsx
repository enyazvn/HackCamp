import React from 'react';
import { Home, Heart, MessageCircle, User } from 'lucide-react';

const FooterButton = ({ title, active, onClick, icon: Icon }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-2 min-w-[60px] transition-colors ${
        active 
          ? 'text-pink-500' 
          : 'text-neutral-600'
      }`}
    >
      <Icon className={`w-6 h-6 mb-1 ${active ? 'stroke-2' : 'stroke-1.5'}`} />
      <span className={`text-xs ${active ? 'font-semibold' : 'font-normal'}`}>
        {title}
      </span>
    </button>
  );
};

const Footer = ({ activePage, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-sm bg-white border-t border-neutral-200 shadow-lg">
        <div className="flex flex-row items-center justify-around px-2">
          <FooterButton 
            title="Home" 
            icon={Home}
            active={activePage === 'home'}
            onClick={() => onNavigate('home')}
          />
          <FooterButton 
            title="Likes" 
            icon={Heart}
            active={activePage === 'likes'}
            onClick={() => onNavigate('likes')}
          />
          <FooterButton 
            title="Matches" 
            icon={MessageCircle}
            active={activePage === 'matches'}
            onClick={() => onNavigate('matches')}
          />
          <FooterButton 
            title="Profile" 
            icon={User}
            active={activePage === 'profile'}
            onClick={() => onNavigate('profile')}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;