create table messages (
  id uuid default uuid_generate_v4() primary,
  encrypted_message TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);