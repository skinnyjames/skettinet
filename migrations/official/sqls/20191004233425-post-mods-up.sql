create table post_mods(
  id serial primary key,
  post_id integer references posts(id),
  created_at timestamp not null default now(),
  modded_by integer references users(id),
  modded_message varchar(255) not null, 
  experience integer not null default 0
);