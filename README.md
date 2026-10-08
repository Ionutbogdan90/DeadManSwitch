# Check-in Timer App

A Next.js application with a 48-hour check-in timer, encrypted text field, and email notifications via Resend API.

## Features

- **48-hour countdown timer** that resets with each check-in
- **Check-in button** to record and reset the timer
- **Encrypted text field** with XOR cipher for secure text storage
- **Email notifications** via Resend API when timer expires
- **Supabase integration** for persistent check-in data storage
- **Responsive design** with Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- Supabase account and project
- Resend API key

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_api_key
   NOTIFICATION_EMAIL=user@example.com
   ```

3. **Set up Supabase database:**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the SQL commands from `supabase-setup.sql`

4. **Get your credentials:**
   - **Supabase URL:** From your Supabase project settings > API
   - **Supabase Anon Key:** From your Supabase project settings > API
   - **Resend API Key:** From your Resend dashboard > API Keys

## Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. **Check-in Timer:**
   - The timer starts at 48 hours
   - Click "Check In Now" to reset the timer
   - If the timer expires, an email notification is sent

2. **Encrypted Text Field:**
   - Enter an encryption key
   - Type text to encrypt
   - Click "Encrypt" to encrypt the text
   - Click "Decrypt" to decrypt the encrypted text

## Database Schema

The application uses a `check_ins` table in Supabase:

```sql
CREATE TABLE check_ins (
  id UUID PRIMARY KEY,
  user_id UUID,
  check_in_time TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## API Routes

- `POST /api/send-expiration-email` - Sends email notification when timer expires

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Security Notes

- The encryption uses a simple XOR cipher for demonstration purposes
- For production use, implement proper encryption libraries
- Keep your API keys secure and never commit them to version control
- The `.env.local` file is included in `.gitignore`

## Technologies Used

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Resend API