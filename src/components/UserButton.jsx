import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserButton = () => {
  const { user, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState('menu'); // 'menu', 'profile', 'settings'
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    website: user?.website || '',
    location: user?.location || '',
  });
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      marketing: false,
      updates: true,
    },
    privacy: {
      profileVisible: true,
      showActivity: false,
      allowDirectMessages: true,
    },
    appearance: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC',
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveView('menu'); // Reset to menu view when closed
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
    setActiveView('menu');
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleBackToMenu = () => {
    setActiveView('menu');
  };

  const handleProfileSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (updateProfile) {
        updateProfile(profileData);
      }
      setActiveView('menu');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Save settings logic would go here
      setActiveView('menu');
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSettingsChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full border-2 border-[#FFD700] hover:border-[#FFA500] transition-colors"
      >
        <img
          src={user.imageUrl}
          alt={user.fullName}
          className="w-8 h-8 rounded-full"
        />
        <svg className={`w-4 h-4 text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[99]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-100 bg-[#1A1A1A] border border-[#333333] rounded-xl shadow-xl z-[100] max-h-[85vh] overflow-y-auto">
            
            {/* Main Menu View */}
            {activeView === 'menu' && (
              <>
                {/* User Info */}
                <div className="p-4 border-b border-[#333333]">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.imageUrl}
                      alt={user.fullName}
                      className="w-12 h-12 rounded-full border-2 border-[#FFD700]"
                    />
                    <div>
                      <p className="text-white font-semibold">{user.fullName}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-[#2A2A2A] transition-colors"
                    onClick={() => handleViewChange('profile')}
                  >
                    <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Profile</span>
                  </button>
                  
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-[#2A2A2A] transition-colors"
                    onClick={() => handleViewChange('settings')}
                  >
                    <svg className="w-5 h-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </button>
                  
                  <hr className="border-[#333333] my-2" />
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-400 hover:bg-[#2A2A2A] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-[#333333]">
                  <p className="text-xs text-gray-500 text-center">VisionCast v1.0</p>
                </div>
              </>
            )}

            {/* Profile View */}
            {activeView === 'profile' && (
              <>
                {/* Header */}
                <div className="p-4 border-b border-[#333333] flex items-center gap-3">
                  <button
                    onClick={handleBackToMenu}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="text-white font-semibold text-lg">Profile Settings</h3>
                </div>

                {/* Profile Content */}
                <div className="p-4 space-y-4">
                  {/* Profile Image */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.imageUrl}
                      alt={user.fullName}
                      className="w-16 h-16 rounded-full border-2 border-[#FFD700]"
                    />
                    <button className="text-[#FFD700] hover:text-[#FFA500] text-sm">
                      Change Photo
                    </button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700] resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={profileData.website}
                        onChange={handleInputChange}
                        className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleProfileSave}
                    disabled={loading}
                    className="w-full bg-[#FFD700] hover:bg-[#FFA500] text-black font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </>
            )}

            {/* Settings View */}
            {activeView === 'settings' && (
              <>
                {/* Header */}
                <div className="p-4 border-b border-[#333333] flex items-center gap-3">
                  <button
                    onClick={handleBackToMenu}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="text-white font-semibold text-lg">Settings</h3>
                </div>

                {/* Settings Content */}
                <div className="p-4 space-y-6">
                  {/* Notifications */}
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-4.5L15 17z M11 12l1-1 3 3" />
                      </svg>
                      Notifications
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(settings.notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <button
                            onClick={() => handleSettingsChange('notifications', key, !value)}
                            className={`w-10 h-6 rounded-full transition-colors ${
                              value ? 'bg-[#FFD700]' : 'bg-[#333333]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              value ? 'translate-x-5' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Privacy */}
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Privacy
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(settings.privacy).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <button
                            onClick={() => handleSettingsChange('privacy', key, !value)}
                            className={`w-10 h-6 rounded-full transition-colors ${
                              value ? 'bg-[#FFD700]' : 'bg-[#333333]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              value ? 'translate-x-5' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Appearance */}
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                      Appearance
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Theme</label>
                        <select
                          value={settings.appearance.theme}
                          onChange={(e) => handleSettingsChange('appearance', 'theme', e.target.value)}
                          className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Language</label>
                        <select
                          value={settings.appearance.language}
                          onChange={(e) => handleSettingsChange('appearance', 'language', e.target.value)}
                          className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#FFD700]"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSettingsSave}
                    disabled={loading}
                    className="w-full bg-[#FFD700] hover:bg-[#FFA500] text-black font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserButton;