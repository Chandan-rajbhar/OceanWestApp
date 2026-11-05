import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, Sparkles, Heart, CalendarCheck } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { useFavorites } from '../../context/FavoritesContext';

export const BottomNavigation = () => {
  const { totalItemsCount } = useMenu();
  const { totalFavoritesCount } = useFavorites();

  return (
    <nav className="shrink-0 z-40 w-full select-none bg-[#200D34] border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
      <div className="h-[62px] max-w-md mx-auto grid grid-cols-5 items-center px-1">
        
        {/* 1. Book */}
        <NavLink
          to="/book"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 transition-all duration-200 ${
              isActive ? 'text-[#FE8500]' : 'text-purple-200/60 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative flex items-center justify-center">
                <CalendarCheck
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 drop-shadow-[0_2px_8px_rgba(254,133,0,0.5)]' : ''
                  }`}
                />
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight ${
                  isActive ? 'font-black text-[#FE8500]' : 'font-medium'
                }`}
              >
                Book
              </span>
              <span
                className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${
                  isActive ? 'bg-[#FE8500]' : 'bg-transparent'
                }`}
              />
            </>
          )}
        </NavLink>

        {/* 2. Menus */}
        <NavLink
          to="/menus"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 transition-all duration-200 ${
              isActive ? 'text-[#FE8500]' : 'text-purple-200/60 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative flex items-center justify-center">
                <UtensilsCrossed
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 drop-shadow-[0_2px_8px_rgba(254,133,0,0.5)]' : ''
                  }`}
                />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-1 rounded-full bg-[#FE8500] text-white text-[8px] font-black flex items-center justify-center shadow-xs ring-1 ring-[#200D34]">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight ${
                  isActive ? 'font-black text-[#FE8500]' : 'font-medium'
                }`}
              >
                Menus
              </span>
              <span
                className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${
                  isActive ? 'bg-[#FE8500]' : 'bg-transparent'
                }`}
              />
            </>
          )}
        </NavLink>

        {/* 3. Home (Center) */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 transition-all duration-200 ${
              isActive ? 'text-[#FE8500]' : 'text-purple-200/60 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative flex items-center justify-center">
                <Home
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 drop-shadow-[0_2px_8px_rgba(254,133,0,0.5)]' : ''
                  }`}
                />
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight ${
                  isActive ? 'font-black text-[#FE8500]' : 'font-medium'
                }`}
              >
                Home
              </span>
              <span
                className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${
                  isActive ? 'bg-[#FE8500]' : 'bg-transparent'
                }`}
              />
            </>
          )}
        </NavLink>

        {/* 4. Services */}
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 transition-all duration-200 ${
              isActive ? 'text-[#FE8500]' : 'text-purple-200/60 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative flex items-center justify-center">
                <Sparkles
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 drop-shadow-[0_2px_8px_rgba(254,133,0,0.5)]' : ''
                  }`}
                />
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight ${
                  isActive ? 'font-black text-[#FE8500]' : 'font-medium'
                }`}
              >
                Services
              </span>
              <span
                className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${
                  isActive ? 'bg-[#FE8500]' : 'bg-transparent'
                }`}
              />
            </>
          )}
        </NavLink>

        {/* 5. Saved */}
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 transition-all duration-200 ${
              isActive ? 'text-[#FE8500]' : 'text-purple-200/60 hover:text-white'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative flex items-center justify-center">
                <Heart
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive
                      ? 'fill-[#FE8500] text-[#FE8500] scale-110 drop-shadow-[0_2px_8px_rgba(254,133,0,0.5)]'
                      : ''
                  }`}
                />
                {totalFavoritesCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-1 rounded-full bg-[#FE8500] text-white text-[8px] font-black flex items-center justify-center shadow-xs ring-1 ring-[#200D34]">
                    {totalFavoritesCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight ${
                  isActive ? 'font-black text-[#FE8500]' : 'font-medium'
                }`}
              >
                Saved
              </span>
              <span
                className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${
                  isActive ? 'bg-[#FE8500]' : 'bg-transparent'
                }`}
              />
            </>
          )}
        </NavLink>

      </div>
    </nav>
  );
};
