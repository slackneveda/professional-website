# Mortgage Brokerage Portal - Product Requirements Document

## Core Purpose & Success

**Mission Statement**: Create a comprehensive mortgage brokerage dashboard that enables brokers to efficiently track loan volumes, manage active deals, monitor market rates, and oversee their pipeline with professional light and dark mode interfaces.

**Success Indicators**: 
- Brokers can quickly assess their monthly performance through clear metrics
- Real-time visibility into deal pipeline status and trends
- Seamless switching between light and dark themes for user preference
- Professional appearance suitable for client presentations

**Experience Qualities**: Professional, Efficient, Insightful

## Project Classification & Approach

**Complexity Level**: Light Application (multiple features with basic state management)

**Primary User Activity**: Consuming - Brokers primarily view and analyze data rather than creating new content

## Thought Process for Feature Selection

**Core Problem Analysis**: Mortgage brokers need a centralized view of their business performance, active deals, and market trends to make informed decisions and track progress.

**User Context**: Daily check-ins to review performance, client meetings requiring professional data presentation, and ongoing deal management.

**Critical Path**: Login → Dashboard Overview → Drill into specific metrics or deals → Take action based on insights

**Key Moments**: 
1. Morning dashboard check to understand daily priorities
2. Client meetings showcasing performance metrics
3. Theme switching for optimal viewing conditions

## Essential Features

### Dashboard Overview
- **Functionality**: Display key metrics including total loan volume, active deals, average interest rates, and deals closed
- **Purpose**: Provide immediate visibility into business performance
- **Success Criteria**: All metrics update accurately and are clearly visible

### Interactive Charts
- **Functionality**: Visual representation of loan volume trends and deal status distribution
- **Purpose**: Enable quick pattern recognition and trend analysis
- **Success Criteria**: Charts render correctly and provide meaningful insights

### Recent Deals Section
- **Functionality**: Display latest deal updates with client names, loan amounts, lenders, and current status
- **Purpose**: Provide quick visibility into active pipeline and deal progression
- **Success Criteria**: Real-time status updates with clear visual status indicators

### Alerts & Notifications
- **Functionality**: Important updates requiring broker attention including documentation requirements, closing reminders, and rate updates
- **Purpose**: Ensure critical tasks and deadlines are not missed
- **Success Criteria**: Clear categorization of alert types with appropriate visual priority

### Theme Switching
- **Functionality**: Toggle between light and dark modes
- **Purpose**: Accommodate user preferences and different viewing environments
- **Success Criteria**: Smooth theme transitions with proper color contrast

### Navigation Tabs
- **Functionality**: Access to different sections (Dashboard, Deals, Lenders, etc.)
- **Purpose**: Organize functionality for efficient workflow
- **Success Criteria**: Clear active state indication and logical organization

## Design Direction

### Visual Tone & Identity
**Emotional Response**: The design should evoke confidence, professionalism, and competence - users should feel assured of the platform's reliability.

**Design Personality**: Professional, clean, and trustworthy with subtle modern touches that suggest innovation without being flashy.

**Visual Metaphors**: Financial dashboard concepts with card-based layouts suggesting organized information containers.

**Simplicity Spectrum**: Minimal interface that prioritizes data clarity over decorative elements.

### Color Strategy
**Color Scheme Type**: Professional business palette with carefully selected accent colors

**Primary Color**: Deep blue (oklch(0.45 0.15 240)) - conveys trust and stability
**Secondary Colors**: Neutral grays for backgrounds and borders
**Accent Color**: Warm orange (oklch(0.7 0.15 45)) - highlights important actions
**Color Psychology**: Blue builds trust, gray provides neutrality, orange creates urgency for actions
**Color Accessibility**: All color combinations meet WCAG AA contrast ratios

**Foreground/Background Pairings**:
- Primary background (white/dark gray) with dark gray/light gray text
- Card backgrounds (white/darker gray) with dark/light text
- Primary buttons (blue) with white text
- Secondary buttons (light gray/dark gray) with dark/light text

### Typography System
**Font Pairing Strategy**: Single font family (Inter) with varying weights for hierarchy
**Typographic Hierarchy**: Bold headings, medium weight for emphasis, regular for body text
**Font Personality**: Modern, clean, highly legible - professional without being sterile
**Readability Focus**: Generous line spacing, appropriate contrast, optimal font sizes
**Typography Consistency**: Consistent scale and spacing throughout interface
**Which fonts**: Inter from Google Fonts
**Legibility Check**: Inter is specifically designed for screen legibility and performs excellently at all sizes

### Visual Hierarchy & Layout
**Attention Direction**: Header draws attention first, then metrics cards, followed by detailed charts
**White Space Philosophy**: Generous spacing creates breathing room and focus
**Grid System**: CSS Grid for responsive layout with consistent spacing
**Responsive Approach**: Mobile-first design that scales up gracefully
**Content Density**: Balanced - enough information without overwhelming

### Animations
**Purposeful Meaning**: Subtle transitions reinforce theme changes and state updates
**Hierarchy of Movement**: Theme transitions are most prominent, followed by hover states
**Contextual Appropriateness**: Professional environment calls for subtle, purposeful motion

### UI Elements & Component Selection
**Component Usage**: 
- Cards for metric display, chart containers, recent deals, and notifications
- Select dropdown for time period filtering
- Tabs for navigation
- Button for theme toggle
- Avatar for user identity
- Badges for deal status indicators
- Icons for notification types and visual hierarchy

**Component Customization**: Professional color scheme applied to all shadcn components
**Component States**: Clear hover, active, and focus states for all interactive elements
**Icon Selection**: Phosphor icons for consistent visual language
**Component Hierarchy**: Clear primary/secondary button distinction
**Spacing System**: Consistent use of Tailwind spacing scale
**Mobile Adaptation**: Responsive grid layouts and hidden text on smaller screens

### Visual Consistency Framework
**Design System Approach**: Component-based design using shadcn/ui library
**Style Guide Elements**: Consistent color usage, spacing, and typography
**Visual Rhythm**: Regular spacing patterns and consistent component sizes
**Brand Alignment**: Professional appearance suitable for financial services

### Accessibility & Readability
**Contrast Goal**: WCAG AA compliance for all text and UI elements
- Light mode: Dark text on light backgrounds
- Dark mode: Light text on dark backgrounds
- Interactive elements maintain proper contrast ratios

## Edge Cases & Problem Scenarios
**Potential Obstacles**: 
- Data loading delays affecting user experience
- Theme switching causing jarring transitions
- Mobile viewing challenges with complex charts

**Edge Case Handling**: 
- Loading states for charts and data
- Smooth theme transitions with proper CSS
- Responsive chart designs for mobile

**Technical Constraints**: Browser compatibility for modern CSS features

## Implementation Considerations
**Scalability Needs**: Additional dashboard views and more complex data visualizations
**Testing Focus**: Theme switching functionality and responsive design
**Critical Questions**: How will real data integration affect performance?

## Reflection
This approach uniquely balances professional requirements with modern UX expectations. The theme switching capability addresses the practical need for different viewing environments while maintaining visual consistency. The focus on clear data visualization serves the primary user need for quick decision-making based on business metrics.

**Assumptions to Challenge**: 
- Are the selected metrics the most important for daily broker workflow?
- Does the visual hierarchy properly direct attention to critical information?

**Exceptional Solution Elements**:
- Seamless theme switching with professional color palettes
- Clear data visualization optimized for business decision-making
- Responsive design that works equally well in office and mobile contexts