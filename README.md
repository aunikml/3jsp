# Interactive 3D Presentation System

A modern full-stack application designed to replace conventional slide-based presentations with real-time 3D visual environments, cinematic camera transitions, interactive object manipulation, and secure backend presentation access management.

---

## 1. Project Architecture

The repository is organized cleanly into **frontend**, **backend**, and **infrastructure** layers:

```text
d:/3jsslidedect/
├── frontend/                     # React + TypeScript + Vite + R3F + Theatre.js
│   ├── public/
│   ├── src/
│   │   ├── app/                  # App root, routes, and context providers
│   │   │   ├── App.tsx
│   │   │   ├── routes.tsx
│   │   │   └── providers.tsx
│   │   ├── components/
│   │   │   ├── layout/           # AppLayout, Header, PresenterToolbar
│   │   │   ├── ui/               # ErrorAlert, LoadingSpinner
│   │   │   └── three/            # WebGL ErrorBoundary, Lighting, EditableBox
│   │   ├── presentation/         # Presentation player, controller, Zustand store
│   │   │   ├── PresentationPlayer.tsx
│   │   │   ├── PresentationController.tsx
│   │   │   ├── presentationStore.ts
│   │   │   └── types.ts
│   │   ├── scenes/               # Isolated 3D visual scene (DevelopmentScene.tsx)
│   │   ├── animation/            # Theatre.js project, sheet, sequence triggers
│   │   │   ├── theatreProject.ts
│   │   │   └── sequences.ts
│   │   ├── services/             # Centralized API client (CSRF, session cookies)
│   │   ├── theme/                # Custom Material UI dark theme
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env.example
│
├── backend/                      # Python + Django 5 + Django REST Framework
│   ├── config/                   # Root configuration & split settings
│   │   ├── settings/
│   │   │   ├── base.py           # Shared settings & database routing
│   │   │   ├── development.py    # Local debug & CORS configuration
│   │   │   └── production.py     # Hardened security & static asset handling
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── apps/
│   │   ├── accounts/             # Session auth, CSRF token & user endpoints
│   │   └── presentations/        # Presentation metadata, role-based access
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── infrastructure/               # Deployment & containerization
│   ├── docker/
│   │   ├── frontend/             # Dockerfile.dev & Dockerfile.prod (Multi-stage)
│   │   └── backend/              # Dockerfile.dev, Dockerfile.prod & entrypoint.sh
│   └── nginx/                    # Reverse proxy routing & SPA fallback
│       ├── default.conf
│       └── frontend-prod.conf
│
├── docker-compose.yml            # Development multi-container environment
├── docker-compose.prod.yml       # Production-ready composition
├── .github/workflows/ci.yml      # Automated GitHub Actions CI pipeline
├── .env.example                  # Environment configuration template
├── .gitignore
└── README.md
```

---

## 2. Technology Stack & Mutually Compatible Versions

### Frontend
- **React (v18.3.1)** & **ReactDOM (v18.3.1)**: Chosen for guaranteed peer compatibility with Theatre.js `@theatre/r3f` and Three.js ecosystem.
- **TypeScript (v5.4.5)**: Strict type checking, robust interfaces, and zero any leaks.
- **Vite (v5.2.11)**: High-performance HMR and production asset bundling.
- **Three.js (v0.160.1)**: Core WebGL 3D rendering engine.
- **React Three Fiber (@react-three/fiber v8.16.8)**: Declarative Three.js component wrapper.
- **@react-three/drei (v9.105.6)**: Orbit controls, infinite grids, and scene helpers.
- **Theatre.js (@theatre/core, @theatre/r3f, @theatre/studio v0.7.2)**: Visual motion design, editable mesh bindings, and programmatic sequence playback. Studio is conditionally isolated to development mode only.
- **Zustand (v4.5.2)**: Lightweight, reactive state management for presentation node navigation, history, and presentation modes.
- **Material UI (MUI v5.15.20)**: Clean, accessible presentation overlays and HUD toolbar controls.
- **Framer Motion (v11.2.10)**: Smooth UI transitions and presentation HUD fade animations.
- **React Router (v6.23.1)**: Client-side routing (`/`, `/presentation/dev`, `/presentation/:slug`).
- **Lucide React (v0.378.0)**: Modern SVG iconography.

### Backend
- **Python (v3.12 / v3.14)**: Modern runtime.
- **Django (v5.1.x)**: Enterprise web framework.
- **Django REST Framework (v3.15+)**: Serializers, viewsets, and granular permission classes.
- **PostgreSQL (v16)**: Primary production relational database with SQLite fallback for offline development.
- **django-cors-headers**: Secure cross-origin resource sharing.
- **Gunicorn (v23.0+)**: Production WSGI HTTP server.

