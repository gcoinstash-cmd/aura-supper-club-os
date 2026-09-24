# Aura Supper Club OS — 3-Minute Supabase Database Setup

Follow these simple steps to connect Aura Supper Club OS to your live cloud Supabase database:

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free or paid project.
2. Note your **Project URL** and **Anon Public API Key** from **Settings > API**.

## 2. Execute SQL Migrations
1. In your Supabase dashboard, click on **SQL Editor** on the left menu.
2. Click **New Query**.
3. Copy all code from `supabase/schema.sql` and paste it into the editor.
4. Click **Run** (or `Cmd + Enter`). All 4 tables, RLS policies, and triggers will be created.
5. (Optional) Run `supabase/seed.sql` to populate mock tastings, menu provisions, and initial events.

## 3. Configure Local Environment Variables
Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"
```

## 4. Run & Test the Application
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to verify live database connections!
Admin Passcode Demo Bypass: Click **`[ ADMIN PASS ]`** in header and enter **`supperclub2026`**.
