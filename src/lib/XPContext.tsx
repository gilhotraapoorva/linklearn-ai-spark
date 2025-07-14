import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

interface XPContextType {
  xp: number;
  level: number;
  xpToNextLevel: number;
  calculateLevel: (xp: number) => { level: number; xpToNextLevel: number };
}

const XPContext = createContext<XPContextType | undefined>(undefined);

// Calculate level and XP to next level based on total XP
const calculateLevel = (xp: number): { level: number; xpToNextLevel: number } => {
  let level = 1;
  let xpRequired = 1000; // Base XP for level 1
  let totalXpRequired = xpRequired;
  
  while (xp >= totalXpRequired) {
    level++;
    xpRequired = Math.floor(xpRequired * 1.2);
    totalXpRequired += xpRequired;
  }
  
  return {
    level,
    xpToNextLevel: totalXpRequired
  };
};

export const XPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [xpToNextLevel, setXPToNextLevel] = useState(1000);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const xpValue = data.xp || 0;
        const { level, xpToNextLevel } = calculateLevel(xpValue);
        
        setXP(xpValue);
        setLevel(level);
        setXPToNextLevel(xpToNextLevel);
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <XPContext.Provider value={{ xp, level, xpToNextLevel, calculateLevel }}>
      {children}
    </XPContext.Provider>
  );
};

export const useXP = () => {
  const context = useContext(XPContext);
  if (context === undefined) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
}; 