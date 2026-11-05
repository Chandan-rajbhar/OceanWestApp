import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { MenuProvider } from './context/MenuContext';
import { BookingProvider } from './context/BookingContext';
import { AppLayout } from './components/layout/AppLayout';

import { Home } from './pages/Home';
import { Menus } from './pages/Menus';
import { MenuBuilder } from './pages/MenuBuilder';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Booking } from './pages/Booking';
import { Events } from './pages/Events';
import { Venues } from './pages/Venues';
import { Favorites } from './pages/Favorites';
import { Reviews } from './pages/Reviews';
import { Profile } from './pages/Profile';
import { Contact } from './pages/Contact';
import { Notifications } from './pages/Notifications';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <FavoritesProvider>
          <MenuProvider>
            <BookingProvider>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Home />} />
                  <Route path="menus" element={<Menus />} />
                  <Route path="menu-builder" element={<MenuBuilder />} />
                  <Route path="services" element={<Services />} />
                  <Route path="services/:id" element={<ServiceDetail />} />
                  <Route path="book" element={<Booking />} />
                  <Route path="events" element={<Events />} />
                  <Route path="venues" element={<Venues />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </BookingProvider>
          </MenuProvider>
        </FavoritesProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
