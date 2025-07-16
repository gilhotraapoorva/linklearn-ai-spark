import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a mock user that matches Firebase User interface
const mockUser = {
  uid: 'anupam-fixed-uid',
  email: 'anupam@example.com',
  displayName: 'Anupam',
  phoneNumber: null,
  photoURL: null,
  providerId: 'firebase',
  // Add other required User interface properties with null/empty values
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => '',
  getIdTokenResult: async () => ({ token: '', claims: {}, signInProvider: '', expirationTime: '', issuedAtTime: '', authTime: '' }),
  reload: async () => {},
  toJSON: () => ({})
} as User; // Type assertion to User

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always provide the mock user
  const [user, setUser] = useState<User | null>(mockUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
