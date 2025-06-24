# Calm Counseling Connect

A comprehensive counseling appointment booking system with React frontend and Node.js/Express backend.

## Features

- 🔐 User authentication (login/register)
- 📅 Appointment booking and management
- 👨‍⚕️ Counselor profiles and availability
- 🛠️ Service management
- 📱 Responsive design
- 🎨 Modern UI with shadcn/ui components
- 🔄 Real-time state management with Redux Toolkit
- 🚀 API integration with RTK Query

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **RTK Query** for API calls
- **React Router** for navigation
- **shadcn/ui** for UI components
- **Tailwind CSS** for styling
- **Sonner** for toast notifications

### Backend
- **Node.js** with TypeScript
- **Express.js** framework
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## Project Structure

```
intellweb/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.ts       # Main server file
│   └── package.json
└── calm-counseling-connect/ # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── hooks/          # Custom hooks
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── slices/         # Redux slices
    │   ├── store.ts        # Redux store
    │   └── main.tsx        # App entry point
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/counseling-app
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The backend will be running on `http://localhost:8080`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd calm-counseling-connect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will be running on `http://localhost:3000`

## API Integration

The frontend is fully connected to the backend through:

### 1. **API Configuration**
- Base URL: `/api` (proxied to `http://localhost:8080/api`)
- Authentication headers automatically included
- CORS configured for cross-origin requests

### 2. **Redux Toolkit Query Setup**
- Centralized API slice with authentication
- Automatic token management
- Error handling and loading states
- Cache invalidation and optimistic updates

### 3. **Available API Endpoints**

#### Authentication
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `POST /api/users/logout` - User logout
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

#### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

#### Counselors
- `GET /api/counselors` - Get all counselors
- `GET /api/counselors/:id` - Get counselor by ID
- `POST /api/counselors` - Create new counselor
- `PUT /api/counselors/:id` - Update counselor
- `DELETE /api/counselors/:id` - Delete counselor

#### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `GET /api/appointments/user` - Get user's appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `PUT /api/appointments/:id/cancel` - Cancel appointment

### 4. **Custom Hooks**

#### `useAuth()`
Provides authentication state and actions:
```typescript
const { 
  user, 
  isAuthenticated, 
  isAdmin, 
  isCounselor,
  login, 
  register, 
  logout 
} = useAuth();
```

#### API Hooks
All API endpoints are available as React hooks:
```typescript
// Services
const { data: services, isLoading } = useGetServicesQuery();
const [createService] = useCreateServiceMutation();

// Appointments
const { data: appointments } = useGetUserAppointmentsQuery();
const [bookAppointment] = useCreateAppointmentMutation();
```

## Development

### Running Both Servers

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd calm-counseling-connect
   npm run dev
   ```

### Building for Production

1. **Backend:**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Frontend:**
   ```bash
   cd calm-counseling-connect
   npm run build
   ```

## Environment Variables

### Backend (.env)
```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/counseling-app
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Calm Counseling Connect
VITE_APP_VERSION=1.0.0
```

## Authentication Flow

1. User registers/logs in through the frontend
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage and Redux state
4. All subsequent API calls include the token in Authorization header
5. Backend middleware validates token for protected routes

## Error Handling

- Global error handling in RTK Query
- Toast notifications for user feedback
- Proper HTTP status codes
- Validation error messages

## Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- CORS configuration
- Protected routes with middleware
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
