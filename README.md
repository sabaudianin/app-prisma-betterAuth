# DevInsight

DevInsight is a modern, full-stack developer dashboard designed to centralize technical notes and GitHub repository management. Built with a focus on speed, security, and a seamless user experience.

### Tech Stack

Framework: Next.js 16 (App Router, Turbopack)

Language: TypeScript

Authentication: Better Auth (Email/Password & OAuth)

Database: PostgreSQL (Hosted on AWS RDS)

ORM: Prisma 7 (with @prisma/adapter-pg for optimized pooling)

Styling: Tailwind CSS 4

State Management: Zustand

Deployment: Vercel

### Features

Secure Authentication: Robust session management via Better Auth.

Developer Dashboard: Overview of saved repositories and technical snippets.

Tech Notes: Create, edit, and categorize technical notes with tag support.

GitHub Integration: Save and track GitHub repositories directly through the UI.

Responsive Design: Dark/Light mode .

Cloud Native: Fully integrated with AWS RDS using secure TLS/SSL connections.

## Getting Started

### Prerequisites

Node.js 20+

An AWS RDS PostgreSQL instance (or local Postgres)

### Installation

#### Clone the repository:

git clone https://github.com/yourusername/dev-insight.git
cd dev-insight

#### Install dependencies:

npm install

#### Environment Setup:

Create a .env file in the root directory:

DATABASE_URL="postgresql://user:password@endpoint:5432/dbname?sslmode=no-verify"
BETTER_AUTH_SECRET="your_secret_here"
BETTER_AUTH_URL="http://localhost:3000"
GITHUB_TOKEN="your token"

#### Database Migration:

npx prisma db push

#### Run the development server:

npm run dev

### Project Structure

app/ - Next.js App Router (Pages, Actions, API)

components/ - Reusable UI components (Shadcn + Custom)

lib/ - Core logic (Auth, Prisma client, GitHub API)

lib/generated/ - Prisma generated types

lib/schemas/ - Zod validation schemas

prisma/ - Database schema definitions

public/ - Static assets

### License

This project is licensed under the MIT License.

## Author

rafbobbob
