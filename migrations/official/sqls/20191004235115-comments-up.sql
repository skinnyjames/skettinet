create table comments(
  id serial primary key,
  user_id integer references users(id),
  post_id integer references posts(id) on delete cascade,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  comment text not null,
  quote varchar(255),
  quotee varchar(255),
  experience integer not null default 0
);

create trigger comment_updated 
  before update on comments
  for each row execute procedure set_updated_timestamp();