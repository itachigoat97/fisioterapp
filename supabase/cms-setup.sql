-- CMS Content Management System Setup
-- Esegui questo SQL in Supabase Dashboard > SQL Editor

-- 1. Tabella site_content per contenuti editabili
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page VARCHAR(50) NOT NULL,           -- 'home', 'servizi', 'prezzi', etc.
  section VARCHAR(50) NOT NULL,        -- 'hero', 'services', 'cta', etc.
  content_key VARCHAR(100) NOT NULL,   -- 'title', 'subtitle', etc.
  content_value TEXT NOT NULL,         -- Il contenuto
  content_type VARCHAR(20) DEFAULT 'text', -- 'text', 'json', 'image'
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(page, section, content_key)
);

-- 2. Indici per performance
CREATE INDEX IF NOT EXISTS idx_site_content_page ON site_content(page);
CREATE INDEX IF NOT EXISTS idx_site_content_page_section ON site_content(page, section);

-- 3. Funzione per aggiornare updated_at automaticamente
CREATE OR REPLACE FUNCTION update_site_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Trigger per updated_at
DROP TRIGGER IF EXISTS trigger_site_content_updated_at ON site_content;
CREATE TRIGGER trigger_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_site_content_timestamp();

-- 5. RLS Policies
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Policy: Tutti possono leggere (contenuti pubblici)
DROP POLICY IF EXISTS "Allow public read" ON site_content;
CREATE POLICY "Allow public read" ON site_content
  FOR SELECT
  USING (true);

-- Policy: Solo admin autenticati possono modificare
DROP POLICY IF EXISTS "Allow authenticated insert" ON site_content;
CREATE POLICY "Allow authenticated insert" ON site_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update" ON site_content;
CREATE POLICY "Allow authenticated update" ON site_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete" ON site_content;
CREATE POLICY "Allow authenticated delete" ON site_content
  FOR DELETE
  TO authenticated
  USING (true);

-- 6. Storage bucket per immagini CMS (eseguire manualmente in Supabase Dashboard)
-- Vai su Storage > Create new bucket
-- Nome: cms-images
-- Public: Sì

-- Oppure via SQL (richiede permessi):
-- INSERT INTO storage.buckets (id, name, public) VALUES ('cms-images', 'cms-images', true);
