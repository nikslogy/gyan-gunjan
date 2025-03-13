# Gyan Gunjan Project

A comprehensive web application built with Next.js frontend and Django backend, designed to provide resources related to Indian Knowledge Systems (IKS).

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Technology Stack

### Frontend
- **Framework**: Next.js 15.1.3
- **UI Library**: React 18.2.0
- **Styling**: TailwindCSS 3.4.1
- **Animation**: Framer Motion 12.4.1
- **Authentication**: NextAuth.js 4.24.5
- **PDF Handling**: React-PDF 7.7.3, PDF.js 4.10.38
- **Other Libraries**: Swiper 11.2.1, Lucide React 0.469.0

### Backend
- **Framework**: Django 5.1.6
- **REST API**: Django REST Framework 3.15.2
- **Database**: SQLite (default), can be configured for PostgreSQL
- **Authentication**: Django's built-in authentication system
- **CORS Handling**: django-cors-headers 4.7.0
- **Image Processing**: Pillow 11.1.0
- **Styling**: Django Tailwind 3.8.0

## Project Structure

### Frontend Structure

## Getting Started

gyan-gunjan/
├── .next/ # Next.js build output
├── node_modules/ # Node.js dependencies
├── public/ # Static files
├── src/
│ ├── app/ # Next.js App Router pages
│ │ ├── about-cka/ # About CKA page
│ │ ├── about-iks-division/ # About IKS Division page
│ │ ├── about-project/ # About Project page
│ │ ├── admin/ # Admin interface
│ │ ├── contact/ # Contact page
│ │ ├── jeevan-darshan/ # Jeevan Darshan section
│ │ ├── lets-collaborate/ # Collaboration page
│ │ ├── login/ # Authentication pages
│ │ ├── resources/ # Resources section
│ │ ├── terms-of-use/ # Terms of use page
│ │ ├── globals.css # Global styles
│ │ ├── layout.js # Root layout
│ │ └── page.js # Home page
│ ├── components/ # Reusable UI components
│ ├── config/ # Configuration files
│ ├── hooks/ # Custom React hooks
│ ├── middleware.js # Next.js middleware
│ └── utils/ # Utility functions
├── .env.local # Environment variables
├── next.config.mjs # Next.js configuration
├── package.json # Frontend dependencies
├── tailwind.config.mjs # Tailwind CSS configuration
└── jsconfig.json # JavaScript configuration


### Backend Structure

backend/GyanGunjan/
├── GyanGunjan/ # Django project
│ ├── GyanGunjan/ # Project settings
│ │ ├── settings.py # Django settings
│ │ ├── urls.py # Main URL routing
│ │ ├── wsgi.py # WSGI configuration
│ │ └── asgi.py # ASGI configuration
│ ├── home/ # Home app
│ ├── users/ # User management app
│ ├── contribute/ # Contribution app
│ ├── search/ # Search functionality
│ ├── media/ # User-uploaded files
│ ├── static/ # Static files
│ ├── templates/ # HTML templates
│ ├── theme/ # Theme-related files
│ ├── manage.py # Django management script
│ └── requirement.txt # Backend dependencies
└── venv/ # Python virtual environment

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or later)
- **npm** (v9.0.0 or later) or **yarn** (v1.22.0 or later)
- **Python** (v3.10 or later)
- **pip** (latest version)
- **Git** (for version control)

## Installation and Setup

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>/backend/GyanGunjan
   ```

2. **Create and activate a virtual environment**:
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r GyanGunjan/requirement.txt
   ```

4. **Set up the database**:
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser** (for admin access):
   ```bash
   python manage.py createsuperuser
   ```

6. **Collect static files**:
   ```bash
   python manage.py collectstatic
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd ../../gyan-gunjan
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root of the frontend directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key_here
   ```

## Running the Application

### Running the Backend

1. **Start the Django development server**:
   ```bash
   cd backend/GyanGunjan
   python manage.py runserver
   ```
   The backend will be available at `http://localhost:8000`.

2. **Access the Django admin interface**:
   Navigate to `http://localhost:8000/admin` and log in with the superuser credentials created earlier.

### Running the Frontend

1. **Start the Next.js development server**:
   ```bash
   cd gyan-gunjan
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at `http://localhost:3000`.

## API Documentation

The backend provides a RESTful API for the frontend to consume. Here are the main endpoints:

### Authentication Endpoints
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout

### User Endpoints
- `GET /api/users/profile/` - Get user profile
- `PUT /api/users/profile/` - Update user profile

### Resource Endpoints
- `GET /api/resources/` - List all resources
- `GET /api/resources/{id}/` - Get a specific resource
- `POST /api/resources/` - Create a new resource (authenticated)
- `PUT /api/resources/{id}/` - Update a resource (authenticated)
- `DELETE /api/resources/{id}/` - Delete a resource (authenticated)

### Contribution Endpoints
- `GET /api/contribute/` - List all contributions
- `POST /api/contribute/` - Submit a new contribution

### Search Endpoints
- `GET /api/search/?q={query}` - Search across resources

## Authentication

The application uses NextAuth.js on the frontend and Django's authentication system on the backend. The authentication flow is as follows:

1. Admin logs in through the frontend login page
2. Frontend sends credentials to the backend
3. Backend validates credentials and returns a token
4. Frontend stores the token and includes it in subsequent API requests
5. Protected routes check for valid authentication before allowing access


### Content Management
- Resource browsing and searching
- Content categorization
- PDF viewing and handling


### Administration
- Admin dashboard
- Content moderation

## Deployment

### Backend Deployment

1. **Prepare the Django application for production**:
   - Update `settings.py` with production settings
   - Configure a production database (PostgreSQL recommended)
   - Set `DEBUG = False`
   - Configure allowed hosts

