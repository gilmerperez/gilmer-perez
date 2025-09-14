# User Rules

## Behavior Preferences

- Be empathetic and understanding in responses.
- Get straight to the point — avoid unnecessary filler.
- Tailor advice to my technical level and current learning goals.
- Communicate using a formal, professional, respectful, and encouraging tone.

## Development Workflow Principles

- Avoid modifying unrelated code or making unnecessary changes.
- Focus effort on the specific areas of code relevant to the task or feature.
- Preserve existing patterns and architectural decisions for features that are functioning correctly, unless explicitly instructed to refactor or restructure.
- Before implementing changes, carefully consider potential impacts on related methods, components, or modules to maintain overall code stability and consistency.

## Coding Standards and Best Practices

- Prioritize simple, readable, and maintainable solutions.
- Never overwrite the .env file without explicit confirmation.
- Refactor large files into smaller modules if they exceed 500 lines.
- Maintain a clean and organized codebase to improve developer efficiency.
- Only make requested or well-understood changes directly related to the task.
- Avoid code duplication by checking existing code for similar functionality and reusing it when appropriate.
- When fixing bugs or adding features, prefer existing patterns or technologies. Only introduce new ones after exploring current options. If new code is adopted, remove the old implementation to prevent duplication.

## Technical Stack

- **Backend:** Use JavaScript with Node.js for server-side logic, and Express.js for routing and API endpoints. Manage project dependencies with Node Package Manager (NPM).
- **Data Management:** Use lightweight JSON storage when a database isn’t necessary. For structured relational data, use PostgreSQL with Sequelize. For unstructured or document-based data, use MongoDB with Mongoose.
- **Frontend:** Use semantic HTML for markup to promote accessibility and SEO. Style with CSS, focusing on responsiveness and maintainability. Bootstrap can be used for quick prototyping and UI consistency. JavaScript handles interactivity, while React is the core frontend library for building modular, stateful interfaces.

## Website Security

#### Rate Limiting and Abuse Protection
- Add CAPTCHAs on critical forms to block bots.
- Implement IP or user-based rate limiting on all API endpoints.

#### Environment and Secrets
- Never expose secrets or config data in client-side code.
- Keep all sensitive environment variables server-side and include .env files in .gitignore.

#### Data Handling
- Use HTTPS to encrypt data in transit.
- Validate and sanitize inputs to prevent attacks.
- Hash passwords securely (e.g., bcrypt) before storing.

#### Authentication and Authorization
- Use trusted auth providers (e.g., Clerk, Auth0) instead of building your own.
- Protect API endpoints and user routes with proper authentication and access control.

#### Testing and Monitoring
- Write tests for critical features like auth and payments.
- Avoid logging sensitive data or debug info in production.
- Use monitoring tools to track errors and suspicious activity.

## User Profile

- I care deeply about clean, user-centric UI/UX design and high-performance applications.
- I am building production-ready, modern websites and applications, and continuously improving my skill set.
- I am a dedicated Web Developer with a strong focus on Front-End Development, but I also have experience with Back-End and Full-Stack technologies.
- I successfully completed an intensive Web Development Bootcamp hosted by the University of Central Florida, where I gained practical, hands-on experience with modern technologies. On the front end, I worked extensively with HTML, CSS, Bootstrap, JavaScript, TypeScript, and React. On the back end, I built full-stack applications using Node.js and Express, and managed data using both SQL (PostgreSQL with Sequelize) and NoSQL (MongoDB with Mongoose) databases. I also designed and implemented both RESTful and GraphQL APIs, integrated secure authentication systems, wrote comprehensive unit and end-to-end tests using Cypress, and deployed applications through CI/CD pipelines to ensure efficient, automated delivery.