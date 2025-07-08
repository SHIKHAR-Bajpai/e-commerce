# E-Commerce Full-Stack Application

A modern full-stack e-commerce application built with Node.js, MongoDB, React, and Vite. Features include user authentication, product management, shopping cart, order processing, and admin dashboard.

## 🚀 Features

### User Features
- **User Authentication**: Register, login, and profile management
- **Product Browsing**: View products with search and category filtering
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders, view order history and details
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Product Management**: Add, edit, delete products
- **Order Management**: View all orders, mark as delivered
- **User Management**: View user information
- **Admin Dashboard**: Comprehensive admin interface

### Technical Features
- **JWT Authentication**: Secure user sessions
- **File Upload**: Product image uploads
- **Real-time Updates**: Live cart and order updates
- **Error Handling**: Comprehensive error management
- **Loading States**: Smooth user experience

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
e-commerce/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── config.env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── AdminOrders.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminProductsEdit.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OrderDetail.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `config.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
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
   Navigate to `http://localhost:5173`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/admin` - Get all products for admin
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/admin` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/deliver` - Mark order as delivered (admin only)

## 👤 User Roles

### Customer
- Browse products
- Add items to cart
- Place orders
- View order history
- Manage profile

### Admin
- All customer features
- Manage products (CRUD)
- View all orders
- Mark orders as delivered
- Access admin dashboard

## 🔧 Configuration

### Environment Variables

**Backend (`config.env`)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### Database Schema

**User Model**
- name, email, password, role (customer/admin)

**Product Model**
- name, description, price, category, image, stock, rating, numReviews

**Order Model**
- user, items, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt

**Cart Model**
- user, items (product, quantity, price)

## 🎨 Styling

The application uses **Tailwind CSS** for styling with custom components:
- Responsive design
- Modern UI components
- Consistent color scheme
- Mobile-first approach

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Input validation
- CORS configuration
- Environment variable protection

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub

## 🎯 Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Email notifications
- Product reviews and ratings
- Wishlist functionality
- Advanced search and filtering
- Multi-language support
- PWA features
- Real-time chat support 