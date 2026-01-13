# Productr Backend API

RESTful API server for the Productr application built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication API**
  - Mock OTP-based authentication
  - JWT token generation and validation
  - Protected route middleware

- **Product Management API**
  - CRUD operations for products
  - Image upload handling
  - Stock management
  - Publish/Unpublish functionality

- **Database**
  - MongoDB with Mongoose ODM
  - Schema validation
  - Data seeding utilities

- **Security**
  - JWT authentication
  - CORS configuration
  - Environment variable protection
  - File upload validation

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload middleware
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🚀 Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

Create a `.env` file in the root of the server directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/productr
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Important:** Change the `JWT_SECRET` to a secure random string in production.

3. **Start MongoDB:**

Make sure MongoDB is running on your system:

```bash
# For local MongoDB
mongod
```

Or use MongoDB Atlas and update the `MONGO_URI` accordingly.

4. **Run the server:**

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # Database connection configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── productController.js # Product CRUD logic
├── middleware/
│   ├── auth.js            # JWT authentication middleware
│   └── upload.js          # File upload middleware (Multer)
├── models/
│   ├── User.js            # User schema
│   └── Product.js         # Product schema
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   └── productRoutes.js   # Product routes
├── uploads/               # Uploaded product images
├── .env                   # Environment variables (not in git)
├── .gitignore
├── index.js               # Application entry point
├── seeder.js              # Database seeder script
├── package.json
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication

#### Login / Send OTP
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "OTP sent successfully",
  "mockOTP": "123456"
}
```

#### Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### Products

All product endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Products
```http
GET /api/products
```

**Response:**
```json
[
  {
    "_id": "product_id",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "stock": 50,
    "image": "/uploads/image.jpg",
    "isPublished": true,
    "createdAt": "2026-01-13T10:00:00.000Z"
  }
]
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product
```http
POST /api/products
Content-Type: multipart/form-data

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "stock": 50,
  "image": <file>,
  "isPublished": true
}
```

#### Update Product
```http
PUT /api/products/:id
Content-Type: multipart/form-data

{
  "name": "Updated Product Name",
  "description": "Updated description",
  "price": 89.99,
  "stock": 45,
  "image": <file> (optional),
  "isPublished": false
}
```

#### Delete Product
```http
DELETE /api/products/:id
```

## 🗄️ Database Models

### User Model

```javascript
{
  email: String (required, unique),
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  stock: Number (required, default: 0),
  image: String,
  isPublished: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## 🌱 Database Seeding

To populate the database with sample data:

```bash
node seeder.js
```

This will create sample products in your database for testing purposes.

## 🔒 Authentication Flow

1. User enters email/phone on the frontend
2. Frontend calls `/api/auth/login`
3. Backend returns mock OTP (always `123456` for development)
4. User enters OTP on frontend
5. Frontend calls `/api/auth/verify-otp` with email and OTP
6. Backend validates OTP and returns JWT token
7. Frontend stores token and includes it in subsequent API requests
8. Backend middleware validates token for protected routes

## 🧪 Testing

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Verify OTP:**
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","otp":"123456"}'
```

**Get Products (with auth):**
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

1. Import the API endpoints
2. Set up environment variables for base URL and token
3. Test each endpoint with sample data

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `5000` |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |

## 📦 Dependencies

### Production Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT implementation
- **multer** - File upload handling
- **cors** - CORS middleware
- **dotenv** - Environment variables

### Development Dependencies

- **nodemon** - Auto-restart on file changes

## 🚀 Deployment

### Deploying to Heroku

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set MONGO_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key
```

3. Deploy:
```bash
git push heroku main
```

### Deploying to Railway/Render

1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically on push

### Using PM2 (Production Server)

```bash
npm install -g pm2
pm2 start index.js --name productr-api
pm2 save
pm2 startup
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### File Upload Issues

- Check `uploads/` directory exists and has write permissions
- Verify Multer configuration in `middleware/upload.js`
- Check file size limits

## 📝 API Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📄 License

MIT License

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with Node.js and Express.js**
