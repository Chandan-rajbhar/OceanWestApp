# Ocean West Catering - Mobile-First Web Application

An artisanal, mobile-first web application for **Ocean West Catering**, recreating the culinary and film craft experience founded by Executive Chef Michael Thomas in British Columbia.

---

## Highlights & Architecture

- **Desktop Realistic Device Mockup**: When viewed on desktop browsers, the app renders inside a realistic mobile phone frame with a hardware bezel, dynamic island camera notch, live status bar (time, battery, wifi, cellular), and vertical touch scroll container. Includes an optional toggle to expand to full browser width.
- **Mobile Responsive Viewport**: On actual mobile devices (`<= 600px`), the outer mockup bezel and margins disappear automatically so the app seamlessly occupies 100% of the mobile screen.
- **Pacific Northwest Brand Identity**: Warm ivory (`#FAF8F5`), deep evergreen (`#192720`), and muted gold accents (`#BA8D5B`), paired with Cormorant Garamond / Playfair Display serif headings and Plus Jakarta Sans body typography.
- **Pure Client-Side React 19 + Vite**: Fast, clean architecture with React Router 7, modular components, and lucide-react icons.

---

## Page Routes

1. **Home (`/`)**: Brand introduction, chef highlight, automated rotating showcase of 5 signature dishes (4-second cycle with pause/play toggle and reduced-motion support), 4 key credentials, quick event planner trigger, discipline preview cards, featured courses with quick-add, package cards, client testimonials, and inquiry CTA.
2. **Disciplines (`/disciplines`)**: In-depth coverage of Bespoke Wedding Feasts, Film & Media Craft Services, Galas & Executive Summits, and Party Platters & Casual BBQs, along with Ocean West food-safety standards and Vancouver Coastal Health audit credentials.
3. **Courses & Delicacies (`/courses`)**: Full culinary repertoire with horizontal filter tabs (All, First Courses & Starters, Artisanal Mains, Passed Hors d'oeuvres, Dessert & Grazing Boards). Includes "Add to My Menu" builder buttons, quick inquiry triggers, PDF guide download callout, and custom dietary adaptation philosophy.
4. **Event Packages (`/packages`)**: Three structured package tiers:
   - *The Intimate Gathering* (From $85/guest, 12–35 guests)
   - *The Grand Wedding Banquet* (From $140/guest, 40–350 guests, marked Most Requested)
   - *Movie & Film Production* (Daily call sheet rates, 25–400+ crew)
   Includes package selection buttons that prefill inquiry state, booking guarantee notice, and date checker CTA.
5. **Film & Media Catering (`/film-catering`)**: High-velocity craft catering capabilities for 14-hour production days, mobile all-weather commercial galleys, dietary labeling, union compliance (Teamsters 155, IATSE 891, DGC BC), production statistics (200+ shoots), and production manager testimonial.
6. **Direct Inquiries (`/inquiry`)**: Comprehensive booking form with auto-save status, event category selection, target date, guest count, location, interactive dietary chips, attached tasting menu preview, pre-submission review summary, clear success receipt, and direct commissary contact links.

---

## 6 New Catering-Focused Features

1. **Event Menu Builder ("My Menu")**:
   - Tap "Add to Menu" on any course to curate a personalized tasting list.
   - Access the My Menu drawer via header or floating pill to view items, inspect service styles, remove items, or clear the selection.
   - One-tap "Transfer Menu to Inquiry" appends all chosen courses to your inquiry notes.
2. **Interactive Event Planner**:
   - Choose event category, slide guest count from 10 to 450+, pick date/location, and select preferred service style.
   - Instantly calculates recommended tier, staffing ratio (executive chefs, captains, waitstaff), and service timeline.
   - "Apply Plan & Proceed to Inquiry" prefills form fields.
3. **Dietary Preference Quick Chips**:
   - Interactive multi-select chips on the inquiry page (Gluten-Free Celiac Safe, Plant-Based / Vegan, Vegetarian, Dairy-Free, Halal, Kosher, Nut Free, Shellfish Free, Low Sodium, Other).
   - Toggles state dynamically while preserving free-text notes.
4. **Inquiry Pre-Submission Summary**:
   - Concise verification card displayed directly above the submit button on `/inquiry` summarizing package, guests, date, location, selected dishes, and dietary accommodations.
   - Renders a clean receipt card upon submission.
5. **Contact Shortcuts**:
   - Convenient one-tap communication sheet providing direct dialer links to Chef Michael (`604-722-4857`), Kitchen Office (`604-456-4481`), email (`info@oceanwestcatering.com`), and Google Maps directions to the Richmond commissary (`482 Panorama, Richmond, BC V6X 0E7`).
6. **Saved Planning State in LocalStorage**:
   - Draft inquiry inputs and curated menu dishes automatically persist in browser `localStorage`.
   - Accidental page reloads or tab navigation will not erase your planning work.
   - Includes an explicit "Reset Draft" button with instant feedback.

---

## Demo-Only Behaviors & Disclosures

To preserve honesty and transparency (as there is no backend server or database connected):
- **Date Availability Checker**: Simulates calendar verification and marks dates available for demo purposes; prompts users to proceed to the inquiry form to request a formal date hold.
- **PDF Menu Guide Modal**: Simulates sending the 24-page package catalog to the entered email address with a success confirmation state.
- **Inquiry Submission**: Validates fields and generates an on-screen confirmation receipt and toast notification; does not dispatch real outbound SMTP emails.
- **Client Portal Button**: Displays a toast notice explaining that portal login is reserved for contracted event clients.

---

## Getting Started & Local Development

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+ or v10+)

### Installation
```bash
# Navigate to the project directory
cd "OceanWestCatering App"

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

