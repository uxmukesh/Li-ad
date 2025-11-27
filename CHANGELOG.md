# Changelog

All notable changes to the Lifeinvader Ads Generator project will be documented in this file.

## [1.0.0] - 2025-11-28

### Added

- **Form Enhancements**

  - Editable output field
  - Enhanced OtherForm with improved category organization
  - Clothing search with gender filtering (Male/Female/All)
  - Gender validation for clothing items
  - Item category refactoring with grid layout
  - Quality selection as radio buttons for Inventory category
  - Auto-selection of item type for single-item categories
  - Optional type number input for Luminous wheels
  - Special handling for Tickets category with "a" article and pluralization

- **Real Estate Form**

  - Added "Mirror Park" location
  - Alphabetically sorted location lists
  - Column-first layout for location selection

- **Work Form**

  - Reordered job types (Plantation workers at top)
  - Reordered specific roles with column layout
  - Automatic "$" and thousands separator formatting for salary amount (output only)
  - Updated policy validation for salary format

- **Other Form**

  - Merged Containers and Resources into Items category
  - Alphabetically sorted item categories and item types
  - Column-first layout for item category and item type selection
  - Maximum 4 columns for item type grid
  - Special handling for single-item categories (auto-select item type)
  - Resources and Containers as item categories with special UI

- **Data Organization**
  - Moved all data to `data.ts` for better organization
  - Sorted all arrays alphabetically
  - Added helper function for array sorting

### Fixed

- Double periods after prices in generated ads
- Missing period after "Million" in price sections
- Period handling for numeric prices (no period after numbers)
- "Looking for work" prefix logic in WorkForm
- Item category selection state management
- Resource type selection state management
- Container type selection state management
- Price formatting consistency across all forms
- Quantity validation for items and resources

### Changed

- Output field is now editable
- OtherForm category order: Clothing, Items, Containers, Resources first
- Purpose selection moved before Category selection in OtherForm
- Removed "Clothing Category" section when clothing is selected
- Item type selection uses grid layout instead of search input
- Quality input changed to radio buttons for Inventory category
- Location lists display in column-first layout (top to bottom, then next column)
- Specific role groups display in columns in WorkForm

### Technical Improvements

- Improved state management with atomic updates
- Better code organization with data separation
- Consistent formatting functions across all forms
- Enhanced validation logic for form inputs
- Improved template generation with special case handling