2. **Deploy using Gunicorn and Nginx**:
   ```bash
   gunicorn GyanGunjan.wsgi:application --bind 0.0.0.0:8000
   ```

3. **Configure Nginx as a reverse proxy**:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location /static/ {
           alias /path/to/your/static/files/;
       }

       location /media/ {
           alias /path/to/your/media/files/;
       }

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Frontend Deployment

1. **Build the Next.js application**:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

   Alternatively, you can set up continuous deployment from your GitHub repository.

3. **Or deploy using a custom server**:
   ```bash
   npm start
   # or
   yarn start
   ```

## Troubleshooting

### Common Issues

1. **Database migration errors**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

2. **Static files not loading**:
   - Check `STATIC_URL` and `STATIC_ROOT` in `settings.py`
   - Run `python manage.py collectstatic`

3. **CORS errors**:
   - Ensure `django-cors-headers` is properly configured
   - Check that the frontend origin is in `CORS_ALLOWED_ORIGINS`

4. **Authentication issues**:
   - Verify that cookies are being properly set and sent
   - Check that the CSRF token is included in requests


---

## 3D FlipBook Integration Guide

The Gyan Gunjan project uses the 3D FlipBook jQuery plugin to provide an interactive PDF viewing experience. This section explains how we've implemented it in our Next.js application.

### Prerequisites

To use the 3D FlipBook plugin, you need:
- jQuery
- Three.js
- PDF.js
- The 3D FlipBook plugin itself

### Implementation Steps

1. **Install Required Dependencies**

   ```bash
   npm install pdfjs-dist jquery
   ```

2. **Add External Scripts**

   Add the following scripts to your `_document.js` or in the `<head>` section of your layout:

   ```html
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
   <script src="/js/3dflipbook.min.js"></script>
   ```

3. **Set Up PDF.js Worker**

   Initialize PDF.js with the correct worker URL:

   ```javascript
   const initPdfJs = async () => {
     if (typeof window === 'undefined') return null;
     
     try {
       const pdfjs = await import('pdfjs-dist');
       const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
       pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
       return pdfjs;
     } catch (error) {
       console.error('Error initializing PDF.js:', error);
       return null;
     }
   };
   ```

4. **Create a Container for the FlipBook**

   ```jsx
   <div id="flipbook-wrapper" className="relative w-[1600px] h-[700px]">
     {/* FlipBook will be initialized here */}
   </div>
   ```

5. **Initialize the FlipBook**

   ```javascript
   // Inside a useEffect hook that runs when selectedPdf changes
   if (window.jQuery) {
     const $ = window.jQuery;
     const container = $('#flipbook-wrapper');
     
     if (container.length) {
       container.empty();
       $('<div class="solid-container"></div>').appendTo(container);
       
       $('.solid-container').FlipBook({
         pdf: selectedPdf,
         template: {
           html: '/templates/default-book-view.html',
           styles: ['/css/white-book-view.css'],
           links: [{
             rel: 'stylesheet',
             href: '/css/font-awesome.min.css'
           }],
           script: '/js/default-book-view.js',
           sounds: {
             startFlip: 'sounds/start-flip.mp3',
             endFlip: 'sounds/end-flip.mp3'
           }
         },
         controlsProps: {
           downloadURL: selectedPdf,
           actions: {
             cmdZoomIn: { enabled: true },
             cmdZoomOut: { enabled: true },
             cmdToc: { enabled: true },
             cmdBackward: { enabled: true },
             cmdForward: { enabled: true },
             cmdSave: { enabled: false },
             cmdPrint: { enabled: false }
           }
         },
         scale: 1,
         autoSize: true,
         height: '100%',
         width: '100%',
         pageSize: 'contain'
       });
     }
   }
   ```

### Required Files Structure

Ensure you have the following files in your public directory:

public/
├── js/
│ ├── 3dflipbook.min.js
│ └── default-book-view.js
├── css/
│ ├── white-book-view.css
│ └── font-awesome.min.css
├── templates/
│ └── default-book-view.html
└── sounds/
├── start-flip.mp3
└── end-flip.mp3

### Handling Client-Side Rendering

Since the 3D FlipBook plugin requires browser APIs, ensure it only runs on the client side:

```javascript
useEffect(() => {
  // Initialize PDF.js only on client side
  const setupPdf = async () => {
    if (typeof window !== 'undefined') {
        await initPdfJs();
      setPdfInitialized(true);
    }
  };
  setupPdf();
}, []);

useEffect(() => {
    if (!pdfInitialized || !selectedPdf) return;
  
  // Initialize FlipBook here
  // ...
}, [selectedPdf, pdfInitialized]);
```

### Troubleshooting

1. **WebGL Issues**: The plugin requires WebGL support. Add a check to detect WebGL support:

   ```javascript
   const checkWebGLSupport = () => {
     try {
       const canvas = document.createElement('canvas');
       const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
       return gl instanceof WebGLRenderingContext;
     } catch (e) {
       return false;
     }
   };
   ```

2. **Loading Errors**: Handle loading errors gracefully:

   ```javascript
   onLoadError: (error) => {
     console.error('Error loading PDF:', error);
     container.html('<div class="text-red-500 p-4">Error loading PDF. Please try again later.</div>');
   }
   ```

3. **Mobile Compatibility**: The 3D FlipBook may have performance issues on mobile devices. Consider adding device detection and providing a simpler viewer for mobile users.

For more details on the 3D FlipBook plugin configuration options, refer to the [official documentation](https://3dflipbook.net/documentation).

## License

This project is licensed under the IKS and CKA License. All rights reserved by the Indian Knowledge Systems Division and Center for Knowledge Alternatives.

© 2024-2025 Gyan Gunjan Project. All rights reserved by IKS Division and CKA.
