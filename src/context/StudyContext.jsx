import React, { createContext, useContext, useState, useEffect } from 'react';

const StudyContext = createContext();

export const useStudy = () => useContext(StudyContext);

const MOCK_PEERS = [
  { id: 'p1', name: 'Alex Rivera', subjects: ['React', 'JavaScript'], style: 'Visual', performance: 88, activeDays: 14 },
  { id: 'p2', name: 'Sam Chen', subjects: ['Data Structures', 'JavaScript'], style: 'Hands-on', performance: 92, activeDays: 19 },
  { id: 'p3', name: 'Priya Patel', subjects: ['React', 'CSS'], style: 'Theoretical', performance: 85, activeDays: 12 },
  { id: 'p4', name: 'Jordan Taylor', subjects: ['Mathematics', 'Logic Gates'], style: 'Visual', performance: 95, activeDays: 25 }
];

export const StudyProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('synapse_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('synapse_cards');
    return saved ? JSON.parse(saved) : [];
  });

  const [partner, setPartner] = useState(() => {
    const saved = localStorage.getItem('synapse_partner');
    return saved ? JSON.parse(saved) : null;
  });

  const [rewards, setRewards] = useState(() => Number(localStorage.getItem('synapse_rewards')) || 100);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('synapse_streak')) || 3);

  useEffect(() => {
    localStorage.setItem('synapse_user', user ? JSON.stringify(user) : '');
    localStorage.setItem('synapse_cards', JSON.stringify(cards));
    localStorage.setItem('synapse_partner', partner ? JSON.stringify(partner) : '');
    localStorage.setItem('synapse_rewards', rewards.toString());
    localStorage.setItem('synapse_streak', streak.toString());
  }, [user, cards, partner, rewards, streak]);

  const login = (username) => {
    setUser({ username, preferences: null });
  };

  const logout = () => {
    setUser(null);
    setPartner(null);
    setCards([]);
    setRewards(100);
    setStreak(0);
  };

  const savePreferences = (preferences) => {
    setUser(prev => ({ ...prev, preferences }));
  };

  const addCard = (keyword, info) => {
    const newCard = { id: crypto.randomUUID(), keyword, info };
    setCards(prevCards => [...prevCards, newCard]);
  };

  const addRewards = (amount) => setRewards(prev => prev + amount);

  const getRecommendedPartners = () => {
    if (!user?.preferences) return [];
    return MOCK_PEERS.map(peer => {
      const matchingSubjects = peer.subjects.filter(sub => user.preferences.subjects.includes(sub)).length;
      const matchingStyle = peer.style === user.preferences.style ? 1 : 0;
      const score = (matchingSubjects * 40) + (matchingStyle * 20);
      return { ...peer, matchScore: Math.min(score, 100) };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  return (
    <StudyContext.Provider value={{
      user, login, logout, savePreferences,
      cards, addCard, setCards,
      partner, setPartner,
      rewards, addRewards,
      streak, setStreak,
      getRecommendedPartners
    }}>
      {children}
    </StudyContext.Provider>
  );
};