# ShopEase — E-Commerce Web Application

ShopEase is a full-stack e-commerce web application built using Node.js, Express.js, MongoDB, and EJS. It provides product browsing, user authentication, shopping cart functionality, and product reviews.

## Features

- **Product Management:** Browse products and view product details.
- **User Authentication:** User registration, login, and logout using Passport.js.
- **Shopping Cart:** Manage cart-related operations.
- **Product Reviews:** Create and manage product reviews.
- **Server-Side Rendering:** Dynamic web pages rendered using EJS templates.
- **Session Management:** Maintain authenticated user sessions.
- **Database Integration:** Store application data using MongoDB and Mongoose.
- **Flash Messages:** Display success and error notifications.

## Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript
- EJS
- EJS-Mate

**Backend**
- Node.js
- Express.js
- Passport.js
- Express Session
- Connect Flash
- Method Override

**Database**
- MongoDB
- Mongoose

## Project Structure

```text
ShopEase/
├── backend/
│   ├── models/
│   ├── routes/
│   │   └── api/
│   ├── app.js
│   ├── middleware.js
│   ├── schema.js
│   ├── package.json
│   └── seed.js
├── frontend/
│   ├── public/
│   └── views/
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or a MongoDB instance
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mr-tech9580/ShopEase.git
   cd ShopEase
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file inside the `backend` directory:

   ```dotenv
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secure_random_secret
   ```

4. Start the application:

   ```bash
   node app.js
   ```

5. Open the application in your browser:

   `http://localhost:8080`

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `SESSION_SECRET` | Secret used to sign session cookies |

Keep your `.env` file private. Never commit database credentials or application secrets to GitHub.

## Deployment

The application can be deployed as a Node.js web service on Render, with MongoDB Atlas providing the database.

Configure the environment variables in the hosting platform before deployment.

## Author

**Megha Rajpurohit**

GitHub: [mr-tech9580](https://github.com/mr-tech9580)