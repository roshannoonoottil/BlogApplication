# 🌐 Infinity Blog Application

Infinity Blog is a full-stack blogging platform that allows users to create, manage, and explore blog content with authentication and a clean, responsive UI.

---

## 🧠 Overview

Infinity Blog provides an intuitive blogging experience with features like secure login, blog CRUD operations, and public blog viewing. Built using the MERN stack, it ensures both performance and scalability.

---

## ✨ Features

- 🔐 **User Authentication**  
  Register, login, and persist sessions securely using JWT and Redux Persist.

- 📝 **Blog Management**  
  Create, update, delete, and view personal blogs with a modern interface.

- 🌍 **Public Blogs**  
  View all user-published blogs with preview and read-more functionality.

- 📑 **Pagination**  
  Paginate public blog listings for improved readability and performance.

- 💻 **Responsive Design**  
  Optimized for desktop and mobile devices with TailwindCSS.

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- **React** – UI library
- **Redux Toolkit** – State management
- **React Router** – Routing
- **Axios** – API requests
- **TailwindCSS** – Styling
- **Redux Persist** – Persistent auth state

### ⚙️ Backend
- **Node.js** – Runtime environment
- **Express.js** – Server framework
- **MongoDB** – Database
- **Mongoose** – MongoDB ODM
- **bcrypt** – Password hashing
- **JWT** – Token-based authentication
- **CORS & Middleware** – Security and route protection

---

## 📂 Project Structure

```
frontend/
├── api/             # Axios calls
├── components/      # Shared UI components
├── pages/           # Page views
├── redux/           # Slices and store setup
└── App.jsx          # Main app and routes

backend/
├── controllers/     # Logic for routes
├── models/          # Mongoose schemas
├── routes/          # Express route definitions
├── middleware/      # JWT authentication middleware
└── index.js         # Server entry point
```


## 🚀 Getting Started

### ✅ Prerequisites
- Node.js
- MongoDB
- Git

### 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/infinity-blog.git
   cd infinity-blog

Install Dependencies

For frontend:

cd frontend
npm install

For backend:

cd backend
npm install


Run the Application
In both frontend and backend folders, run:

npm run dev
