# Transportation Company - Backend API

A comprehensive RESTful API backend for the Transportation Company website, built with Node.js, Express, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication** - JWT-based authentication with role-based access control
- **Quote Management** - Handle transportation quote requests with email notifications
- **Booking System** - Complete booking management with status tracking
- **Fleet Management** - Vehicle inventory management with filtering
- **Admin Dashboard** - Statistics and management interface
- **Email Notifications** - Automated email confirmations and updates
- **Security** - Helmet, CORS, rate limiting, input validation
- **API Documentation** - RESTful design with clear endpoints

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Gmail account (or SMTP server) for email functionality

## 🛠️ Installation

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/transportation

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=30d

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Transportation Company <noreply@transport.com>
ADMIN_EMAIL=admin@transport.com

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 4. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get connection string
3. Update `MONGODB_URI` in `.env` with your Atlas connection string

### 5. Email Configuration

**Gmail Setup:**
1. Enable 2-factor authentication on your Gmail account
2. Generate an app-specific password:
   - Go to Google Account Settings → Security
   - Under "Signing in to Google," select "App passwords"
   - Generate a new app password for "Mail"
3. Use this app password in `EMAIL_PASSWORD` field

**Alternative SMTP Providers:**
- SendGrid: `smtp.sendgrid.net` (Port 587)
- Mailgun: `smtp.mailgun.org` (Port 587)
- AWS SES: Configure according to AWS documentation

## 🚀 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT)

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User

**POST** `/api/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "jwt_token_here"
  },
  "message": "User registered successfully"
}
```

### Login

**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "jwt_token_here"
  },
  "message": "Login successful"
}
```

### Get Current User

**GET** `/api/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## 📝 Quote Endpoints

### Submit Quote Request (Public)

**POST** `/api/quotes`

**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "company": "ABC Corp",
  "serviceType": "freight",
  "origin": "New York, NY",
  "destination": "Los Angeles, CA",
  "cargoDetails": "Electronics - 500 kg",
  "message": "Need urgent delivery"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Jane Smith",
    "status": "pending",
    "createdAt": "..."
  },
  "message": "Quote request submitted successfully"
}
```

### Get All Quotes (Admin)

**GET** `/api/quotes?page=1&limit=10&status=pending`

**Headers:** `Authorization: Bearer <admin_token>`

### Get Single Quote (Admin)

**GET** `/api/quotes/:id`

**Headers:** `Authorization: Bearer <admin_token>`

### Update Quote (Admin)

**PUT** `/api/quotes/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Body:**
```json
{
  "status": "quoted"
}
```

### Delete Quote (Admin)

**DELETE** `/api/quotes/:id`

**Headers:** `Authorization: Bearer <admin_token>`

---

## 🚗 Booking Endpoints

### Create Booking (Authenticated)

**POST** `/api/bookings`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "pickupLocation": "123 Main St, New York",
  "dropoffLocation": "456 Oak Ave, Boston",
  "vehicleType": "van",
  "scheduledDate": "2024-02-15T10:00:00Z",
  "scheduledTime": "10:00 AM",
  "passengers": 4,
  "specialRequirements": "Child seat required",
  "totalPrice": 250
}
```

### Get Bookings

**GET** `/api/bookings?page=1&limit=10&status=pending`

**Headers:** `Authorization: Bearer <token>`

- Regular users: Returns their own bookings
- Admin users: Returns all bookings with filters

### Get Single Booking

**GET** `/api/bookings/:id`

**Headers:** `Authorization: Bearer <token>`

### Update Booking

**PUT** `/api/bookings/:id`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "status": "confirmed",
  "totalPrice": 275
}
```

### Cancel Booking

**DELETE** `/api/bookings/:id`

**Headers:** `Authorization: Bearer <token>`

---

## 🚚 Fleet Endpoints

### Get All Vehicles (Public)

**GET** `/api/fleet?page=1&limit=10&vehicleType=truck&status=available&search=ford`

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `vehicleType` - Filter by type: truck, van, car, bus
- `status` - Filter by status: available, in-use, maintenance
- `available` - Set to "true" to show only available vehicles
- `search` - Search by vehicle name or model

### Get Single Vehicle (Public)

**GET** `/api/fleet/:id`

### Add Vehicle (Admin)

**POST** `/api/fleet`

**Headers:** `Authorization: Bearer <admin_token>`

**Body:**
```json
{
  "vehicleName": "Ford Transit Van",
  "vehicleType": "van",
  "capacity": "12 passengers",
  "model": "Ford Transit 350",
  "year": 2023,
  "licensePlate": "ABC123",
  "status": "available",
  "features": ["GPS", "Air Conditioning", "Bluetooth"],
  "imageUrl": "https://example.com/vehicle.jpg",
  "pricePerHour": 45,
  "pricePerDay": 300
}
```

### Update Vehicle (Admin)

**PUT** `/api/fleet/:id`

**Headers:** `Authorization: Bearer <admin_token>`

### Delete Vehicle (Admin)

**DELETE** `/api/fleet/:id`

**Headers:** `Authorization: Bearer <admin_token>`

---

## 📊 Admin Dashboard Endpoints

