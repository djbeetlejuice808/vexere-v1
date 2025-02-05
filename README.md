# Vexere Ticket Booking System (v1)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/duongthanhphu/vexere-v1/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)

A full-stack ticket booking platform inspired by Vexere, built with modern web technologies.

## Features ✨
- **User Interface**
  - Browse/search available bus routes
  - Seat selection with interactive map
  - Booking management dashboard
  - Responsive design for all devices

- **Backend Services**
  - RESTful API with Express.js
  - JWT-based authentication
  - Real-time seat availability updates
  - Transaction history tracking
  - Email/SMS notification system

- **Admin Features**
  - Route management
  - Bus operator dashboard
  - Analytics & reporting
  - User management

## Tech Stack 🛠️
- **Frontend**: React, Redux Toolkit, Axios, Tailwind CSS
- **Backend**: Express.js, MongoDB, Mongoose, JWT
- **DevOps**: Docker, NGINX, PM2
- **Tools**: Postman, Swagger, GitHub Actions

## Installation Guide 🚀

### 1. Clone Repository
```bash
git clone https://github.com/duongthanhphu/vexere-v1.git
cd vexere-v1
```

### 2. Setup Backend
```bash
cd vexere
npm install

# Create .env file
cp .env.example .env
# Update MongoDB and JWT config in .env
```


## Start development server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend-client
npm install

# Create .env file
cp .env.example .env
```
## Start React app:
```bash
npm start
```
### 4. Initial Setup

1.  Access MongoDB and create database `vexere`
    
2.  Import sample data (check `/database` directory)
    
3.  Admin credentials: [admin@vexere.com](mailto:admin@vexere.com) / admin123
