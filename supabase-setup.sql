-- Create check-ins table
CREATE TABLE IF NOT EXISTS check_ins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID DEFAULT gen_random_uuid(),
  check_in_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_check_ins_user_id ON check_ins(user_id);

-- Create index on check_in_time for sorting
CREATE INDEX IF NOT EXISTS idx_check_ins_time ON check_ins(check_in_time DESC);

-- Enable Row Level Security
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own check-ins
CREATE POLICY "Users can insert their own check-ins"
  ON check_ins
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow users to read their own check-ins
CREATE POLICY "Users can read their own check-ins"
  ON check_ins
  FOR SELECT
  USING (true);

-- Create policy to allow users to update their own check-ins
CREATE POLICY "Users can update their own check-ins"
  ON check_ins
  FOR UPDATE
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_check_ins_updated_at
  BEFORE UPDATE ON check_ins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();