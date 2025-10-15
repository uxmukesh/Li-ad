# Lifeinvader Ads Generator

A comprehensive Next.js application for generating Lifeinvader ads with advanced policy compliance, multiple categories, and professional styling.

## Features

- **6 Complete Categories**: Real Estate, Auto, Dating, Work, Business, and Other
- **Policy Compliance**: Built-in Lifeinvader policy validation and formatting
- **Advanced Forms**: Smart form fields with conditional logic and autocomplete
- **Professional UI**: Modern glass morphism design with minimal color scheme
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Real-time Validation**: Instant policy compliance checking

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom utilities
- **Language**: TypeScript
- **Icons**: React Icons (Material Design)
- **Fonts**: Roboto and Roboto Slab
- **Color Scheme**: Professional slate/gray minimal design

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with Tailwind v4 utilities
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── components/
│   ├── forms/
│   │   ├── RealEstateForm.tsx  # Real estate form with policy compliance
│   │   ├── AutoForm.tsx        # Auto form with monowheel support
│   │   ├── DatingForm.tsx      # Dating form with multiple types
│   │   ├── WorkForm.tsx        # Work form with role grouping
│   │   ├── BusinessForm.tsx    # Business form with validation
│   │   └── OtherForm.tsx       # Other category with grouped rules
│   ├── AdGenerator.tsx         # Main generator component
│   ├── Footer.tsx              # Footer component
│   ├── Header.tsx              # Header with animated background
│   ├── OutputSection.tsx       # Output with category display
│   └── TabNavigation.tsx       # Tab navigation component
├── lib/
│   ├── data.ts              # Static data (locations, car names, etc.)
│   └── utils.ts             # Template generation and validation
└── types/
    └── index.ts             # TypeScript interfaces for all forms
```

## Category Features

### 🏠 Real Estate Category

- **Property Types**: Houses, apartments, mansions, penthouses
- **Rental Support**: Renting out and renting options
- **Features**: Garden, garage, warehouses, swimming pool, tennis court, helipad
- **Locations**: Comprehensive location system with apartment-specific options
- **Policy Compliance**: Full Lifeinvader policy validation

### 🚗 Auto Category

- **Vehicle Names**: Autocomplete with extensive car database
- **Monowheel Support**: Special handling for monowheel vehicles with type input
- **Features**: Configuration, visual upgrades, luminous wheels, insurance, turbo kit, drift kit
- **Price Options**: Million+ pricing support

### 💕 Dating Category

- **Multiple Types**: Specific person, family, date, wife, husband, valentine, friends
- **Name Handling**: Full name capitalization and validation
- **Policy Compliance**: Dating-specific ad formatting

### 💼 Work Category

- **Job Types**: Construction workers, specific roles, general workers
- **Hiring Options**: Looking for work vs. hiring workers
- **Compensation**: Negotiable, bonus, specific salary options
- **Experience Levels**: Years of experience selection

### 🏢 Business Category

- **Business Types**: Comprehensive business type validation
- **Purpose Options**: Selling, buying, trading businesses
- **Policy Compliance**: Business-specific formatting and validation
- **Service Ads**: Support for service-based advertisements

### 🎯 Other Category

- **Grouped Rules**: Party, services, items, pets, resources, containers, clothing, gambling, alliance
- **Smart Forms**: Dropdowns and number inputs to reduce typing
- **Policy Compliance**: Category-specific ad generation

## Advanced Features

### 🎨 Professional UI Design

- **Glass Morphism**: Modern backdrop blur effects
- **Minimal Color Scheme**: Professional slate/gray palette
- **Responsive Layout**: Mobile-first design with 2-column layouts
- **Micro-animations**: Smooth transitions and hover effects
- **Custom Utilities**: Tailwind v4 custom utility classes

### 🔧 Policy Compliance System

- **Real-time Validation**: Instant policy checking as you type
- **Category Display**: Shows which Lifeinvader category the ad belongs to
- **Policy Violation Detection**: Identifies and explains policy violations
- **Ad Formatting**: Automatic formatting according to Lifeinvader rules

### 🚀 Technical Features

- **TypeScript**: Full type safety with comprehensive interfaces
- **React Hooks**: Modern state management with useState and useEffect
- **Conditional Logic**: Smart form fields that show/hide based on selections
- **Autocomplete**: Intelligent vehicle name suggestions
- **Template Generation**: Advanced ad template creation with policy compliance

## Development

- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

## Custom Styling Utilities

The application uses custom Tailwind v4 utilities defined in `globals.css`:

- `.btn-primary`: Professional slate gradient buttons
- `.btn-secondary`: Light slate secondary buttons
- `.form-input`: Styled input fields with slate focus
- `.form-checkbox`: Custom checkbox styling
- `.form-radio`: Circular radio buttons with custom checked state
- `.card`: Glass morphism card containers
- `.nav-pill`: Navigation pill styling
- `.feature-card`: Feature card containers with hover effects

## Policy Implementation

This application implements comprehensive Lifeinvader policy rules including:

- **Ad Structure**: Proper starters, price formatting, currency handling
- **Category Rules**: Specific formatting for each category
- **Validation**: Real-time policy compliance checking
- **Exceptions**: Handling of allowed business types
- **Formatting**: Automatic ad formatting according to policy

## License

This project is open source and available under the MIT License.
