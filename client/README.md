# Productr Frontend

Modern React-based frontend for the Productr product management application. Built with Vite for optimal performance and developer experience.

## 🚀 Features

- **🔐 Authentication UI**
  - Clean login/signup interface
  - OTP verification flow
  - Session management with JWT

- **📦 Product Management Interface**
  - Product listing with filters
  - Add/Edit product forms
  - Image upload with preview
  - Stock and price management
  - Publish/Unpublish toggle

- **🎨 Modern UI/UX**
  - Pixel-perfect design implementation
  - Responsive layout for all devices
  - Smooth animations and transitions
  - Custom styled components
  - Intuitive navigation

- **⚡ Performance**
  - Fast refresh with Vite
  - Optimized bundle size
  - Lazy loading for routes
  - Image optimization

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **CSS Modules** - Scoped component styling
- **Context API** - State management

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## 🚀 Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment (optional):**

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

If not set, the app will default to `http://localhost:5000`.

3. **Start the development server:**

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📁 Project Structure

```
client/
├── public/
│   └── vite.svg           # Favicon
├── src/
│   ├── assets/            # Images, fonts, and static files
│   │   ├── logo.png
│   │   ├── runner.png
│   │   └── ...
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductForm.jsx
│   │   └── ...
│   ├── context/           # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/             # Page components
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── OTPVerification.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   └── ...
│   ├── services/          # API service layer
│   │   ├── api.js         # Axios instance
│   │   ├── authService.js
│   │   └── productService.js
│   ├── styles/            # Global and component styles
│   │   ├── index.css      # Global styles
│   │   └── *.module.css   # Component-specific styles
│   ├── App.jsx            # Main App component with routing
│   ├── App.css            # App-level styles
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables
├── .gitignore
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎯 Usage

### Authentication Flow

1. **Login/Signup:**
   - Navigate to the login page
   - Enter your email or phone number
   - Click "Send OTP"

2. **OTP Verification:**
   - Enter the OTP: `123456` (mock OTP for development)
   - Click "Verify"
   - You'll be redirected to the dashboard

3. **Session Management:**
   - JWT token is stored in localStorage
   - Automatic redirect to login if token expires
   - Logout clears the session

### Product Management

1. **View Products:**
   - Navigate to the Products page
   - View all products in a grid layout
   - Filter by Published/Unpublished status

2. **Add Product:**
   - Click "Add Product" button
   - Fill in the product details:
     - Name (required)
     - Description (required)
     - Price (required)
     - Stock quantity (required)
     - Upload image (optional)
     - Publish status
   - Click "Save"

3. **Edit Product:**
   - Click "Edit" on any product card
   - Update the desired fields
   - Click "Update"

4. **Delete Product:**
   - Click "Delete" on any product card
   - Confirm the deletion

## 🔌 API Integration

The frontend communicates with the backend API using Axios. All API calls are centralized in the `services/` directory.

### API Service Configuration

```javascript
// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Example API Calls

```javascript
// Login
import { login } from './services/authService';
const response = await login({ email: 'user@example.com' });

// Get Products
import { getProducts } from './services/productService';
const products = await getProducts();

// Create Product
import { createProduct } from './services/productService';
const formData = new FormData();
formData.append('name', 'Product Name');
formData.append('price', 99.99);
formData.append('image', imageFile);
await createProduct(formData);
```

## 🎨 Styling

The application uses a combination of global CSS and CSS Modules for styling.

### Global Styles

Located in `src/styles/index.css`:
- CSS variables for colors and spacing
- Typography
- Reset and base styles
- Utility classes

### Component Styles

Each component has its own CSS Module:
```javascript
import styles from './Component.module.css';

function Component() {
  return <div className={styles.container}>...</div>;
}
```

### Design System

**Colors:**
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Success: `#10b981` (Green)
- Danger: `#ef4444` (Red)
- Background: `#f9fafb` (Light Gray)
- Text: `#1f2937` (Dark Gray)

**Typography:**
- Font Family: Inter, system-ui, sans-serif
- Headings: Bold, various sizes
- Body: Regular, 16px

**Spacing:**
- Base unit: 8px
- Consistent padding and margins

## 📦 Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot module replacement.

### Build

```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Preview

```bash
npm run preview
```
Preview the production build locally.

### Lint

```bash
npm run lint
```
Run ESLint to check for code quality issues.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` directory with optimized static files.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist/` folder to Netlify

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### Environment Variables for Production

Make sure to set the following environment variable in your deployment platform:

```
VITE_API_URL=https://your-backend-api.com
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login with email
- [ ] Verify OTP (123456)
- [ ] View dashboard
- [ ] Navigate to products page
- [ ] Add new product with image
- [ ] Edit existing product
- [ ] Delete product
- [ ] Filter products (Published/Unpublished)
- [ ] Logout
- [ ] Check responsive design on mobile

### Browser Compatibility

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Configuration

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### ESLint Configuration

The project uses ESLint for code quality. Configuration is in `eslint.config.js`.

## 🐛 Troubleshooting

### API Connection Issues

**Problem:** Cannot connect to backend API

**Solution:**
- Ensure backend is running on `http://localhost:5000`
- Check CORS configuration in backend
- Verify `VITE_API_URL` in `.env`

### Build Errors

**Problem:** Build fails with module errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Image Upload Issues

**Problem:** Images not uploading

**Solution:**
- Check file size (max 5MB)
- Verify file type (jpg, png, gif)
- Check backend upload middleware

### Authentication Issues

**Problem:** Token expired or invalid

**Solution:**
- Clear localStorage: `localStorage.clear()`
- Login again to get a new token

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Alt text for images

## 🔒 Security Best Practices

- JWT tokens stored in localStorage
- No sensitive data in client-side code
- Input validation on forms
- XSS protection with React's built-in escaping
- HTTPS in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with React and Vite ⚡**
