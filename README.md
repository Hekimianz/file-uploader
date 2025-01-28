# Personal Storage Service (Mini Google Drive)

## Project Description

This project is a simplified version of a personal storage service like Google Drive. Users can authenticate, create folders, upload files, and manage their stored data. It also includes additional features such as file sharing with customizable durations.

---

## Features

1. **Session-Based Authentication**

   - Users authenticate using Passport.js.
   - Session data is persisted in the database using Prisma session store.

2. **File Upload**

   - Authenticated users can upload files.
   - Files are initially stored in the filesystem, and later integrated with cloud storage like Cloudinary or Supabase.

3. **Folders**

   - CRUD functionality for folders.
   - Users can upload files into specific folders.

4. **File Details and Downloads**

   - View details of a specific file (name, size, upload time).
   - Download files with a simple click.

5. **Cloud Storage Integration**

   - Uploaded files are stored in a cloud storage service (like Cloudinary or Supabase), and their URLs are saved in the database.

6. **Share Folders** (Extra Credit)
   - Generate sharable links with a specified duration (e.g., 1 day, 10 days).
   - Shared links can be accessed by unauthenticated users.

---

## Technologies Used

- **Express.js**: Web framework for Node.js.
- **Prisma**: ORM for database interactions.
- **Passport.js**: Session-based authentication.
- **Prisma Session Store**: Persists session data in the database.
- **Multer**: Middleware for file uploads.
- **Cloudinary** or **Supabase**: Cloud storage services for file storage.

---

## Installation

1. Clone the repository:  
   `git clone https://github.com/yourusername/project-name.git`

2. Navigate into the project directory:  
   `cd project-name`

3. Install the dependencies:  
   `npm install`

4. Set up the `.env` file with necessary environment variables, including database credentials and cloud storage API keys.

---

## Usage

1. Run the development server:  
   `npm run dev`

2. Visit the application in your browser at:  
   `http://localhost:3000`
