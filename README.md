# UAS Server - Register User Module

This is the server-side implementation of the UAS (University Admission System) with a complete Register User module supporting Undergraduate and Graduate roles.

## Features

- **User Registration** with role-based system (Undergraduate/Graduate)
- **JWT Authentication** with secure token management
- **Input Validation** using Joi schemas
- **Password Hashing** with bcryptjs
- **MongoDB Integration** with Mongoose ODM
- **TypeScript** for type safety
- **Security Middleware** (Helmet, CORS, Rate Limiting)

## User Roles

1. **Undergraduate** - First-year students applying for undergraduate programs
2. **Graduate** - Students applying for Masters/Doctorate programs

## API Endpoints

### Authentication Routes

#### POST `/api/auth/register`
Register a new user with role selection.

**Request Body:**
```json
{
  "email": "saadatullah21@gmail.com",
  "password": "Gopemario123@",
  "fullName": "Saadat Ullah",
  "dob": "2002-07-23",
  "phone": "+92 3095387562",
  "address": "Block 12, Pha Flats, G8,",
  "role": "undergraduate"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "saadatullah21@gmail.com",
      "fullName": "Saadat Ullah",
      "role": "undergraduate",
      "isEmailVerified": false,
      "isPhoneVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "saadatullah21@gmail.com",
  "password": "Gopemario123@"
}
```

#### GET `/api/auth/me`
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### GET `/api/auth/users/:role`
Get all users by role (requires authentication).

**URL Parameters:**
- `role`: `undergraduate` or `graduate`

## Validation Rules

### Email
- Must be a valid email format
- Required field

### Password
- Minimum 10 characters, maximum 32 characters
- Must contain at least:
  - One uppercase letter
  - One lowercase letter
  - One number
  - One special character (@$!%*?&)
- No spaces allowed

### Full Name
- Minimum 2 characters, maximum 100 characters
- Only letters and spaces allowed
- Required field

### Date of Birth
- Must be a valid date
- Cannot be in the future
- User must be at least 16 years old
- Required field

### Phone Number
- Must be a valid international phone number format
- Required field

### Address
- Minimum 10 characters, maximum 500 characters
- Required field

### Role
- Must be either `undergraduate` or `graduate`
- Required field

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Copy `env.example` to `.env` and configure:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/uas-database
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLIENT_URL=http://localhost:3000
   ```

3. **Database Setup:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in `.env` file

4. **Development:**
   ```bash
   npm run dev
   ```

5. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── controllers/
│   └── authController.ts    # Authentication logic
├── middleware/
│   └── auth.ts             # JWT authentication middleware
├── models/
│   └── User.ts             # User model with roles
├── routes/
│   └── auth.ts             # Authentication routes
├── validations/
│   └── auth.ts             # Input validation schemas
└── index.ts                # Main server file
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Tokens**: Secure authentication with 7-day expiration
- **Input Validation**: Comprehensive validation using Joi
- **Rate Limiting**: Prevents abuse with request limiting
- **CORS Protection**: Configured for secure cross-origin requests
- **Helmet**: Security headers for Express

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"] // For validation errors
}
```

## Testing the API

You can test the registration endpoint with the provided payload:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "saadatullah21@gmail.com",
    "password": "Gopemario123@",
    "fullName": "Saadat Ullah",
    "dob": "2002-07-23",
    "phone": "+92 3095387562",
    "address": "Block 12, Pha Flats, G8,",
    "role": "undergraduate"
  }'
```

## Database Schema

The User model includes:
- Email (unique, indexed)
- Password (hashed)
- Full Name
- Date of Birth (with age validation)
- Phone Number
- Address
- Role (enum: undergraduate/graduate)
- Email verification status
- Phone verification status
- Timestamps (createdAt, updatedAt)

## Next Steps

1. Implement email verification system
2. Add phone verification via SMS
3. Create user profile management
4. Add role-based access control for different features
5. Implement password reset functionality
6. Add user search and filtering capabilities
