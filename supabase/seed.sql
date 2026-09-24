-- ==============================================================================
-- AURA SUPPER CLUB OS — SUPABASE SEED DATA (v1.0.0)
-- Mock Production Records for Instant Staging
-- ==============================================================================

-- 1. Insert Initial Tasting Events
INSERT INTO public.supper_club_events 
(event_code, title, event_date, event_time, price, capacity, tickets_left, neighborhood, location_detail, curated_vinyl_summary, curated_vinyl_playlist_id, status, atmosphere)
VALUES
('EV-01', 'Heritage & Hearth: View Park Twilight', 'Friday, June 12, 2026', '6:30 PM — 10:00 PM', 145.00, 24, 4, 'View Park', 'An architectural mid-century indoor-outdoor modern residential estate high above the city.', 'Summer-themed rare groove, 1970s jazz funk, and vintage Philadelphia soul vinyl records spun on high-fidelity tube amps.', 'track-1', 'Selling Fast', 'Intimate seating surrounding the central stone outdoor hearth under California palms.'),
('EV-02', 'Solstice Sound & Soul: Baldwin Hills Oasis', 'Saturday, June 20, 2026', '7:00 PM — 10:30 PM', 160.00, 30, 12, 'Baldwin Hills', 'An expansive private terrace hillside garden overlooking the magnificent downtown skyline.', 'A curated dialogue between Roy Ayers, Kool & The Gang, and deep spiritual jazz fusion records.', 'track-2', 'Open', 'Sunset golden-hour dining followed by candlelit vinyl listening under the stars.'),
('EV-03', 'The Ancestral Table: Leimert Park Parlor', 'Saturday, June 27, 2026', '6:00 PM — 9:30 PM', 150.00, 18, 1, 'Leimert Park', 'An executive historic parlor space surrounded by original Black art and a beautiful wall-to-wall record library.', 'Classic analog recordings of Minnie Riperton and Outkast, celebrating warmth, soul, and vocal mastery.', 'track-4', 'Selling Fast', 'Extremely personal indoor dynamic seating. The chef cooks and discusses every plate live in front of you.'),
('EV-04', 'Ember, Air & Soul: Ladera Heights Lawn', 'Friday, July 04, 2026', '6:30 PM — 10:00 PM', 155.00, 40, 40, 'Ladera Heights', 'A manicured botanical lawn behind an elegant gated mid-century modern private compound.', 'Vibrant, high-tempo funk, classic brass ensembles, and sweet golden soul grooves.', 'track-3', 'Open', 'Open-air long-table dining under a constellation of glowing bulb garlands and roaring fireplace smoke.')
ON CONFLICT (event_code) DO NOTHING;

-- 2. Insert Core Provisions Menu
INSERT INTO public.provisions_menu
(item_code, name, price, description, course, dietary, ingredients, highlighted)
VALUES
('M-01', 'Cast-Iron Skillet Cornbread', 18.00, 'Fresh-milled heirloom corn meal, baked in smoking cast iron. Finished with whipped lavender honey-butter and hand-harvested smoked flake sea salt.', 'Small Plates', ARRAY['Vegetarian'], ARRAY['Heirloom Cornmeal', 'Lavender Butter', 'Raw South LA Honey', 'Maldon Salt'], true),
('M-02', 'Crispy Georgia Peach Barbecue Belly', 24.00, 'Slow-confit heritage pork belly crisped skin-down, glazed in a reduced View Park peach nectar and house mustard bbq. Served over a purée of local collar greens.', 'Small Plates', ARRAY[]::TEXT[], ARRAY['Heritage Pork Belly', 'Peach Barbecue Glaze', 'Mustard Greens', 'Pickled Mustard Seeds'], false),
('M-03', 'Carolina Crab Beignets', 26.00, 'Pillow-soft savory fritters loaded with fresh sweet blue lump crab, folded with chives. Served with a warm Cajun-spiced brown-butter remoulade.', 'Small Plates', ARRAY[]::TEXT[], ARRAY['Blue Lump Crab', 'Chives', 'Brown-Butter Remoulade', 'Lemon Confit'], true),
('M-04', '24-Hour Pot-Liquor Braised Short Rib', 54.00, 'Grass-fed prime beef short rib simmered in smoked turkey pot-liquor. Rested over stone-ground white heirloom grits, finished with micro-mustard greens and natural reduction.', 'Mains', ARRAY['Gluten-Free'], ARRAY['Prime Short Rib', 'Stone-Ground Grits', 'Rich Pot-Liquor Jus', 'Micro Greens'], true),
('M-05', 'Seared Red Snapper & Crawfish Roux', 52.00, 'Wild-caught Pacific Red Snapper skin-seared to a crisp, over a bed of legacy Carolina Gold rice. Drenched in a crawfish and sweet-pepper heritage gumbo reduction.', 'Mains', ARRAY[]::TEXT[], ARRAY['Pacifc Snapper', 'Carolina Gold Rice', 'Crawfish Gumbo Roux', 'Wilted Okra Rings'], true),
('M-06', 'Bourbon Pecan Sweet Potato Galette', 19.00, 'Layers of charred sweet potato, brown butter shortbread, and candied Georgia pecans topped with vanilla bean buttermilk ice cream.', 'Final Notes', ARRAY['Vegetarian'], ARRAY['Sweet Potato', 'Georgia Pecans', 'Buttermilk Ice Cream', 'Smoked Sea Salt'], true)
ON CONFLICT (item_code) DO NOTHING;
