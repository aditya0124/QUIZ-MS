# Quiz API

## Project Setup

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the necessary environment variables (e.g., database URI, JWT secret, etc.).
4. Start the server:
   ```sh
   npm start
   ```
   The server will start on `http://localhost:5000/` (default).

---

## API Documentation

### Authentication Routes

#### Register a new user
**Endpoint:** `POST /register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": { "id": "123", "name": "John Doe", "email": "john@example.com" }
  }
  ```

#### Login user
**Endpoint:** `POST /login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt-token"
  }
  ```

#### Logout user
**Endpoint:** `GET /logout`
- **Response:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

#### Get user profile
**Endpoint:** `GET /profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

---

### Quiz Routes

#### Create a new quiz
**Endpoint:** `POST /create-quiz`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "JavaScript Basics",
    "questions": [{ "question": "What is JS?", "options": ["A", "B", "C"], "answer": "A" }],
    "instructorId": "123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Quiz created successfully",
    "quiz": { "id": "456", "title": "JavaScript Basics" }
  }
  ```

#### Get all quizzes
**Endpoint:** `GET /getQuiz`
- **Response:**
  ```json
  [
    { "id": "456", "title": "JavaScript Basics" },
    { "id": "789", "title": "React Basics" }
  ]
  ```

#### Get a quiz by ID
**Endpoint:** `GET /quiz/:id`
- **Response:**
  ```json
  {
    "id": "456",
    "title": "JavaScript Basics",
    "questions": [{ "question": "What is JS?", "options": ["A", "B", "C"], "answer": "A" }]
  }
  ```

#### Get quizzes by instructor
**Endpoint:** `GET /creatorQuiz`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    { "id": "456", "title": "JavaScript Basics" },
    { "id": "789", "title": "React Basics" }
  ]
  ```

#### Edit a quiz
**Endpoint:** `PUT /edit-quiz/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated JavaScript Basics",
    "questions": [{ "question": "What is JS?", "options": ["A", "B", "C"], "answer": "B" }]
  }
  ```
- **Response:**
  ```json
  {
    "message": "Quiz updated successfully"
  }
  ```

#### Publish a quiz
**Endpoint:** `PATCH /publish/:id`
- **Response:**
  ```json
  {
    "message": "Quiz published successfully"
  }
  ```

#### Delete a quiz
**Endpoint:** `DELETE /deleteQuiz/:id`
- **Response:**
  ```json
  {
    "message": "Quiz deleted successfully"
  }
  ```

---

## License
This project is licensed under the MIT License.

