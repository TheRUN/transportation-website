# Transportation Backend - Quick Start Guide

## Overview
This backend provides a complete RESTful API for the transportation website with authentication, quote management, booking system, fleet management, and admin dashboard.

## Prerequisites
- Node.js v14 or higher
- MongoDB v4.4 or higher (local or MongoDB Atlas)
- npm or yarn

## Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/transportation
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Transportation Company <noreply@transport.com>
ADMIN_EMAIL=admin@transport.com
CORS_ORIGIN=http://localhost:5173
```

### 3. Start MongoDB
**Local:**
```bash
# Linux
sudo systemctl start mongod

# macOS
brew services start mongodb-community

# Windows
net start MongoDB
```

**Cloud (MongoDB Atlas):**
- Create account at mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update `MONGODB_URI` in `.env`

### 4. Run the Server
**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will start at `http://localhost:5000`

## Testing the API

### Health Check
```bash
curl http://localhost:5000/health
```

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the returned `token` for authenticated requests.

### Submit Quote (Public)
```bash
curl -X POST http://localhost:5000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "1234567890",
    "serviceType": "freight",
    "origin": "New York",
    "destination": "Boston"
  }'
```

### Get Fleet Vehicles (Public)
```bash
curl http://localhost:5000/api/fleet
```

## API Endpoints Summary

### Authentication (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Quotes
- `POST /api/quotes` - Submit quote (public)
- `GET /api/quotes` - List quotes (admin only)
- `GET /api/quotes/:id` - Get quote (admin only)
- `PUT /api/quotes/:id` - Update quote (admin only)
- `DELETE /api/quotes/:id` - Delete quote (admin only)

### Bookings (Requires Authentication)
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List bookings
- `GET /api/bookings/:id` - Get booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Fleet
- `GET /api/fleet` - List vehicles (public)
- `GET /api/fleet/:id` - Get vehicle (public)
- `POST /api/fleet` - Add vehicle (admin only)
- `PUT /api/fleet/:id` - Update vehicle (admin only)
- `DELETE /api/fleet/:id` - Remove vehicle (admin only)

### Admin (Admin Only)
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - List all users
- `GET /api/admin/quotes` - List all quotes with pagination
- `GET /api/admin/bookings` - List all bookings with pagination

## Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate app password:
   - Google Account → Security → App passwords
   - Generate new app password for "Mail"
3. Use app password in `EMAIL_PASSWORD`

### Other Providers
- **SendGrid**: Use smtp.sendgrid.net:587
- **Mailgun**: Use smtp.mailgun.org:587
- **AWS SES**: Follow AWS documentation

## Security Features
✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Role-based access control
✅ Input validation
✅ Rate limiting (100 req/10min)
✅ Security headers (Helmet.js)
✅ CORS protection
✅ No SQL injection protection

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, whitelist your IP

### Email Not Sending
- Verify email credentials
- Check spam folder
- Use app-specific password (Gmail)

### Port Already in Use
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

## Development Tips

### Using Postman
1. Create new request
2. Set base URL: `http://localhost:5000/api`
3. For protected routes:
   - Authorization → Bearer Token
   - Paste JWT token

### Create Admin User
Since registration always creates regular users (security feature), you need to manually update a user to admin role:

1. Register a user normally
2. Connect to MongoDB:
   ```bash
   mongo transportation
   ```
3. Update user role:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## Full Documentation
See `README.md` for complete API documentation, deployment guides, and advanced features.

## Support
- Documentation: See `README.md`
- Issues: GitHub Issues
- Email: admin@transport.com
