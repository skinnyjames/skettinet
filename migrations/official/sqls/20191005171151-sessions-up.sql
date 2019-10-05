create extension if not exists "uuid-ossp";

create table sessions(
  id serial primary key,
  guid uuid not null default uuid_generate_v1(),
  user_id integer not null references users(id) on delete cascade,
  expires timestamp not null,
  created_at timestamp not null default now(),
  payload json
);