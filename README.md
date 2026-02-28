# Mayank Gupta - Professional Portfolio

A professional, single-page portfolio website built for a Data Science and Analytics student.

## Features
- **Modern UI**: Dark theme with animated gradient and particle backgrounds.
- **Responsive Design**: Fully responsive using Tailwind CSS.
- **Certificates System**: Automatically scans the `backend/certificates` folder and displays files in the UI.
- **Contact Form**: Stores messages in a local MongoDB database.
- **Animations**: Smooth scrolling, fade-in effects, and interactive hover transitions.

## Tech Stack
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (via Mongoose).

## Setup Instructions

1. **Prerequisites**:
   - Ensure [Node.js](https://nodejs.org/) is installed.
   - Ensure [MongoDB](https://www.mongodb.com/try/download/community) is installed and running locally on port 27017.

2. **Installation**:
   In the root directory, run:
   ```bash
   npm install
   ```

3. **Running the Application**:
   Run the following command in the root directory:
   ```bash
   node server.js
   ```

4. **Add Certificates**:
   - Place your PDF or image certificates (JPG, PNG) inside the `backend/certificates/` folder.
   - Refresh the website to see them automatically appear in the "Certificates" section.

5. **Viewing the Website**:
   Open your browser and go to: `http://localhost:3000`

## Project Structure
- `frontend/`: Contains HTML, CSS, and JS for the UI.
- `backend/`: Contains MongoDB models, API routes, and the certificates folder.
- `server.js`: The main entry point that serves the app and connects to the database.
