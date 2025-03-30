# Next.js Auth.js Prisma Starter Kit

A starter kit for building authentication-enabled applications using Next.js 15, Auth.js (NextAuth), and Prisma with PostgreSQL.

## Features

- **Next.js 15** - Latest Next.js framework with App Router support.
- **Auth.js v5** - Secure authentication with multiple providers.
- **Prisma** - Database ORM for PostgreSQL, MySQL, SQLite, and more.
- **PostgreSQL** - Used as the default database.
- **TypeScript** - Static typing for better developer experience.
- **Tailwind CSS** - Utility-first styling.
- **Shadcn UI** - Pre-styled UI components for rapid development.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [PostgreSQL](https://www.postgresql.org/) (Required database for this project)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/nextjs-authjs-prisma-starter.git
   cd nextjs-authjs-prisma-starter
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
   Update `.env` with your PostgreSQL database URL and Auth.js credentials.

4. Initialize the PostgreSQL database:
   ```sh
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Authentication Providers

Auth.js supports multiple providers like Google, GitHub, and Credentials.
To configure them, update the `auth.ts` file in the `/lib/auth` directory.

Example Google provider setup:
```ts
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })
]
```

## Project Structure

```
├── app/
│   ├── auth/
│   ├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
├── prisma/
│   ├── schema.prisma
├── components/
├── styles/
├── .env.example
├── next.config.mjs
└── package.json
```

## Deployment

You can deploy this project on platforms like:

- [Vercel](https://vercel.com/) (Recommended)
- [Netlify](https://www.netlify.com/)
- [Render](https://render.com/)

## License

This project is licensed under the MIT License.

