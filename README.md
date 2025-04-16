# Mrunal Wonder Backend

A Node.js/Express backend application with MongoDB integration and JWT authentication.

## Features

- User Authentication (Register/Login)
- JWT Token Based Authorization
- MongoDB Database Integration
- Input Validation
- Error Handling
- Security Headers
- Health Check Endpoint

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vishwabhishek/Mrunal_Wonder_BN.git
cd Mrunal_Wonder_BN
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory:
```env
secret=secretKey
MONGODB_URI=mongodb://localhost:27017/Mrunal_project
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_EXPIRES_IN=24h
COOKIE_EXPIRES_IN=24
```

4. Start the server:
```bash
npm start
```

## API Endpoints

- `GET /` - Server status check
- `GET /health` - Application health check
- `POST /register/api` - User registration
- `POST /login/api` - User login
- `GET /home` - Protected route (requires authentication)

## Environment Variables

- `secret` - JWT secret key
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend application URL
- `JWT_EXPIRES_IN` - JWT token expiration time
- `COOKIE_EXPIRES_IN` - Cookie expiration time

## Security Features

- Input validation
- JWT authentication
- Security headers
- Request size limiting
- CORS configuration
- Error handling middleware

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 