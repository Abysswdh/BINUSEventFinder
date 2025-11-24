# CHANGELOG - BINUS Event Finder

## Iteration 2 (November 2024)

### 🎨 Major UI/UX Overhaul

#### **Premium Glassmorphic Design**
- Implemented modern glassmorphism design language throughout the site
- Added sticky glassmorphic header with blur effects
- Enhanced visual hierarchy with gradient backgrounds and smooth animations
- Improved color scheme with vibrant BINUS brand colors

#### **Responsive Navigation**
- Redesigned header with improved layout
- Added language switcher (EN/ID) with active state indicators
- Maintained original BINUS header elements (logo, search, login)
- Mobile-responsive navigation system

### 🌐 Internationalization (i18n)

#### **Bilingual Support**
- Full English and Indonesian language support
- Dynamic language switching without page reload
- Implemented `data-i18n` attribute system for translations
- Language preference persistence across sessions
- Translated all UI elements, event types, and content

### 🎯 Event Type Pages

#### **Dedicated Event Pages**
- **SAT Points Page** (`sat-point.html`) - Filtered view for SAT point events
- **Community Service Page** (`community-service.html`) - Community service events only
- **Competition Page** (`competition.html`) - Competition events exclusively
- Each page features:
  - Pre-filtered event listings
  - Consistent design with main page
  - Dedicated hero sections
  - Full language support

### 🔍 Advanced Filtering System

#### **Multi-dimensional Filters**
- **Time-based filtering**: Upcoming, This Week, This Month, All Events
- **Type filtering**: SAT Points, Community Service, Competition
- **Location filtering**: Dynamic location-based filtering
- **Search functionality**: Real-time search across event titles and descriptions
- **Combined filters**: All filters work together seamlessly

### 📅 Calendar Integration

#### **Google Calendar Export**
- "Add to Google Calendar" button for each event
- Pre-filled event details (title, description, location, time)
- One-click calendar integration

### ⚡ Performance & User Experience

#### **Loading States**
- Implemented loading indicator for data fetching
- Smooth transitions and animations
- Optimized event card rendering

#### **Interactive Elements**
- Hover effects on event cards
- Animated filter buttons
- Smooth scroll behavior
- Interactive hero slider with dynamic filtering

### 🎭 Visual Enhancements

#### **Event Cards**
- Redesigned event cards with glassmorphic style
- Color-coded event type badges
- Improved typography and spacing
- Enhanced readability with better contrast
- Consistent card layout across all pages

#### **Hero Section**
- Interactive hero slider on main page
- Dynamic call-to-action buttons that filter events by type
- Engaging animations and transitions
- Responsive design for all screen sizes

### 🛠️ Technical Improvements

#### **Code Structure**
- Modularized JavaScript with clear separation of concerns
- Improved event handling and state management
- Enhanced error handling for API calls
- Better code documentation

#### **Assets**
- Added BINUS logo without background (`assets/logonobg.png`)
- Optimized images for web performance

#### **Development Tools**
- Added VS Code tasks configuration (`.vscode/tasks.json`)
- Improved development workflow

### 📊 Data Management

#### **Enhanced Event Processing**
- Improved date parsing and formatting
- Better event type inference
- Location data extraction and display
- Robust error handling for missing data

### 🎨 Styling Updates

#### **CSS Enhancements** (`style.css`)
- Added 224+ lines of new styles
- CSS custom properties for theming
- Responsive breakpoints for mobile, tablet, and desktop
- Smooth animations and transitions
- Glassmorphism effects with backdrop-filter

#### **Design System**
- Consistent spacing and typography
- Color palette based on BINUS branding
- Reusable component styles

### 📝 Files Changed

**New Files:**
- `community-service.html` - Community service events page
- `competition.html` - Competition events page
- `sat-point.html` - SAT points events page
- `assets/logonobg.png` - BINUS logo asset
- `.vscode/tasks.json` - Development tasks
- `CHANGELOG.md` - This file

**Modified Files:**
- `index.html` - Complete UI overhaul, added i18n support (+204 lines)
- `script.js` - Enhanced functionality, filtering, i18n (+416 lines)
- `style.css` - Premium styling, glassmorphism (+224 lines)

### 📈 Statistics
- **Total Changes**: 1,170 insertions, 64 deletions
- **Files Modified**: 8 files
- **New Features**: 15+ major features
- **Languages Supported**: 2 (English, Indonesian)

---

### Credits
**Prototype by Group 1** - Program Design Method LB20 BINUS @Malang
**Lead Developer**: Aby (Abysswdh)
**Iteration 2 Date**: November 2024
