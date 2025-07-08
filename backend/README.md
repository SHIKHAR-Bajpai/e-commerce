# E-commerce Backend API

A complete Node.js/Express backend for an e-commerce application with MongoDB, JWT authentication, and role-based access control.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Customer/Admin)
  - User registration and login
  - Profile management

- **Product Management**
  - CRUD operations for products
  - Product search and filtering
  - Pagination support
  - Category-based filtering
  - Stock management

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Cart persistence
  - Stock validation

- **Order Management**
  - Create orders from cart
  - Order history
  - Payment status tracking
  - Shipping address management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: Enabled for frontend integration

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `config.env` and update the values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas (cloud service)

5. **Seed the database (optional)**
   ```bash
   npm run seeder
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with pagination & search)
- `GET /api/products/categories` - Get all categories
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Mark order as paid
- `PUT /api/orders/:id/deliver` - Mark order as delivered (Admin only)
- `GET /api/orders` - Get all orders (Admin only)

## Sample Data

After running the seeder, you'll have:

**Admin User:**
- Email: admin@example.com
- Password: admin123

**Customer User:**
- Email: customer@example.com
- Password: customer123

**Sample Products:**
- 8 different products across various categories
- Electronics, Clothing, Fashion, Home & Kitchen, Sports

## Database Models

### User
- name, email, password, role, createdAt

### Product
- name, description, price, category, image, stock, rating, numReviews, isActive

### Cart
- user, items[], total, createdAt, updatedAt

### Order
- user, items[], shippingAddress, paymentMethod, totalPrice, isPaid, isDelivered, status

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based route protection
- Input validation and sanitization
- CORS configuration
- Error handling middleware

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seeder` - Import sample data
- `npm run seeder -d` - Clear all data

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

## API Response Format

### Success Response
```json
{
  "data": {...},
  "message": "Success message"
}
```

### Error Response
```json
{
  "message": "Error message",
  "errors": [...]
}
```

## Testing the API

You can test the API using tools like:
- Postman
- Insomnia
- Thunder Client (VS Code extension)
- curl commands

### Example curl commands:

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get products:**
```bash
curl -X GET http://localhost:5000/api/products
```

## License

This project is for educational purposes. 