### Get Dashboard Statistics

**GET** `/api/admin/dashboard`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "quotes": {
      "total": 150,
      "pending": 23,
      "reviewed": 45,
      "quoted": 82
    },
    "bookings": {
      "total": 200,
      "pending": 12,
      "confirmed": 45,
      "inProgress": 8,
      "completed": 130,
      "cancelled": 5
    },
    "fleet": {
      "total": 25,
      "available": 18,
      "inUse": 5,
      "maintenance": 2
    },
    "users": {
      "total": 350,
      "admin": 3,
      "regular": 347
    },
    "revenue": {
      "total": 45000,
      "average": 225
    },
    "recentActivities": {
      "quotes": [...],
      "bookings": [...]
    }
  }
}
```

### Get All Users (Admin)

**GET** `/api/admin/users?page=1&limit=20&role=user`

**Headers:** `Authorization: Bearer <admin_token>`

### Get All Quotes (Admin)

**GET** `/api/admin/quotes?page=1&limit=20&status=pending`

**Headers:** `Authorization: Bearer <admin_token>`

### Get All Bookings (Admin)

**GET** `/api/admin/bookings?page=1&limit=20&status=confirmed&vehicleType=van`

**Headers:** `Authorization: Bearer <admin_token>`

---

## 📧 Email Templates

The system automatically sends emails for:

1. **Welcome Email** - When a new user registers
2. **Quote Confirmation** - When a quote request is submitted (to customer)
3. **Quote Notification** - When a quote request is submitted (to admin)
4. **Booking Confirmation** - When a booking is created
5. **Booking Status Update** - When booking status changes

All emails use professional HTML templates with company branding.

---

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Role-Based Access Control** - Admin vs User permissions
- **Input Validation** - express-validator on all inputs
- **Rate Limiting** - 100 requests per 10 minutes per IP
- **Helmet.js** - Security headers
- **CORS** - Configurable cross-origin requests
- **MongoDB Injection Protection** - Mongoose built-in sanitization

---

## 🧪 Testing the API

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Submit quote (public):**
```bash
curl -X POST http://localhost:5000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "serviceType": "freight",
    "origin": "New York",
    "destination": "Boston"
  }'
```

### Using Postman

1. Import the endpoints into Postman
2. Set base URL: `http://localhost:5000/api`
3. For protected routes:
   - Go to Authorization tab
   - Select "Bearer Token"
   - Paste your JWT token

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, validated),
  password: String (required, hashed, min 6 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date
}
```

### Quote Schema
```javascript
{
  name: String (required),
  email: String (required, validated),
  phone: String (required),
  company: String,
  serviceType: String (enum: freight/logistics/warehousing/distribution/supply-chain/other),
  origin: String (required),
  destination: String (required),
  cargoDetails: String,
  message: String (max 500 chars),
  status: String (enum: pending/reviewed/quoted, default: pending),
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Schema
```javascript
{
  userId: ObjectId (ref: User, required),
  customerName: String (required),
  email: String (required, validated),
  phone: String (required),
  pickupLocation: String (required),
  dropoffLocation: String (required),
  vehicleType: String (enum: truck/van/car/bus/other),
  scheduledDate: Date (required, must be future),
  scheduledTime: String (required),
  passengers: Number (min: 1, default: 1),
  specialRequirements: String (max 500 chars),
  status: String (enum: pending/confirmed/in-progress/completed/cancelled),
  totalPrice: Number (min: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Fleet Schema
```javascript
{
  vehicleName: String (required),
  vehicleType: String (enum: truck/van/car/bus),
  capacity: String (required),
  model: String (required),
  year: Number (required, min: 1990),
  licensePlate: String (required, unique),
  status: String (enum: available/in-use/maintenance),
  features: [String],
  imageUrl: String,
  pricePerHour: Number (min: 0),
  pricePerDay: Number (min: 0),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

### Environment Variables for Production

Update your `.env` file:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_very_secure_secret_key
CORS_ORIGIN=https://your-frontend-domain.com
```

### Deployment Platforms

**Heroku:**
```bash
# Install Heroku CLI and login
heroku create your-app-name
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

**Railway:**
1. Connect your GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically

**DigitalOcean App Platform:**
1. Connect repository
2. Configure environment variables
3. Deploy

**AWS EC2:**
1. Set up EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Configure environment
5. Use PM2 for process management

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: "MongooseServerSelectionError"**
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check `MONGODB_URI` in `.env`
- For Atlas, whitelist your IP address

### Email Not Sending

**Gmail:**
- Enable "Less secure app access" or use App Password
- Check EMAIL_USER and EMAIL_PASSWORD in `.env`

### JWT Token Issues

**Error: "jwt malformed" or "invalid token"**
- Ensure token is sent with "Bearer " prefix
- Check JWT_SECRET matches between registration and login

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

---

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": []
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: admin@transport.com

---

## 🎯 Future Enhancements

- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Real-time notifications (WebSockets)
- [ ] File upload for documents
- [ ] Payment integration (Stripe/PayPal)
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] API versioning
- [ ] GraphQL endpoint

---

Built with ❤️ using Node.js, Express, and MongoDB
