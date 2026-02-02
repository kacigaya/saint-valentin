# Valentine's Day Landing Page

A romantic interactive web application built with Next.js that asks the timeless question: "Will you be my Valentine?"

## Technology Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: React 19.2.3
- **DOM**: React DOM 19.2.3
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Linting**: ESLint 9
- **Font**: Inter (Google Fonts)
- **Build Tool**: Built-in Next.js bundler

## Features

### Interactive Elements

- **Moving No Button**: The "No" button dynamically repositions itself when users try to click it, with playful taunting messages that increase with each escape attempt
- **Static Yes Button**: A prominent, easy-to-click button with hover effects that triggers the celebration state
- **Escape Counter**: Tracks how many times users have avoided clicking "Yes" and displays context-aware messages

### Visual Design

- **Romantic Gradient Background**: Animated radial gradients in deep reds and pinks with subtle movement
- **Floating Hearts Animation**: Pre-computed floating heart elements that drift up the screen with varying speeds and sizes
- **Text Reveal Animation**: Staggered entrance animations for headings and content
- **Celebration Effects**: Triggered on acceptance with:
  - Large burst heart animation
  - Confetti particles falling from top to bottom
  - Animated state transition to acceptance message

### Responsive Design

- Mobile-first approach with support from 375px and up
- Touch-friendly button sizes and spacing
- Vertical button layout on mobile, horizontal on desktop
- Responsive typography scaling across breakpoints
- Optimized for all screen sizes

### Technical Features

- **Client-Side Rendering**: Uses Next.js 'use client' directive for interactive features
- **Hydration-Safe**: Pre-computed static data arrays eliminate server/client mismatch errors
- **CSS-Only Animations**: All animations use pure CSS for optimal performance
- **Accessibility**: Semantic HTML with ARIA labels and focus states
- **Dark Theme**: Carefully crafted dark mode design with high contrast colors
- **No External Dependencies**: Self-contained component using only React, Tailwind, and native APIs

### Animation Library

- **Float Up**: Floating hearts ascending the screen with rotation and opacity fade
- **Float Sway**: Gentle horizontal swaying motion for decorative elements
- **Pulse Glow**: Pulsing drop shadow effect on the main heart icon
- **Heartbeat**: Double-beat scaling animation on prominent hearts
- **Confetti Fall**: Rotating particles falling down the screen
- **Celebration Burst**: Large expanding heart animation on acceptance
- **Text Reveal**: Blur-to-clear entrance with slide-up motion
- **Gradient Shift**: Animated background gradient movement

## Project Structure

```
app/
├── layout.tsx        # Root layout with metadata and font configuration
├── page.tsx          # Main Valentine's page component
├── globals.css       # Global styles, Tailwind config, and animations
├── favicon.ico       # Romantic heart favicon
└── favicon.svg       # SVG source for favicon
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Color Palette

- **Deep Rose**: #9f1239
- **Mid Rose**: #e11d48
- **Light Rose**: #fda4af
- **Pale Rose**: #ffe4e6
- **Cream**: #fef2f2
- **Background**: #0d0208

## User Journey

1. **Initial State**: User sees the question "Will you be my Valentine?" with two options
2. **Trying No**: Each hover or click on the "No" button moves it to a random position with playful messages
3. **Clicking Yes**: Triggers celebration with confetti, burst animation, and acceptance message
4. **Accepted State**: Displays "Yay!" message with decorative elements and option to restart

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized CSS animations run at 60fps
- No JavaScript-based animations (pure CSS)
- Minimal re-renders through careful React hook usage
- Static data arrays prevent unnecessary computations

## Notes

- The "No" button movement uses runtime randomization to create unpredictable positioning
- All floating hearts use pre-computed static values to ensure consistent, hydration-safe rendering
- The confetti effect uses 60 particles with deterministic color and size assignment
- Custom heart SVG component is reusable throughout the application with configurable size, color, and style props
