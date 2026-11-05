import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApp } from './AppContext';

const FavoritesContext = createContext();

const INITIAL_FAVORITES = {
  foodItems: ['buf-1', 'fst-1', 'hho-1', 'cap-3', 'plt-1'],
  venues: ['ubc-boathouse', 'heritage-hall'],
  services: ['weddings', 'film']
};

export const FavoritesProvider = ({ children }) => {
  const { showToast } = useApp();

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('owc_favorites');
      return saved ? JSON.parse(saved) : INITIAL_FAVORITES;
    } catch {
      return INITIAL_FAVORITES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('owc_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavoriteItem = (itemId, itemName) => {
    setFavorites((prev) => {
      const exists = prev.foodItems.includes(itemId);
      const updated = exists
        ? prev.foodItems.filter((id) => id !== itemId)
        : [...prev.foodItems, itemId];

      showToast(
        exists
          ? `Removed "${itemName || 'item'}" from favorites`
          : `Saved "${itemName || 'item'}" to favorites!`,
        exists ? 'info' : 'success'
      );

      return { ...prev, foodItems: updated };
    });
  };

  const isItemFavorite = (itemId) => favorites.foodItems.includes(itemId);

  const toggleFavoriteVenue = (venueId, venueName) => {
    setFavorites((prev) => {
      const exists = prev.venues.includes(venueId);
      const updated = exists
        ? prev.venues.filter((id) => id !== venueId)
        : [...prev.venues, venueId];

      showToast(
        exists
          ? `Removed ${venueName || 'venue'} from saved venues`
          : `Saved ${venueName || 'venue'} to favorites!`,
        exists ? 'info' : 'success'
      );

      return { ...prev, venues: updated };
    });
  };

  const isVenueFavorite = (venueId) => favorites.venues.includes(venueId);

  const toggleFavoriteService = (serviceId, serviceName) => {
    setFavorites((prev) => {
      const exists = prev.services.includes(serviceId);
      const updated = exists
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId];

      showToast(
        exists
          ? `Removed ${serviceName || 'service'} from saved services`
          : `Saved ${serviceName || 'service'} to favorites!`,
        exists ? 'info' : 'success'
      );

      return { ...prev, services: updated };
    });
  };

  const isServiceFavorite = (serviceId) => favorites.services.includes(serviceId);

  const totalFavoritesCount =
    favorites.foodItems.length + favorites.venues.length + favorites.services.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavoriteItem,
        isItemFavorite,
        toggleFavoriteVenue,
        isVenueFavorite,
        toggleFavoriteService,
        isServiceFavorite,
        totalFavoritesCount
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

