# CRUD API

A simple Node.js CRUD API for managing users using in-memory database.

## Prerequisites

- Node.js >= 22.14.0

## Installation

```bash
npm install
```

## Available Scripts

### Development

```bash
npm run start:dev
```

Starts the development server with hot-reload using nodemon.

### Production

```bash
npm run start:prod
```

Builds the project and starts the production server.

### Build

```bash
npm run build
```

Builds the project using webpack.

### Testing

```bash
npm run test
```

Runs the test suite using Jest.

## Project Structure

- `src/` - Source code directory
- `dist/` - Build output directory
- `src/app.ts` - Main application entry point

## API Endpoints

All endpoints are under `/api/users`.

### Get all users
```
GET /api/users
```
**Response:** `200 OK` — Array of users

### Get user by ID
```
GET /api/users/:id
```
**Response:** `200 OK` — User object

### Create user
```
POST /api/users

Content-Type: application/json
{
"username": "string",
"age": number,
"hobbies": ["string", ...]
}
```
**Response:** `201 Created` — Created user object

### Update user
```
PUT /api/users/:id

Content-Type: application/json
{
"username": "string",
"age": number,
"hobbies": ["string", ...]
}
```
**Response:** `200 OK` — Updated user object

### Delete user
```
DELETE /api/users/:id
```
**Response:** `204 No Content`

## User Object

```json
{
  "id": "uuid",
  "username": "string",
  "age": number,
  "hobbies": ["string", ...]
}

```
