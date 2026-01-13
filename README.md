# Productr - Full Stack Product Management Application

A modern, full-stack web application for product management built with the MERN stack. Features a pixel-perfect UI with authentication, product CRUD operations, and image upload capabilities.

![Productr](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

- **🔐 Authentication System**
  - Email/Phone-based login
  - Mock OTP verification (Use `123456` for testing)
  - JWT-based session management
  - Protected routes and API endpoints

- **📦 Product Management**
  - Create, Read, Update, Delete (CRUD) operations
  - Image upload with preview
  - Stock management
  - Price tracking
  - Publish/Unpublish functionality
  - Product filtering and search

- **🎨 Modern UI/UX**
  - Pixel-perfect design implementation
  - Responsive layout
  - Clean and intuitive interface
  - Custom styled components
  - Smooth animations and transitions

- **🔒 Security**
  - JWT authentication
  - Protected API routes
  - Secure file uploads
  - Environment variable configuration

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS Modules** - Scoped styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally on port 27017 or MongoDB Atlas account)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd orphy
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/productr
JWT_SECRET=your_super_secret_jwt_key_here
```

**Note:** Update `MONGO_URI` if using MongoDB Atlas or a different configuration.

Start the backend server:

```bash
npm run dev
```

The server will run on `http://localhost:5001`

### 3. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (optional):

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

Start the frontend development server:

```bash
npm run dev
```

The client will run on `http://localhost:5173`

## 📁 Project Structure

```
orphy/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth, etc.)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── .env               # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── uploads/          # Uploaded files
│   ├── .env              # Environment variables
│   ├── .gitignore
│   ├── index.js          # Entry point
│   ├── seeder.js         # Database seeder
│   └── package.json
│
└── README.md             # This file
```

## 🎯 Usage

### Authentication

1. Open the application at `http://localhost:5173`
2. Enter any email address or phone number
3. Click "Send OTP"
4. Enter the mock OTP: `123456`
5. You'll be redirected to the dashboard

### Managing Products

1. Navigate to the "Products" section
2. Click "Add Product" to create a new product
3. Fill in the product details:
   - Name
   - Description
   - Price
   - Stock quantity
   - Upload an image
4. Click "Save" to create the product
5. View, edit, or delete products from the product list
6. Toggle publish/unpublish status

### Filtering Products

- Use the filter options to view:
  - All products
  - Published products only
  - Unpublished products only

## 🧪 Testing

### Mock Data

The application includes a seeder script to populate the database with sample data:

```bash
cd server
node seeder.js
```

### Test Credentials

- **OTP**: `123456` (works for any email/phone)

## 📦 Building for Production

### Frontend

```bash
cd client
npm run build
```

The production-ready files will be in the `client/dist` directory.

### Backend

```bash
cd server
npm start
```

For production deployment, consider using PM2 or similar process managers.

## 🔧 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5001` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/productr` |
| `JWT_SECRET` | Secret key for JWT | `your_secret_key` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5001/api` |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- MERN stack community
- All contributors and testers

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
