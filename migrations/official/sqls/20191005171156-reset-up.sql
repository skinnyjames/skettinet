create extension if not exists "uuid-ossp";

create table reset(
  id serial primary key,
  guid uuid not null default uuid_generate_v1(),
  expires timestamp not null,
  created_at timestamp not null default now()
);