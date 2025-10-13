# Django Basic Starter

A minimal Django project template for quickly starting a new Python web application.

## 🚀 Features

- Django pre-installed project structure
- SQLite as the default database (no extra setup)
- Ready to run development server
- Includes `.gitignore` for Python/Django projects

---

## 📦 Getting Started

### 1️⃣ Create Virtual Environment (Recommended)

```bash
python -m venv venv
```

Activate it:

- **Linux/Mac**:
  ```bash
  source venv/bin/activate
  ```
- **Windows**:
  ```bash
  venv\Scripts\activate
  ```

---

### 2️⃣ Install Django

```bash
pip install django
```

---

### 3️⃣ Run Migrations

```bash
python manage.py migrate
```

---

### 4️⃣ Start Development Server

```bash
python manage.py runserver
```

Server will run at:

```
http://127.0.0.1:8000
```

---

## 📂 Project Structure

```
.
├── .gitignore          # Ignores cache, venv, DB, etc.
├── manage.py           # Django management CLI
└── myproject/          # Main project folder
    ├── __init__.py
    ├── asgi.py
    ├── settings.py     # Project configuration
    ├── urls.py         # Project-wide routes
    └── wsgi.py
```

---

## 🛠 Next Steps

- Create your first app:
  ```bash
  python manage.py startapp appname
  ```
- Add routes in `urls.py`
- Build your models, views, and templates

---

## 📚 Learn More

- [Django Documentation](https://docs.djangoproject.com/en/stable/)
- [Python Official Docs](https://docs.python.org/3/)
