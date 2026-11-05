# Ocean West Catering – Premium Mobile Application

[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

A modern, responsive, mobile-first catering application built for **Ocean West Catering** (Richmond & White Rock, British Columbia), based on verified business operations, menus, and services of Executive Chef Michael Thomas.

---

## 🌟 Key Features

* **Mobile-First Experience**: Centered smartphone viewport frame on desktop with ambient lighting, expanding seamlessly to 100% on native mobile devices.
* **Home Dashboard**:
  * Hero card with outer luminous glow, ambient spotlight shine, and quick quote triggers.
  * Executive chef highlights (25+ years experience, 25 to 1,200+ guests, 100% local BC ingredients).
  * 6 Signature catering services carousel.
  * British Columbia service area coverage hubs (Richmond base, White Rock HQ, Vancouver, film set mobile kitchens).
* **Food & Catering Catalog**:
  * 14 authentic culinary categories (Buffets, BBQ, Lunches, Seafood, First Courses, Hors d'oeuvres, Platters, etc.).
  * 2-cards-in-a-row responsive grid with dietary badges (*Ocean-Wise*, *Gluten-Free*, *Locally Sourced*).
  * Real-time item selection with active brand orange button states (`✓ Selected`).
  * Dish details bottom sheet modal.
* **Custom Event Menu Builder**:
  * Real-time course curation with editable menu title.
  * Uncluttered, readable food cards with portion scale (`Min 25 guests`).
  * Sticky summary pill bar and instant quote attachment.
* **Specialized Catering Divisions**:
  * Weddings & Receptions, Movie & Film Catering (Teamsters Union 155), Company Events & Galas, Private Parties, Summer & Fall BBQs, and Celebration of Life.
  * Compact, mobile-friendly cards with capacity badges and direct quote triggers.
* **4-Step Booking Inquiry Wizard**:
  * Event Details & Venue selection.
  * Guest count slider & catering service format.
  * Customer contact information.
  * Real-time review summary & inquiry confirmation with reference number.
* **Live Notification Center**:
  * Header bell button with live unread indicator dot.
  * Slide-up notifications drawer for Chef proposals, seasonal tastings, and peak date openings.
  * "Mark as Read", dismiss, and persistent `localStorage` support.
* **Saved & Favorites**:
  * Quick heart bookmarking across dishes, venues, and services.
  * Live badge counters synchronized with the bottom navigation bar.

---

## 🎨 Brand Design & 60/30/10 Color Palette

| Usage | Role | Hex Code | Visual Sample |
| :--- | :--- | :--- | :--- |
| **60% Primary Background** | Light surfaces, card bodies, app container | `#F0F0F0` | Marshmallow White |
| **30% Primary Brand** | Primary buttons, active tabs, header badge, brand highlights | `#4A2373` | Deep Galactic Violet |
| **10% Brand Accent** | Selected states, primary CTAs, notification badges, star ratings | `#FE8500` | Bubblegum Orange |

---

## 🛠️ Technology Stack

* **Framework**: React 19 (JavaScript JSX strictly – no TypeScript)
* **Build Tool**: Vite 8 with Hot Module Replacement (HMR)
* **Routing**: React Router DOM v7 (SPA with `vercel.json` rewrites)
* **Styling**: Tailwind CSS v4
* **Icons**: Lucide React
* **State Management**: React Context API (`AppContext`, `MenuContext`, `FavoritesContext`, `BookingContext`)
* **Persistence**: Web `localStorage` for offline session persistence

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+ installed on your machine.
* npm (bundled with Node.js) or yarn / pnpm.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/oceanwest-catering.git
   cd oceanwest-catering
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## ☁️ Deployment to Vercel

This repository includes a pre-configured `vercel.json` for seamless client-side routing on Vercel.

### Deploy with Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Deploy via GitHub (Recommended):
1. Push this project to a new GitHub repository.
2. Visit [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New"** > **"Project"**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **"Deploy"**.

---

## 📁 Project Structure

```
OceanWest/
├── public/                 # Static public assets
├── src/
│   ├── components/
│   │   ├── booking/        # 4-step event booking wizard components
│   │   ├── common/         # Button, Badge, Modal, BottomSheet, Toast, EmptyState
│   │   ├── home/           # Hero, Highlights, SignatureServices, ServiceAreas, etc.
│   │   ├── layout/         # Header, BottomNavigation, AppLayout
│   │   ├── menus/          # FoodItemCard, FoodDetailsModal, MenuSummaryBar
│   │   ├── notifications/  # NotificationsModal drawer
│   │   └── services/       # ServiceCard component
│   ├── context/            # AppContext, MenuContext, FavoritesContext, BookingContext
│   ├── data/               # Authentic menus, services, venues, FAQs data
│   ├── pages/              # Home, Menus, MenuBuilder, Services, Book, Favorites, etc.
│   ├── index.css           # Tailwind CSS imports & global styles
│   └── main.jsx            # React root mount & BrowserRouter
├── vercel.json             # Vercel SPA routing configuration
├── vite.config.js          # Vite & Tailwind configuration
├── package.json            # Project dependencies & build scripts
└── README.md
```

---

## 📞 Business Information

* **Business**: Ocean West Catering
* **Tagline**: RICHMOND • FINE CATERING
* **Executive Chef**: Michael Thomas
* **Affiliation**: Teamsters Union 155 (Movie & Film Productions)
* **Headquarters**: 842 Parker St, White Rock, BC V4B 4R2
* **Telephone**: (604) 722-4857
* **Website**: [oceanwestcatering.com](https://www.oceanwestcatering.com/)
