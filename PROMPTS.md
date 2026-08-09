# InterviewIQ — AI Usage Log

## Project

InterviewIQ — The Interview Agent

## AI Tools Used

- ChatGPT — used by team members for development assistance,
  troubleshooting, documentation, Git/GitHub guidance, and
  frontend/backend integration.
- Google Gemini API — used as the AI service for the interview agent.

---

# 1. Backend Development — Team Member 1

ChatGPT was used as a development assistant during the development
and testing of the FastAPI backend.

### Areas where ChatGPT was used

- Understanding FastAPI backend structure
- Understanding API endpoints and request/response formats
- Gemini API integration
- API-key and `.env` security
- Swagger/OpenAPI testing
- Troubleshooting API validation errors
- Testing the backend health endpoint
- README and documentation
- Git and GitHub workflow
- Branch management and collaboration
- Frontend/backend integration
- Deployment planning

### Backend API Testing

The FastAPI backend was tested through Swagger/OpenAPI.

The health endpoint was successfully tested and returned:

{
  "status": "healthy"
}

The interview functionality and API requests were also tested
during development.

### Gemini API and Security

AI assistance was used to understand how the FastAPI backend
communicates with the Gemini API and how the Gemini API key should
be protected.

The Gemini API key is intended to remain in backend environment
variables and should not be exposed in frontend code or committed
to GitHub.

---

# 2. Git and GitHub — Team Member 1

ChatGPT was used for guidance on:

- Git branches
- Keeping backend work on `main`
- Creating a separate `frontend` branch
- Creating a separate `presentation` branch
- Safely pushing changes
- Pull requests
- Merging branches
- Collaborating without disturbing the working backend

The team made the final decisions about the GitHub workflow.

---

# 3. Frontend Development — Team Member 2

The frontend teammate used AI assistance for the development and
design of the InterviewIQ frontend and its integration with the
backend.

## Actual Frontend Development Prompt

The frontend teammate provided a detailed prompt asking the AI to act
as a lead full-stack engineer and product designer for InterviewIQ.

The prompt provided requirements for:

- Inspecting the existing repository
- Understanding the existing backend and frontend
- Building a React + Vite application
- Using the FastAPI backend
- Using the existing Gemini integration
- Using `curriculum.json` and `candidates.json`
- Implementing the required interview API contract
- Maintaining session-based interview state
- Personalizing interviews using candidate learning history
- Adapting questions based on candidate answers
- Asking at least 8 questions
- Covering at least 4 curriculum days
- Asking meaningful follow-up questions
- Producing structured final feedback
- Connecting the React frontend to FastAPI
- Handling loading and API errors
- Keeping API keys out of frontend code
- Updating the README
- Testing the complete application

The prompt also specified the final feedback fields:

- `summary`
- `strengths`
- `gaps`
- `next`

The AI was instructed not to expose hidden chain-of-thought or
fabricate unsupported scores.

The frontend teammate reviewed and implemented the resulting work.

---

# 4. Frontend Design

AI assistance was used to guide the design of a professional
InterviewIQ interface, including:

- Landing page
- Candidate selection
- Interview preparation
- Interview/chat screen
- Progress indicators
- Topic and difficulty indicators
- Adaptive interview feedback indicators
- Final interview results screen
- Responsive and polished UI

The frontend teammate reviewed and adapted the design for the project.

---

# 5. Frontend and Backend Integration

AI assistance was used to understand how the React frontend
communicates with the FastAPI backend.

The intended architecture is:

Frontend
    ↓
FastAPI backend
    ↓
Gemini API

The frontend uses the backend API for the interview conversation
and maintains the session throughout the interview.

The expected interview flow includes:

- Starting an interview
- Sending candidate responses
- Receiving the next adaptive question
- Continuing the conversation
- Receiving final feedback when the interview is complete

---

# 6. Documentation

AI assistance was used to help organize and improve:

- README documentation
- Project setup instructions
- API documentation
- Hackathon submission documentation
- AI usage documentation

The team reviewed and edited the documentation before committing it.

---

# 7. Deployment

AI assistance was used to understand:

- Vercel deployment
- Public application URLs
- Localhost versus public URLs
- Frontend deployment
- Backend deployment requirements
- Frontend/backend deployment workflow

---

# 8. Human Contribution

The team was responsible for the actual project design,
implementation, testing, debugging, integration, and final decisions.

### Team Member 1

Primarily worked on:

- FastAPI backend
- Gemini API integration
- API testing
- Backend documentation
- Git/GitHub backend workflow

### Team Member 2

Primarily worked on:

- React frontend
- UI/UX
- Frontend functionality
- Frontend/backend integration

### Team Member 3

Primarily worked on:

- Presentation
- Project explanation
- Presentation preparation

AI tools were used as development and learning assistants. The team
reviewed AI suggestions and made the final technical and product
decisions.

---

# 9. Security

No API keys, passwords, or other secrets are included in this log.

Gemini credentials are intended to remain in secure backend
environment variables and must not be exposed in frontend code or
committed to the public repository.

---

# 10. Authenticity

This document records AI assistance used during the development of
InterviewIQ.

It does not claim that AI independently built the project. The team
implemented, reviewed, tested, modified, and made the final decisions
for the application.
