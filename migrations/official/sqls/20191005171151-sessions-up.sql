create table sessions(
  id serial primary key,
  user_id integer not null references users(id) on delete cascade,
  expires timestamp not null,
  created_at timestamp not null default now(),
  payload json
);