# Lanius Backend Test

## Installation

Requires [Node.js](https://nodejs.org/) v12+ & PostgreSQL to run.

```sh
$ cd lanius-backend-test
$ npm install
$ npm run dev
```

## Command
```sh
npm start // Start server
npm run dev // Start server in development
npm run makemigration // Automatically generate migration file based on model
npm run migrate // Migrate into database
npm run undomigrate // Undo last migration
npm run seedall // Run seeder
```

## Environtment Variable

```sh
NODE_ENV=development
PORTS_API=8080

POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=laniusdb
POSTGRES_HOST=localhost
PORTS_DB=5432

```

## API Documentation Example

### Response Codes
```
200: Success
400: Bad request
401: Unauthorized
404: Cannot be found
405: Method not allowed
50X: Server Error
```

### Register
**You send:**  Your data user.
**You get:** Data profile that you inserted.

**Request:**
```json
POST /api/auth/register
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Fields: email (required), password (required), fullName (required)
```

### Login
**You send:**  Your  login credentials.
**You get:** An `Token` with wich you can make further actions.

**Request:**
```json
POST /api/auth/login
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Fields: email (required), password (required)
```

### Profile
**You send:**  Your `Token`.
**You get:** Your Account Profile.

**Request:**
```json
GET /api/profile
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: 'Bearer ' + `Token`
```