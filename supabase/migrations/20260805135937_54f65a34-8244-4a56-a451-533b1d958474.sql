CREATE TABLE public.fan_wall_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.fan_wall_messages TO anon;
GRANT SELECT, INSERT ON public.fan_wall_messages TO authenticated;
GRANT ALL ON public.fan_wall_messages TO service_role;

ALTER TABLE public.fan_wall_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fan wall messages are publicly readable"
  ON public.fan_wall_messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can sign the fan wall"
  ON public.fan_wall_messages FOR INSERT
  WITH CHECK (
    char_length(trim(name)) BETWEEN 2 AND 60
    AND char_length(trim(country)) BETWEEN 2 AND 60
    AND char_length(trim(message)) BETWEEN 4 AND 180
  );

INSERT INTO public.fan_wall_messages (name, country, message) VALUES
  ('Marta Bellini', 'Italy', 'My grandfather stood on the terrace in 1968. I stand there now with my daughter.'),
  ('Kenji Arakawa', 'Japan', 'Four in the morning in Osaka, and still the anthem gives me goosebumps.'),
  ('Amara Okoye', 'Nigeria', 'Gold on obsidian. No other club looks like courage the way this one does.'),
  ('Lucas Ferreira', 'Brazil', 'I learned to play imitating the number ten. Twenty years later I still do.'),
  ('Sofia Nyland', 'Sweden', 'A club that treats its academy like its first team deserves a lifetime.'),
  ('Diego Marchetti', 'Argentina', 'We do not support a team. We inherit one.'),
  ('Hannah Whitmore', 'United Kingdom', 'The away end sang for ninety minutes in the rain. That is the whole story.'),
  ('Youssef Haddad', 'Morocco', 'From Casablanca with a scarf older than my son.'),
  ('Elena Petrova', 'Bulgaria', 'The archives evening changed how I watch football forever.'),
  ('Noah Delacroix', 'France', 'Forged in the dark, built for the light. I have that on my wall.'),
  ('Priya Raghavan', 'India', 'Twelve time zones away and never once alone on matchday.'),
  ('Tomas Novak', 'Czechia', 'Craft, courage, belonging. In that order, always.');