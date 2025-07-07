import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Stop } from '../types';

interface FavoritesContextType {
  favorites: Stop[];
  addFavorite: (stop: Stop) => void;
  removeFavorite: (stopId: number) => void;
  isFavorite: (stopId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Stop[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('localWanderFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('localWanderFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (stop: Stop) => {
    setFavorites(prev => {
      if (!prev.some(fav => fav.id === stop.id)) {
        return [...prev, stop];
      }
      return prev;
    });
  };

  const removeFavorite = (stopId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== stopId));
  };

  const isFavorite = (stopId: number) => {
    return favorites.some(fav => fav.id === stopId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
