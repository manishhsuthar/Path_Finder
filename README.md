# 🚀 Path Finder: Full-Stack Student Performance Analysis & Career Recommendation

Path Finder is a full-stack web application designed to help students and academic advisors analyze academic performance, recommend suitable career domains, and generate personalized learning roadmaps. It combines a powerful Django REST backend with a modern React frontend.

---

## ✨ Features

### Backend (Django)
- **🔐 Secure Authentication:** JWT-based authentication with student and admin roles.
- **📊 Academic Analysis:** In-depth analysis of semester-wise subject marks to identify strengths and weaknesses.
- **🤖 AI-Ready Career Recommendation:** An explainable, rule-based engine to suggest career domains based on academic performance. Easily extensible with machine learning models.
- **🗺️ Personalized Roadmap Generation:** Dynamically creates structured, multi-stage learning roadmaps for recommended career paths.
- **🗄️ Robust Database:** Utilizes PostgreSQL for reliable data management.

### Frontend (React)
- **🖥️ Interactive Dashboard:** A modern, responsive user interface for visualizing academic performance and recommendations.
- **🎨 Modern UI Components:** Built with **shadcn/ui** and **Tailwind CSS** for a clean and accessible user experience.
- **⚡ Fast Development:** Uses **Vite** for a fast and efficient development workflow.
- **🔒 Typed Codebase:** Fully written in **TypeScript** for better code quality and maintainability.
- **📈 Data Visualization:** (Coming Soon) Charts and graphs to visually represent student performance.

---

## 🛠️ Tech Stack

| Category      | Technology                                                              |
|---------------|-------------------------------------------------------------------------|
| **Backend**   | Django, Django REST Framework, PostgreSQL, JWT                            |
| **Frontend**  | React, TypeScript, Vite, Tailwind CSS, shadcn/ui                        |
| **Tooling**   | Python, Node.js, npm, pip                                               |

---

## 📁 Project Structure

The project is organized as a monorepo with two main directories:

```
path-finder/
├── 📄 README.md
│
├── 🚀 front_end/       # Contains the React + Vite frontend application
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
└── 🐍 SPA_Backend/      # Contains the Django REST API backend
    ├── apps/
    ├── spa_backend/
    ├── manage.py
    └── requirements.txt
```

---

## ⚙️ Local Development Setup

Follow these instructions to get both the backend and frontend running on your local machine.

### Prerequisites

- [Git](https://git-scm.com/)
- [Python](https://www.python.org/downloads/) (3.8+ recommended)
- [Node.js](https://nodejs.org/en/) (v18.x or later) & npm
- [PostgreSQL](https://www.postgresql.org/download/)

---

### 1. Backend Setup (Django)

First, set up and run the Django server.

```bash
# Navigate to the backend directory
cd SPA_Backend

# Create and activate a Python virtual environment
python -m venv venv
source venv/bin/activate   # On macOS/Linux
# venv\Scripts\activate    # On Windows

# Install Python dependencies
pip install -r requirements.txt
```

#### Configure Database
1.  Ensure PostgreSQL is running.
2.  Create a new database and user.

    ```sql
    CREATE USER spa_user WITH PASSWORD 'strong_password';
    CREATE DATABASE spa_db OWNER spa_user;
    GRANT ALL PRIVILEGES ON DATABASE spa_db TO spa_user;
    ```

3.  Create a `.env` file in the `SPA_Backend` root and add your database credentials and a secret key.

    ```env
    # SPA_Backend/.env
    SECRET_KEY=django-insecure-YOUR_RANDOM_SECRET_KEY
    DEBUG=True

    DB_NAME=spa_db
    DB_USER=spa_user
    DB_PASSWORD=strong_password
    DB_HOST=localhost
    DB_PORT=5432
    ```

#### Finalize Backend Setup

```bash
# Run database migrations
python manage.py migrate

# Create a superuser to access the Django admin
python manage.py createsuperuser

# Start the backend server
python manage.py runserver
```

✅ The backend API should now be running at `http://127.0.0.1:8000/`.

---

### 2. Frontend Setup (React)

In a **new terminal**, set up and run the React application.

```bash
# Navigate to the frontend directory from the project root
cd front_end

# Install Node.js dependencies
npm install

# Start the frontend development server
npm run dev
```

✅ The frontend application should now be running and accessible at `http://localhost:5173/`.

---

## 🔑 Key API Endpoints

The frontend communicates with these backend endpoints.

-   **Auth:** `POST /api/auth/register/`, `POST /api/auth/login/`
-   **Academics:** `POST /api/academics/add/`, `GET /api/academics/my-results/`
-   **Analysis:** `GET /api/analysis/performance/`
-   **Career Recommendation:** `GET /api/career/recommend/`
-   **Roadmap:** `GET /api/roadmap/generate/`

For protected APIs, send the JWT token in the `Authorization` header: `Authorization: Bearer <ACCESS_TOKEN>`.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  **Fork** the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  **Commit** your changes (`git commit -m 'Add some feature'`).
5.  **Push** to the branch (`git push origin feature/YourFeature`).
6.  Open a **Pull Request**.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.