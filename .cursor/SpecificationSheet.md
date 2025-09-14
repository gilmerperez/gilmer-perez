# Specification Sheet

Hey, please help me write a detailed and structured specification sheet for a web application project named: (application-name)

## Project Overview

Provide a concise, high-level summary of the application's purpose and goals. This should answer the following:

- Who are the target users?
- What is the desired user experience and outcome?
- What is the core problem this application solves?

## Technical Stack

Please include or suggest the technologies used in the following areas:

- APIs: RESTful or GraphQL
- Deployment: Render, Netlify, or Vercel
- Frontend: HTML, CSS, Bootstrap/Tailwind, JavaScript/TypeScript, and React
- Dev Tools: Vite, ESLint, Prettier, Cypress for testing, and GitHub Actions for CI/CD
- Backend: JavaScript with Node.js and Express.js
- Authentication: JWT-based, Auth0, Auth.js, or Passport.js
- Security: Basic checklist including HTTPS, .env usage, rate limiting, and auth protection
- Database: PostgreSQL with Sequelize ORM or for an unstructured database MongoDB with Mongoose

## UI/UX Design Guidelines

### Layout and Responsiveness
- Grid/Flexbox Layout: CSS Grid or Flexbox with 12-column layout
- Responsive Design with 3 defined breakpoints for small, medium, and large screens

### Typography
- Font Family: Arial, sans-serif
- Font Sizes: Heading 1: 32px, Body: 16px
- Font Weights: Light 300, Regular 400, Bold 700

### Colors
- Accent: `#...`
- Primary: `#...`
- Secondary: `#...`
- Background: `#...`
- Button States: normal, hover, active, and disabled

### Images and Icons
- Alt tags for accessibility
- Format: JPEG, PNG, SVG, and/or WebP
- Compression: TinyPNG, ImageOptim, or Squoosh

### Text Content
- Homepage headings, CTA text, button text, descriptive text, etc
- Use tone consistent with audience: professional, formal, technical, or friendly

## User Roles and Permissions

Define user types, access levels, and permissions clearly:

- Visitor: Can browse public pages
- Admin: Can manage all users, content, and configurations
- Authenticated User: Can view dashboard, update profile, interact with content

## Core Features and User Flows

Break down major functionality and describe how a user navigates through them. Include authentication flows, protected routes, and session behavior

#### Example Sections
- File Uploads
- Dashboard Overview
- Search and Filtering
- Forms and Validation
- Sign Up/Login/Logout
- Notifications/Toasts/Modals
- CRUD operations (Create, Read, Update, and Delete)

## Data Flow and Architecture

- Describe the data flow between the frontend, backend, and the database
- Highlight how state is managed: Frontend, APIs, Backend Database, or Authentication State
- Indicate where API calls occur: Frontend and Backend API Calls, or Server-Side-Rendering (SSR)

## API Endpoints

#### Specify expected endpoints, their methods, route paths, and purpose
- GET /api/users → Get all users
- POST /api/auth/login → Login with email/password
- PUT /api/profile → Update logged-in user profile
- DELETE /api/posts/:id → Delete a post by ID

#### Include
- Response format (success/error)
- Middleware or auth checks needed
- Rate limiting and protection where applicable

## Database Schema

List the main tables/collections with their fields, types, and relationships

#### Example for SQL Database using PostgreSQL
```
Users:
- id (UUID)
- name (String)
- passwordHash (String)
- email (Unique, String)
- role (Enum: "user", "admin")
```

#### Example for NoSQL Database using MongoDB
```
User {
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  role: "user" | "admin"
}
```

## Basic Website Security Checklist

#### Rate Limiting & Abuse Protection
- Add CAPTCHAs on critical forms to block bots
- Implement IP- or user-based rate limiting on all API endpoints

#### Environment & Secrets
- Never expose secrets or config data in client-side code
- Keep all sensitive environment variables server-side and include .env files in .gitignore

#### Data Handling
- Use HTTPS to encrypt data in transit
- Validate and sanitize inputs to prevent attacks
- Hash passwords securely (e.g., bcrypt) before storing

#### Authentication & Authorization
- Use trusted auth providers (e.g., Clerk, Auth0) instead of building your own
- Protect API endpoints and user routes with proper authentication and access control

#### Testing & Monitoring
- Write tests for critical features like auth and payments
- Avoid logging sensitive data or debug info in production
- Use monitoring tools to track errors and suspicious activity

## Deployment & CI/CD

- Hosting Platform: Render, Netlify, or Vercel
- Add preview environments for PRs if possible
- Pipeline:
  - Pre-deploy lint/test checks
  - Auto-deploy on `main` or `production` branch
  - Rollback strategies for failed deploys

## Testing Strategy (Optional)

- End-to-end testing with Cypress
- Use test IDs and accessibility-friendly selectors
- Unit testing for components, functions (Cypress, Jest, or Vitest)
- Ensure test coverage for:
  - CRUD functionality
  - Authentication flows
  - API routes with mocked responses

## Missing Information

If any of the following are unclear, please ask:

- Key user personas
- Target devices and browsers
- Any third-party integrations
- Application name and purpose
- Whether authentication is required
- Brand assets (logos, colors, fonts)

---

If you identify any missing information or need clarification on any aspect to create a complete and accurate specification, please ask follow-up questions. The goal is to have a clear, comprehensive roadmap before coding begins so development is efficient, consistent, and aligned with best practices. Please make this list in Markdown (.md) format since I will include it in my project for reference