# HelpHub

A complete full-stack application with React frontend and Node.js backend including user authentication (signup/login).

## Project Structure

```
helphub/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── pages/     # Login, Signup, Home pages
│   │   ├── component/ # Reusable components
│   │   ├── context/   # Auth context for state management
│   │   ├── styles/    # CSS styles
│   │   ├── App.js     # Main app component
│   │   └── index.js   # Entry point
│   ├── public/        # Public assets
│   └── package.json
│
└── backend/           # Express backend API
    ├── routes/        # API routes (auth)
    ├── models/        # Database models
    ├── server.js      # Main server file
    ├── .env.example   # Environment variables example
    └── package.json
```

## Frontend Setup

### Install Dependencies
```bash
cd frontend
npm install
```

### Start Development Server
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Backend Setup

### Install Dependencies
```bash
cd backend
npm install
```

### Configure Environment
1. Copy `.env.example` to `.env`
2. Update the environment variables as needed

### Start Development Server
```bash
npm run dev
```

The backend API will run on `http://localhost:5000`

## Features

### Frontend
- User login page
- User signup page
- Home page (protected route)
- Authentication context for state management
- Responsive design with modern styling

### Backend
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Login user
- Password hashing with bcryptjs
- JWT token generation
- Input validation

## Default Credentials

You can create a test account by:
1. Going to the signup page (`http://localhost:3000/signup`)
2. Enter your details and submit
3. Login with your credentials

## Next Steps

To make this production-ready:
1. Connect MongoDB database
2. Add database models for users
3. Implement refresh tokens
4. Add email verification
5. Add password reset functionality
6. Add more pages and features
7. Deploy to production servers

## Scripts

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Backend
- `npm start` - Start server
- `npm run dev` - Start with nodemon (auto-reload)
