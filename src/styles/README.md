# QwickPress CMS Admin Theme

This directory contains the custom admin theme CSS for QwickPress CMS, which is built on Payload CMS.

## Files

- **admin-theme.css** - Main admin theme with QwickApps branding colors and Material Design enhancements
- **admin-theme.scss** - SCSS version (alternative to CSS, provides more customization options)

## Usage

The admin theme is automatically applied when you use the `@qwickapps/cms` package. Simply import it in your Payload admin layout:

```tsx
import '@qwickapps/cms/styles/admin-theme.css';
```

Or if you prefer SCSS and have a SCSS build pipeline:

```tsx
import '@qwickapps/cms/styles/admin-theme.scss';
```

## Features

### QwickApps Branding
The theme customizes Payload CMS with QwickApps brand colors:
- **Primary Color**: #007bff (QwickApps Blue)
- **Accent Color**: #ffc107 (Warning/Highlight)

### Material Design Enhancements
The theme includes Material Design-inspired improvements:
- **Buttons**: Rounded corners, subtle shadows, lift animation on hover
- **Cards & Tables**: Rounded corners, soft shadows, hover elevation effects
- **Forms**: Improved input styling, focus states with blue glow, better spacing
- **Navigation**: Animated hover effects, gradient backgrounds for active items
- **Typography**: Improved font weights and letter spacing

### List View Improvements
- Enhanced search bar with proper icon rendering
- Better padding and spacing throughout
- Responsive table layouts
- Improved controls and filters styling

### Component Stats
Collection list views (Pages, Products) include dynamic stat cards showing:
- Total document counts
- Status-based filtering (Published/Draft, Active/Beta/etc.)
- Real-time data using Payload's useListQuery hook

## Dark Mode

The theme automatically supports both light and dark modes via Payload's color system. No additional configuration needed.

## Customization

If you want to further customize the theme for your specific brand:

1. Copy `admin-theme.css` or `admin-theme.scss` to your project
2. Modify the CSS variables in the `:root` section
3. Adjust Material Design enhancements as needed
4. Import your custom CSS file instead of the package version

## Copyright

Copyright (c) 2025 QwickApps.com. All rights reserved.
