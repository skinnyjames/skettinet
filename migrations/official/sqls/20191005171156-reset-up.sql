
create table reset(
  id serial primary key,
  user_id integer references users(id),
  guid uuid not null default uuid_generate_v1(),
  expires timestamp not null,
  created_at timestamp not null default now()
);