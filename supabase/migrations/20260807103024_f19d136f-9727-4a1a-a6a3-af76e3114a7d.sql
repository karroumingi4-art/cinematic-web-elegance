CREATE TABLE public.mvp_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_label TEXT NOT NULL,
  player_number TEXT NOT NULL,
  player_name TEXT NOT NULL,
  voter_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.mvp_votes TO anon;
GRANT SELECT, INSERT ON public.mvp_votes TO authenticated;
GRANT ALL ON public.mvp_votes TO service_role;
ALTER TABLE public.mvp_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "MVP votes are publicly readable" ON public.mvp_votes FOR SELECT USING (true);
CREATE POLICY "Anyone can cast an MVP vote" ON public.mvp_votes FOR INSERT WITH CHECK (
  char_length(trim(voter_name)) BETWEEN 2 AND 60
  AND char_length(trim(player_name)) BETWEEN 1 AND 80
  AND char_length(trim(player_number)) BETWEEN 1 AND 4
  AND char_length(trim(match_label)) BETWEEN 2 AND 80
);

CREATE TABLE public.match_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_label TEXT NOT NULL,
  pick TEXT NOT NULL,
  voter_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.match_predictions TO anon;
GRANT SELECT, INSERT ON public.match_predictions TO authenticated;
GRANT ALL ON public.match_predictions TO service_role;
ALTER TABLE public.match_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Predictions are publicly readable" ON public.match_predictions FOR SELECT USING (true);
CREATE POLICY "Anyone can submit a prediction" ON public.match_predictions FOR INSERT WITH CHECK (
  pick IN ('1','X','2')
  AND char_length(trim(voter_name)) BETWEEN 2 AND 60
  AND char_length(trim(match_label)) BETWEEN 2 AND 80
);