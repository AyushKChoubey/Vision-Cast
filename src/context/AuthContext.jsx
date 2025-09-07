import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email, password) => {
    try {
      if (email && password) {
        const mockUser = {
          id: Date.now().toString(),
          email,
          firstName: email.split('@')[0],
          fullName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=FFD700&color=0F0F0F`,
          createdAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        return { success: true, user: mockUser };
      } else {
        throw new Error('Email and password are required');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email, password, firstName, lastName) => {
    try {
      if (email && password && firstName) {
        const mockUser = {
          id: Date.now().toString(),
          email,
          firstName,
          lastName: lastName || '',
          fullName: `${firstName} ${lastName || ''}`.trim(),
          imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + ' ' + (lastName || ''))}&background=FFD700&color=0F0F0F`,
          createdAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        return { success: true, user: mockUser };
      } else {
        throw new Error('Email, password, and first name are required');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const updateProfile = (profileData) => {
    if (user) {
      setUser({
        ...user,
        ...profileData,
        fullName: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || user.fullName
      });
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};