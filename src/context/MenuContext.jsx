import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { FOOD_ITEMS } from '../data/menus';

const MenuContext = createContext();

const INITIAL_SELECTED_ITEMS = [
  { id: 'buf-1', name: 'West Coast Coastal Buffet', category: 'buffets' },
  { id: 'hho-1', name: 'Jumbo Prawns in Garlic & White Wine', category: 'hot-hors-doeuvres' },
  { id: 'plt-1', name: 'Grand Pacific Seafood Platter', category: 'platters' }
];

export const MenuProvider = ({ children }) => {
  const { showToast } = useApp();

  const [selectedItems, setSelectedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('owc_custom_menu');
      return saved ? JSON.parse(saved) : INITIAL_SELECTED_ITEMS;
    } catch {
      return INITIAL_SELECTED_ITEMS;
    }
  });

  const [menuTitle, setMenuTitle] = useState(() => {
    try {
      const saved = localStorage.getItem('owc_custom_menu_title');
      return saved || 'My Custom Event Menu';
    } catch {
      return 'My Custom Event Menu';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('owc_custom_menu', JSON.stringify(selectedItems));
    } catch (e) {
      console.error(e);
    }
  }, [selectedItems]);

  useEffect(() => {
    try {
      localStorage.setItem('owc_custom_menu_title', menuTitle);
    } catch (e) {
      console.error(e);
    }
  }, [menuTitle]);

  const addItemToMenu = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        showToast(`"${item.name}" is already in your custom menu`, 'info');
        return prev;
      }
      showToast(`Added "${item.name}" to your Custom Menu!`, 'success');
      return [...prev, { id: item.id, name: item.name, category: item.category, image: item.image }];
    });
  };

  const removeItemFromMenu = (itemId, itemName) => {
    setSelectedItems((prev) => {
      const updated = prev.filter((i) => i.id !== itemId);
      showToast(`Removed "${itemName || 'item'}" from custom menu`, 'info');
      return updated;
    });
  };

  const toggleItemInMenu = (item) => {
    if (selectedItems.some((i) => i.id === item.id)) {
      removeItemFromMenu(item.id, item.name);
    } else {
      addItemToMenu(item);
    }
  };

  const isItemInMenu = (itemId) => selectedItems.some((i) => i.id === itemId);

  const clearMenu = () => {
    setSelectedItems([]);
    showToast('Custom menu selections cleared', 'info');
  };

  const totalItemsCount = selectedItems.length;

  return (
    <MenuContext.Provider
      value={{
        selectedItems,
        menuTitle,
        setMenuTitle,
        addItemToMenu,
        removeItemFromMenu,
        toggleItemInMenu,
        isItemInMenu,
        clearMenu,
        totalItemsCount
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);