### Infrastructure
- **Docker & Docker Compose**: Isolated multi-container environments.
- **Nginx**: Reverse proxy, SSL termination, and static asset caching.
- **GitHub Actions**: Continuous integration running linter, typecheck, builds, and backend unit tests.

---

## 3. Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Python**: v3.11, v3.12, or v3.14
- **Docker & Docker Compose** (Optional for containerized run)

---

## 4. Local Development Setup (Without Docker)

### Backend Setup

1. **Navigate to the backend directory and activate your virtual environment:**

   **Windows PowerShell:**
   ```powershell
   cd d:\3jsslidedect\backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

   **Linux / macOS:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   *(By default, `USE_SQLITE_FALLBACK=True` allows running without a live PostgreSQL instance).*

4. **Apply database migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Seed initial demo presentation and credentials:**
   ```bash
   python manage.py seed_presentation
   ```
   *Creates:*
   - Admin account: `admin` / `admin123`
   - Presenter account: `presenter` / `presenter123`
   - Initial 3D Presentation: `interactive-3d-presentation`

6. **Run backend development server:**
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```
   API runs at: `http://localhost:8000/api/`  
   Django Admin runs at: `http://localhost:8000/admin/`

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd d:\3jsslidedect\frontend
   ```

2. **Install npm dependencies:**
   ```bash
   npm install
   ```

3. **Configure frontend environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Start Vite development server:**
   ```bash
   npm run dev
   ```
   Frontend app runs at: `http://localhost:5173/`

---

## 5. Docker Development Setup

To run the entire full-stack environment (Frontend + Django Backend + PostgreSQL) in Docker containers with volume hot-reloading:

```bash
# From the project root
docker compose up --build
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000/api/`
- **PostgreSQL**: `localhost:5432`

To stop the containers:
```bash
docker compose down
```

---

## 6. Production Docker Deployment

The production deployment uses multi-stage optimized builds, Gunicorn for Django WSGI, and Nginx as the public-facing reverse proxy. PostgreSQL is strictly isolated in an internal network.

1. **Configure root `.env` from template:**
   ```bash
   cp .env.example .env
   ```
   Ensure a unique, secure `SECRET_KEY` and strong PostgreSQL password are provided.

2. **Launch production stack:**
   ```bash
   docker compose -f docker-compose.prod.yml up --build -d
   ```

- Application entry: `http://localhost/`
- API endpoints: `http://localhost/api/`
- Admin portal: `http://localhost/admin/`

---

## 7. Theatre.js Studio Usage

Theatre.js Studio is an integrated motion design tool that opens directly inside the browser during development.

### How it Works:
1. Start the frontend in development mode (`npm run dev`).
2. Navigate to the 3D Development Scene: `http://localhost:5173/presentation/dev`.
3. Theatre.js Studio initializes automatically at the bottom/edges of the screen.
4. **Editable Camera**: Selected as `DevelopmentCamera` in the Theatre project panel.
5. **Editable Mesh**: Selected as `EditableCube` and `EditableMeshProps`. Adjust position, rotation, scale, and color in real time.
6. **Programmatic Playback**: Click the Play button in the presenter toolbar to execute programmatic sequence playback (`playSceneSequence([0, 3])`).
7. **Production Isolation**: When built for production (`npm run build`), `@theatre/studio` is completely tree-shaken and excluded from the distribution bundle.

---

## 8. Running Tests & Quality Checks

### Backend Unit Tests
Runs the test suite covering authentication, session cookies, and presentation access permissions:

```bash
cd backend
python manage.py test apps --settings=config.settings.development
```

### Frontend Typecheck & Linter
Verifies strict TypeScript compliance and ESLint rules:

```bash
cd frontend
npm run lint
npm run build
```

---

## 9. API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/auth/csrf/` | Retrieve CSRF token for the session | No |
| `POST` | `/api/auth/login/` | Authenticate user credentials & initiate session | No |
| `POST` | `/api/auth/logout/` | Terminate session | Yes |
| `GET` | `/api/auth/me/` | Current authenticated user profile | Yes |
| `GET` | `/api/presentations/` | List presentations accessible to the user | Yes |
| `GET` | `/api/presentations/{slug}/` | Retrieve presentation metadata | Yes (Role permission) |
| `GET` | `/api/presentations/{slug}/access/` | Check user role & permissions for presentation | Yes |
