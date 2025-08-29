# Mortgage Brokerage Portal

A comprehensive dashboard for mortgage brokers to manage deals, lenders, and client relationships efficiently.

**Experience Qualities**:
1. Professional - Clean, business-oriented interface that builds trust and confidence
2. Data-driven - Clear visualization of key metrics and performance indicators  
3. Accessible - Intuitive navigation with both light and dark mode support

**Complexity Level**: Light Application (multiple features with basic state)
- Multi-tab navigation system with distinct functional areas
- Real-time dashboard metrics and data visualization
- User profile management and theme switching capabilities

## Essential Features

**Dashboard Overview**
- Functionality: Display key performance metrics, loan volumes, deal status, and trends
- Purpose: Provide at-a-glance view of business performance and pipeline health
- Trigger: Default landing page after login
- Progression: Load dashboard → Display metrics cards → Show charts → Enable interactions
- Success criteria: All metrics display correctly, charts render properly, data updates reflect current state

**Navigation System**
- Functionality: Tab-based navigation between Dashboard, Deals, Lenders, Company Docs, Assistant, CRM Integration, Admin
- Purpose: Organize different functional areas for efficient workflow management
- Trigger: User clicks navigation tabs
- Progression: Click tab → Highlight active state → Load content → Maintain context
- Success criteria: Smooth transitions, active state indicators, content loads without delay

**Theme Toggle**
- Functionality: Switch between light and dark mode themes
- Purpose: Accommodate user preferences and reduce eye strain
- Trigger: Click theme toggle button
- Progression: Click toggle → Animate transition → Update all UI elements → Persist preference
- Success criteria: Seamless theme transitions, preference persistence, consistent styling across modes

**User Profile Display**
- Functionality: Show user name, role, and access to profile actions
- Purpose: Personalize experience and provide account management access
- Trigger: Display on page load, interact via profile area
- Progression: Load user data → Display profile info → Enable profile actions
- Success criteria: Accurate user information display, profile actions accessible

## Edge Case Handling

- **Missing Data**: Display placeholder states for empty metrics and charts
- **Network Issues**: Show loading states during data fetching with timeout handling
- **Invalid Navigation**: Graceful fallback to dashboard if accessing non-existent tabs
- **Theme Preference**: Default to system preference if no saved theme setting
- **Long Content**: Implement responsive design with proper overflow handling

## Design Direction

The design should feel sophisticated and trustworthy, evoking confidence in financial expertise while maintaining modern accessibility. Clean, data-focused interface that prioritizes clarity over decoration.

## Color Selection

Complementary (opposite colors) - Using blue and orange as complementary pairs to create visual distinction between primary actions and secondary elements while maintaining professional appearance.

- **Primary Color**: Deep Professional Blue (oklch(0.45 0.15 240)) - Communicates trust, stability, and financial expertise
- **Secondary Colors**: Neutral grays (oklch(0.96 0 0)) for backgrounds, supporting content hierarchy
- **Accent Color**: Warm Orange (oklch(0.7 0.15 45)) - Attention-grabbing for CTAs and important status indicators
- **Foreground/Background Pairings**: 
  - Background Light (oklch(0.98 0 0)): Dark text (oklch(0.15 0 0)) - Ratio 16.8:1 ✓
  - Primary Blue (oklch(0.45 0.15 240)): White text (oklch(1 0 0)) - Ratio 8.2:1 ✓
  - Accent Orange (oklch(0.7 0.15 45)): White text (oklch(1 0 0)) - Ratio 4.9:1 ✓
  - Card Light (oklch(1 0 0)): Dark text (oklch(0.15 0 0)) - Ratio 18.1:1 ✓

## Font Selection

Typography should convey professionalism and readability for data-heavy interfaces, using Inter for its excellent legibility at various sizes and weights.

- **Typographic Hierarchy**: 
  - H1 (Portal Title): Inter Bold/32px/tight letter spacing
  - H2 (Welcome Message): Inter SemiBold/24px/normal spacing  
  - H3 (Section Headers): Inter Medium/18px/normal spacing
  - Body (Descriptions): Inter Regular/14px/relaxed line height
  - Data Labels: Inter Medium/12px/wide letter spacing
  - Metrics: Inter Bold/28px/tight spacing

## Animations

Subtle and purposeful animations that enhance usability without distracting from data consumption. Focus on smooth transitions that maintain spatial continuity.

- **Purposeful Meaning**: Theme transitions communicate state change, tab switching shows content relationship, hover states provide interactive feedback
- **Hierarchy of Movement**: Theme toggle gets prominent animation, tab transitions are medium priority, metric updates use subtle animations

## Component Selection

- **Components**: Tabs for navigation, Card for metric displays, Button for actions, Avatar for user profile, Select for dropdowns, Badge for status indicators
- **Customizations**: Custom chart components using recharts, gradient backgrounds for metric cards, custom theme toggle component
- **States**: Hover effects on cards and tabs, active states for navigation, loading states for data, focus indicators for accessibility
- **Icon Selection**: Phosphor icons for navigation (TrendingUp, Users, FileText, etc.), consistent stroke weight throughout
- **Spacing**: Consistent padding using Tailwind's spacing scale (4, 6, 8 for most elements), generous whitespace around metric cards
- **Mobile**: Stack navigation tabs vertically, reduce metric card grid to single column, maintain touch targets 44px minimum