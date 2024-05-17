# Finance Management System

## Overview
The Finance Management System is designed to help users manage their personal finances, providing functionalities for transaction management, goal tracking, and financial insights. This project is built using Node.js with Express for the backend, React for the frontend, MongoDB for data storage, and JWT (JSON Web Tokens) for secure and scalable user authentication.

![Demo](https://github.com/tahsharaboochee/financial-management/blob/main/Finance-app-short-demo.gif?raw=true)

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB Atlas account
- React

### Setting Up the Project

1. **Clone the Repository**
```
   git clone https://github.com/tahsharaboochee/finance-management.git
   cd finance-management
```

2. **Set Up Environment Variables**
- Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret:
  ```
  MONGO_URI=your_mongo_uri
  JWT_SECRET=your_jwt_secret
  ```

3. **Install Dependencies**
- For the backend:
  ```
  cd finance-app
  npm install
  ```
- For the frontend:
  ```
  cd ../finance-app-client
  npm install
  ```

4. **Start the Server**
- For the backend:
  ```
  cd ../finance-app
  npm start
  ```
- For the frontend:
  ```
  cd ../finance-app-client
  npm start
  ```

5. **Open the Application**
- Visit `http://localhost:3001` in your browser to see the application.

## Dependencies

- **Back-end:**
- Express: minimalist web framework for Node.js.
- Mongoose: Elegant MongoDB object modeling for Node.js.
- bcrypt: Library to hash passwords.
- jsonwebtoken: JSON Web Token implementation.

- **Front-end:**
- React: A JavaScript library for building user interfaces.
- axios: Promise based HTTP client for the browser and node.js.
- Chart.js: Simple yet flexible JavaScript charting.

## API Endpoints

### User Authentication Routes
- **POST /api/register**: Register a new user.
- **POST /api/login**: Login a user and return a JWT.
- **POST /api/logout**: Logout a user.

### Transaction Management Routes
- **GET /api/transactions**: Retrieve all transactions for the authenticated user.
- **POST /api/transactions**: Add a new transaction.
- **PATCH /api/transactions/:id**: Update an existing transaction.
- **DELETE /api/transactions/:id**: Delete a transaction.

### Goals Management Routes
- **GET /api/goals**: Retrieve all goals for the authenticated user.
- **POST /api/goals**: Add a new goal.
- **PATCH /api/goals/:id**: Update an existing goal.
- **DELETE /api/goals/:id**: Delete a goal.

### Insights and Reports Routes
- **GET /api/dashboard**: 
    - Get monthly report for the authenticated user.
    - Get spending by category for the authenticated user.
    - Get progress on financial goals for the authenticated user.

## Front End Development

### Components
- **User Authentication Forms**: Secure forms for user registration and login.
- **Dashboard**: Overview of transactions, goals, and insights.
- **Transaction Management Interface**: Forms and lists for managing transactions.
- **Goals Interface**: Interface for setting and tracking goals.
- **Reports and Insights**: Graphs and statistics showing financial health and habits.

## Authentication System

- Implement JWT for authentication: Upon login, generate a token and store it in the client-side. Use this token for subsequent API requests to validate user sessions.
- Secure password storage using hashing (e.g., bcrypt).

## Insights and Reporting

- Utilize data visualization libraries like Chart.js in React to create insightful charts and graphs.
- Process transaction data to generate monthly reports, spending by category, savings progress, etc.

Each of these routes incorporates necessary security measures such as:

- Authentication checks to ensure that only logged-in users can access specific functionalities like visiting the dashboard or creating goals or transactions.
- Authorization checks to restrict sensitive actions (like editing or deleting goals/transactions).

These routes form the backbone of the application, ensuring it operates securely and efficiently while providing users with a robust set of features tailored to financial management.


## Tests

- **mocha**: For running tests.
- **chai**: For assertions.

### Summary of Test

#### User Authentication Tests
- **User Registration Test**: Verifies that a new user can register successfully, ensuring that all required fields are provided and the password is hashed before storing in the database.
- **User Login Test**: Ensures that a user can log in with correct credentials and receive a JWT token for authentication.
- **User Logout Test**: Confirms that the logout process invalidates the user's session.

#### Transaction Management Tests
- **Transaction Creation Test**: Validates that a user can create a new transaction with all required fields, including type, amount, category, and date.
- **Transaction Retrieval Test**: Ensures that all transactions for the authenticated user can be retrieved successfully.
- **Transaction Update Test**: Verifies that an existing transaction can be updated with new values, ensuring the changes are reflected in the database.
- **Transaction Deletion Test**: Confirms that a transaction can be deleted successfully and is removed from the database.

#### Goals Management Tests
- **Goal Creation Test**: Validates that a user can create a new financial goal with all required fields, including target amount, current amount, description, and deadline.
- **Goal Retrieval Test**: Ensures that all financial goals for the authenticated user can be retrieved successfully.
- **Goal Update Test**: Verifies that an existing goal can be updated with new values, ensuring the changes are reflected in the database.
- **Goal Deletion Test**: Confirms that a financial goal can be deleted successfully and is removed from the database.

These tests are essential for maintaining the integrity and functionality of the Finance Management System, ensuring that all critical features work as expected and providing a robust user experience.

## Additional Notes
For more information on commands and management, refer to the official documentation of the used libraries and frameworks.
