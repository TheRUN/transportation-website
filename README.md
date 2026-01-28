# Transportation Website

A modern, visually stunning transportation company website built with React, featuring 3D animations, smooth scrolling effects, and a responsive design.

## 🚀 Features

### Visual Effects
- **3D Elements**: 3D transforms and perspectives for vehicles, cards, and interactive elements
- **Hover Effects**: Smooth, engaging hover transitions on all interactive components
- **Smooth Scrolling**: Smooth scroll animations with reveal effects using Framer Motion
- **Parallax Effects**: Parallax scrolling backgrounds and layered depth effects

### Technology Stack
- **React 18**: Modern React with hooks and functional components
- **Vite**: Lightning-fast build tool and dev server
- **Framer Motion**: Advanced animation library for React
- **CSS3**: Modern CSS with variables, Grid, Flexbox, and animations
- **JavaScript ES6+**: Latest JavaScript features

### Website Sections

1. **Hero Section**
   - Eye-catching hero with parallax background
   - 3D animated truck with floating animation
   - Call-to-action buttons with hover effects
   - Smooth scroll indicator

2. **Services Section**
   - 6 service cards with 3D flip/tilt effects on hover
   - Icons representing different transportation services
   - Smooth fade-in animations on scroll
   - Interactive card glows

3. **Features/Why Choose Us**
   - Animated statistics counters
   - Real-time number animations
   - Floating background shapes
   - Feature cards with hover effects

4. **Fleet/Vehicles Showcase**
   - 6 vehicle types with 3D hover effects
   - Modal/lightbox functionality
   - Interactive vehicle cards
   - Smooth transitions

5. **Testimonials**
   - Carousel with smooth transitions
   - Client testimonials with ratings
   - Animated navigation
   - Responsive card design

6. **Contact Section**
   - Animated contact form with focus effects
   - Contact information cards
   - Social media links
   - Form validation

7. **Navigation**
   - Fixed navbar with scroll effects
   - Mobile-responsive hamburger menu
   - Smooth section scrolling
   - Animated logo

8. **Footer**
   - Comprehensive footer with links
   - Social media integration
   - Responsive layout

## 🎨 Design Features

- **Color Scheme**: Professional transportation aesthetic with blue and orange gradients
- **Typography**: Clean, modern typography with gradient text effects
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Performance**: Optimized animations using CSS transforms and GPU acceleration
- **Cross-browser Compatible**: Works on all modern browsers

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheRUN/transportation-website.git
   cd transportation-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
transportation-website/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── Services.jsx
│   │   ├── Services.css
│   │   ├── Features.jsx
│   │   ├── Features.css
│   │   ├── Fleet.jsx
│   │   ├── Fleet.css
│   │   ├── Testimonials.jsx
│   │   ├── Testimonials.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── assets/          # Images and assets
│   ├── App.jsx          # Main App component
│   ├── App.css          # App styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 🎯 Key Technologies & Libraries

### Core
- **React**: UI component library
- **Vite**: Build tool and dev server

### Animation & Effects
- **Framer Motion**: Advanced animation library
  - Used for scroll animations
  - Component transitions
  - 3D transforms
  - Gesture-based interactions

### Styling
- **CSS3**: Modern CSS features
  - CSS Variables for theming
  - CSS Grid for layouts
  - Flexbox for alignment
  - Custom animations and keyframes
  - 3D transforms and perspectives

## 🌟 Animation Features

### Scroll Animations
- Intersection Observer API integration via Framer Motion
- Elements fade and slide in as they enter viewport
- Smooth, performance-optimized animations

### 3D Effects
- CSS 3D transforms on cards and elements
- Perspective effects on hover
- Rotating and tilting animations
- Parallax layers with mouse tracking

### Hover Effects
- Scale and lift effects on buttons
- Color transitions on links
- Glow effects on cards
- Smooth transitions on all interactive elements

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

All sections adapt gracefully to different screen sizes with optimized layouts and touch-friendly interactions.

## 🚀 Performance Optimizations

- **GPU Acceleration**: Using CSS transforms for smooth animations
- **Lazy Loading**: Scroll-triggered animations load only when needed
- **Optimized Assets**: Minimal dependencies for faster load times
- **Modern Build Tool**: Vite provides fast HMR and optimized production builds

## 🎨 Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-blue: #0066cc;
  --primary-orange: #ff6b35;
  --dark-bg: #0a0e27;
  /* ... more variables */
}
```

### Content
- Update text in component JSX files
- Modify service/fleet/testimonial data arrays
- Change contact information

### Animations
- Adjust Framer Motion configurations in components
- Modify CSS keyframes in component CSS files
- Change transition durations and easing functions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please open an issue on GitHub or contact support.

---

Built with ❤️ using React and Framer Motion
