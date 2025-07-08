# E-commerce Frontend

A modern React frontend for the e-commerce application built with Vite, Tailwind CSS, and React Query.

## Features

- **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Beautiful and intuitive user interface
  - Smooth animations and transitions
  - Mobile-first approach

- **User Authentication**
  - Login and registration forms
  - JWT token management
  - Protected routes
  - User profile management

- **Product Management**
  - Product listing with search and filters
  - Product details page
  - Category-based filtering
  - Pagination support
  - Grid and list view modes

- **Shopping Cart**
  - Add/remove items
  - Quantity management
  - Real-time cart updates
  - Cart persistence

- **Order Management**
  - Order creation and tracking
  - Order history
  - Order details view

- **Admin Panel**
  - Product management (CRUD)
  - Order management
  - User management
  - Dashboard with analytics

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + React Query
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── LoadingSpinner.jsx # Loading indicator
├── contexts/           # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── CartContext.jsx # Shopping cart state
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Products.jsx    # Product listing
│   ├── ProductDetail.jsx # Single product view
│   ├── Cart.jsx        # Shopping cart
│   ├── Login.jsx       # Login form
│   ├── Register.jsx    # Registration form
│   ├── Profile.jsx     # User profile
│   ├── Orders.jsx      # Order history
│   └── admin/          # Admin pages
├── services/           # API services
│   └── api.js         # Axios configuration and API calls
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## Key Features

### Authentication
- JWT-based authentication
- Automatic token refresh
- Protected routes
- User role management (Customer/Admin)

### Product Catalog
- Search functionality
- Category filtering
- Price sorting
- Pagination
- Grid/List view toggle

### Shopping Cart
- Persistent cart state
- Real-time updates
- Quantity management
- Cart summary with tax calculation

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Adaptive layouts

## API Integration

The frontend communicates with the backend API through:
- Axios for HTTP requests
- Automatic token injection
- Error handling and retry logic
- Request/response interceptors

## Styling

- **Tailwind CSS** for utility-first styling
- **Custom components** for consistent design
- **Responsive breakpoints** for all devices
- **Dark mode support** (ready for implementation)

## State Management

- **React Context** for global state (auth, cart)
- **React Query** for server state management
- **Local state** for component-specific data
- **LocalStorage** for persistence

## Performance Optimizations

- **Code splitting** with React Router
- **Lazy loading** for components
- **Image optimization** with proper sizing
- **Caching** with React Query
- **Bundle optimization** with Vite

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Code Style
- ESLint configuration
- Prettier formatting
- Consistent naming conventions
- Component documentation

### Testing
- Unit tests (ready for implementation)
- Integration tests (ready for implementation)
- E2E tests (ready for implementation)

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

## Environment Variables

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes.

## Support

For support and questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub 