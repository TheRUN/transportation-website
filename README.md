# Transportation Website

A modern, full-stack transportation company website built with React frontend and Node.js backend, featuring 3D animations, smooth scrolling effects, and a comprehensive API system.

## 🚀 Features

### Frontend (React + Vite)
- **3D Elements**: 3D transforms and perspectives for vehicles, cards, and interactive elements
- **Hover Effects**: Smooth, engaging hover transitions on all interactive components
- **Smooth Scrolling**: Smooth scroll animations with reveal effects using Framer Motion
- **Parallax Effects**: Parallax scrolling backgrounds and layered depth effects
- **Responsive Design**: Mobile-first approach, works on all screen sizes

### Backend (Node.js + Express)
- **RESTful API**: Complete API for all website functionality
- **Authentication**: JWT-based auth with role-based access control
- **Quote Management**: Handle transportation quote requests with email notifications
- **Booking System**: Complete booking management with status tracking
- **Fleet Management**: Vehicle inventory management with filtering
- **Admin Dashboard**: Statistics, user management, and analytics
- **Email Notifications**: Automated confirmations and updates via Nodemailer
- **Security**: Password hashing, input validation, rate limiting, CORS

### Technology Stack

**Frontend:**
- React 18
- Vite
- Framer Motion
- CSS3

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- Nodemailer
- Express Validator

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
- MongoDB (v4.4 or higher) - for backend

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheRUN/transportation-website.git
   cd transportation-website
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Local MongoDB
   sudo systemctl start mongod  # Linux
   brew services start mongodb-community  # macOS
   
   # Or use MongoDB Atlas (cloud)
   ```

5. **Start the backend server**
   ```bash
   npm run dev  # Development with auto-reload
   # or
   npm start    # Production
   ```

6. **Backend will be available at**
   `http://localhost:5000`

For detailed backend setup, API documentation, and configuration options, see:
- **[Backend README](backend/README.md)** - Complete documentation
- **[Backend Quick Start](backend/QUICKSTART.md)** - Fast setup guide

## 🛠️ Available Scripts

### Frontend Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Backend Scripts

- `npm run dev` - Start with auto-reload (nodemon)
- `npm start` - Start in production mode

## 📁 Project Structure

```
transportation-website/
├── backend/             # Backend API (Node.js + Express)
│   ├── config/         # Database and email configuration
│   ├── models/         # Mongoose schemas
│   ├── controllers/    # Route controllers
│   ├── routes/         # API routes
│   ├── middleware/     # Auth and validation middleware
│   ├── server.js       # Entry point
│   ├── package.json
│   └── README.md       # Backend documentation
├── public/             # Frontend static assets
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

### Frontend
- **React**: UI component library
- **Vite**: Build tool and dev server
- **Framer Motion**: Advanced animation library
  - Scroll animations
  - Component transitions
  - 3D transforms
  - Gesture-based interactions
- **CSS3**: Modern CSS features
  - CSS Variables for theming
  - CSS Grid for layouts
  - Flexbox for alignment
  - Custom animations and keyframes
  - 3D transforms and perspectives

### Backend
- **Node.js + Express**: Server and API framework
- **MongoDB + Mongoose**: Database and ODM
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing
- **Nodemailer**: Email functionality
- **Express Validator**: Input validation
- **Helmet**: Security headers
- **Rate Limiting**: API protection

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

## 🔌 API Integration

The backend provides a comprehensive RESTful API for all website functionality:

### Public Endpoints
- **Quote Submission** - `POST /api/quotes` - Submit transportation quote requests
- **Fleet Listing** - `GET /api/fleet` - View available vehicles
- **User Registration** - `POST /api/auth/register` - Create new account
- **User Login** - `POST /api/auth/login` - Authenticate and get JWT token

### Protected Endpoints (Require Authentication)
- **Bookings** - Create, view, and manage bookings
- **Profile** - View and update user profile
- **Admin Dashboard** - Statistics and management (admin only)
- **Fleet Management** - Add/update/delete vehicles (admin only)
- **Quote Management** - Process and respond to quotes (admin only)

### API Features
- ✅ JWT authentication with role-based access
- ✅ Input validation on all endpoints
- ✅ Email notifications (welcome, booking confirmations, quotes)
- ✅ Pagination support for large datasets
- ✅ Advanced filtering and search
- ✅ Rate limiting for security
- ✅ Comprehensive error handling

### API Documentation
Complete API documentation with examples:
- **[Backend README](backend/README.md)** - Full API reference
- **[Quick Start Guide](backend/QUICKSTART.md)** - Quick setup and testing

### Example API Usage

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Submit a quote:**
```bash
curl -X POST http://localhost:5000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","phone":"1234567890","serviceType":"freight","origin":"NY","destination":"LA"}'
```

**Get fleet vehicles:**
```bash
curl http://localhost:5000/api/fleet?available=true
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please open an issue on GitHub or contact support.

---

Built with ❤️ using React and Framer Motion
