# MiniTweet Lite

A mini Twitter-like app built with Laravel (backend) and Vue/React (frontend), and Tailwind CSS — allowing users to create accounts, post short tweets, and like/unlike posts.

🧰 Tech Stack
Backend    :	Laravel 11 (Sanctum for Auth), MySQL
Frontend   :	Vue 3 + Vite
Styling    :	Tailwind CSS
Testing    :	PHPUnit/Pest (Laravel) + Jest/Vitest (Frontend)


🏗️ Project Setup
🛠 Backend (Laravel API)

    Clone the repository:
        git clone https://github.com/<your-username>/minitweet-lite.git
        cd minitweet-lite/backend

    Install dependencies:
        composer install

    Copy environment file:
        cp .env.example .env
        php artisan key:generate

    Setup your database in .env:
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=minitweet_lite
        DB_USERNAME=root
        DB_PASSWORD=
        DB_SOCKET=/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock

    Run migrations:
        php artisan migrate

    Start the backend server:
        php artisan serve
        API runs at → http://localhost:8000/api



💻 Frontend (Vue 3)
    Go to frontend folder:
        cd ../frontend

    Install dependencies:
        npm install

    Create .env file:
        VITE_API_URL=http://localhost:8000/api

    Run development server:
        npm run dev
        Open app at → http://localhost:5173


🧱 Folder Structure
    Root
        minitweet-lite/
        ├── backend/   # Laravel API
        └── frontend/  # Vue app


🎨 Design Reference
    Figma URL: https://www.figma.com/design/rJ2v3k0iQtPyIROqySdRw4/Mini-Twitter?node-id=0-1&p=f&t=JURbJEO6PGXbFbon-0

