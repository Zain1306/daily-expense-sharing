# Daily Expense Sharing Backend

This is a backend service by Zain-Ul-Abdin for a daily expense sharing application. Users can add expenses and split them among participants using three different methods: equal split, exact amounts, or percentage splits. The project is built using **NestJS** and **PostgreSQL** for the database.

## Features

- User management (add, retrieve user details)
- Expense management (add expenses, retrieve individual and overall expenses)
- Expense splitting (equal, exact, percentage-based)
- Downloadable balance sheet as a CSV file
- Input validation and error handling

## Technologies Used

- **NestJS**: Backend framework
- **TypeORM**: ORM for PostgreSQL
- **PostgreSQL**: Database
- **fast-csv**: CSV generation for balance sheets
- **TypeScript**

## Installation and Setup

### Prerequisites

- **Node.js** (version >= 16.x)
- **PostgreSQL** (Ensure you have PostgreSQL installed and running)

### Steps to Run the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/daily-expense-sharing-backend.git
    cd daily-expense-sharing-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Database Configuration:
    - The PostgreSQL connection is already configured in `app.module.ts`.
    - Make sure your PostgreSQL server is running and the credentials (username, password, and database name) in `app.module.ts` match your local PostgreSQL setup:

    ```typescript
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yourpassword', // Ensure this matches your PostgreSQL password
      database: 'daily_expenses',
      synchronize: true, // Use 'false' in production
    })
    ```

4. Run the server:

    ```bash
    npm run start
    ```

5. Your API will be running on `http://localhost:3000`.

### API Endpoints

#### User Endpoints
- `POST /users`: Create a new user.
- `GET /users/:id`: Get user details by ID.

#### Expense Endpoints
- `POST /expenses`: Add a new expense.
- `GET /expenses/user/:id`: Get expenses for a specific user.
- `GET /expenses/overall`: Get overall expenses.
- `GET /balance-sheet/download`: Download the balance sheet as a CSV.

### Testing

You can test the API using **Postman** or **cURL** by sending requests to the endpoints.

### Example Requests

- **Create a User**:
    ```bash
    curl -X POST http://localhost:3000/users \
    -H "Content-Type: application/json" \
    -d '{"name": "John Doe", "email": "john@example.com", "mobile": "1234567890"}'
    ```

- **Add an Expense**:
    ```bash
    curl -X POST http://localhost:3000/expenses \
    -H "Content-Type: application/json" \
    -d '{"totalAmount": 3000, "splitType": "equal", "participants": [1, 2, 3]}'
    ```

### License

This project is licensed under the MIT License.
