-- ==============================================================================
-- AURA SUPPER CLUB OS — SUPABASE DATABASE SCHEMA (v1.0.0)
-- Private Dining Club, Analog Vinyl Sound Room & Intimate Tasting Lounge OS
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Supper Club Tasting Events Table
CREATE TABLE IF NOT EXISTS public.supper_club_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_code VARCHAR(32) NOT NULL UNIQUE, -- e.g. 'EV-01'
    title VARCHAR(255) NOT NULL,
    event_date VARCHAR(64) NOT NULL,
    event_time VARCHAR(64) NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 145.00,
    capacity INTEGER NOT NULL DEFAULT 24,
    tickets_left INTEGER NOT NULL DEFAULT 24,
    neighborhood VARCHAR(64) NOT NULL, -- 'View Park', 'Baldwin Hills', 'Leimert Park', 'Ladera Heights'
    location_detail TEXT NOT NULL,
    curated_vinyl_summary TEXT NOT NULL,
    curated_vinyl_playlist_id VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'Open', -- 'Open', 'Selling Fast', 'Sold Out'
    atmosphere TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Provisions Menu Items Table
CREATE TABLE IF NOT EXISTS public.provisions_menu (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_code VARCHAR(32) NOT NULL UNIQUE, -- e.g. 'M-01'
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 24.00,
    description TEXT NOT NULL,
    course VARCHAR(64) NOT NULL, -- 'Small Plates', 'Mains', 'Final Notes'
    dietary TEXT[] DEFAULT '{}',
    ingredients TEXT[] NOT NULL DEFAULT '{}',
    highlighted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Guest Board Reservations Table
CREATE TABLE IF NOT EXISTS public.board_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_code VARCHAR(64) NOT NULL UNIQUE, -- e.g. 'AURA-TKT-108291'
    event_id UUID REFERENCES public.supper_club_events(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(64) NOT NULL,
    guest_count INTEGER NOT NULL DEFAULT 2,
    seating_preference VARCHAR(64) NOT NULL DEFAULT 'Courtyard Firepit', -- 'Courtyard Firepit', 'Vinyl Library Arcade', 'Garden Terrace', 'Chef Communal Counter'
    dietary_notes TEXT DEFAULT '',
    custom_spice_tier VARCHAR(64) NOT NULL DEFAULT 'Chef Signature Warmth', -- 'Traditional Southern Subtle', 'Chef Signature Warmth', 'South LA Heat'
    curation_addon BOOLEAN NOT NULL DEFAULT false,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 290.00,
    status VARCHAR(32) NOT NULL DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Private Catering & Kitchen Takeover Inquiries Table
CREATE TABLE IF NOT EXISTS public.catering_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_code VARCHAR(32) NOT NULL UNIQUE, -- e.g. 'INQ-4821'
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(64) NOT NULL,
    event_date VARCHAR(64) NOT NULL,
    group_size INTEGER NOT NULL DEFAULT 12,
    neighborhood VARCHAR(64) NOT NULL DEFAULT 'View Park',
    catering_scope VARCHAR(64) NOT NULL DEFAULT 'Full On-Site Kitchen Takeover',
    custom_request_notes TEXT DEFAULT '',
    status VARCHAR(32) NOT NULL DEFAULT 'Pending Review',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.supper_club_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provisions_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catering_inquiries ENABLE ROW LEVEL SECURITY;

-- 7. Public Read & Insertion Policies for Storefront Client Operations
CREATE POLICY "Allow public read access on events" 
    ON public.supper_club_events FOR SELECT USING (true);

CREATE POLICY "Allow public read access on menu" 
    ON public.provisions_menu FOR SELECT USING (true);

CREATE POLICY "Allow authenticated or guest insertion on reservations" 
    ON public.board_reservations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on reservations" 
    ON public.board_reservations FOR SELECT USING (true);

CREATE POLICY "Allow authenticated or guest insertion on inquiries" 
    ON public.catering_inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on inquiries" 
    ON public.catering_inquiries FOR SELECT USING (true);
