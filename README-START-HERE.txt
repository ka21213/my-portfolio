COMP229 Assignment 2 — MyPortfolio based on the supplied mern_skeleton

IMPORTANT: The original skeleton's client was a Vite placeholder ("Welcome to Frontend").
To preserve your completed Assignment 1, copy your Assignment 1 frontend into a folder named
client inside this MyPortfolio root. Do not use the placeholder client from the original skeleton.

Folder structure:
MyPortfolio/
  client/                 <-- your Assignment 1 React app
  config/config.js
  server.js
  server/
    controllers/
    middleware/
    models/
    routes/
  package.json
  .env

SETUP
1. Extract this ZIP into a folder named MyPortfolio.
2. Copy your Assignment 1 frontend into MyPortfolio/client.
3. Open MyPortfolio in VS Code.
4. In a terminal at the MyPortfolio root run: npm install
5. Copy .env.example to a new file named .env.
6. Set MONGODB_URI to your own MongoDB Atlas connection string for the Portfolio database.
7. Set JWT_SECRET to a long random secret.
8. Start backend only: npm run dev
9. Open http://localhost:5000/ and check the welcome JSON response.

RUN BOTH FRONTEND AND BACKEND
Your client/package.json should have a dev script that runs Vite and nodemon concurrently.
Install in client if needed: npm install --save-dev concurrently nodemon
Then set client/package.json dev script to:
"dev": "concurrently \"vite\" \"nodemon ../server.js\""
Run from the client directory: npm run dev

API ENDPOINTS
Contacts:       /api/contacts
Projects:       /api/projects
Qualifications: /api/qualifications
Users:          /api/users
Register:       POST /api/users/register
Sign in:        POST /api/users/signin
Sign out:       POST /api/users/signout
Current user:   GET /api/users/me (requires Bearer token)

POST/PUT examples:
Contact:
{"firstname":"Test","lastname":"Student","email":"student@example.com"}

Project or qualification:
{"title":"Portfolio Website","firstname":"Test","lastname":"Student","email":"student@example.com","completion":"2026-10-15","description":"A sample record for testing."}

Register:
{"name":"Test Student","email":"student@example.com","password":"ChangeThisPassword123!"}

Sign in:
{"email":"student@example.com","password":"ChangeThisPassword123!"}

In Postman use Authorization > Bearer Token to test protected user routes.
Take genuine screenshots of your own MongoDB database, server response, terminal connection, and Postman tests.

SECURITY NOTES
- Do not commit .env or database credentials to GitHub.
- Passwords are hashed using bcrypt.
- JWT sign-out is stateless: the client must discard its token. Immediate revocation would require server-side token invalidation.
- Contacts/projects/qualifications routes are open to match the assignment's API testing workflow. Add authorization before deploying a public production app.
