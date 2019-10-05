create table posts(
  id serial primary key,
  user_id integer references users(id),
  category_id integer references categories(id),
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  title varchar(255) not null,
  body text not null,
  quote varchar(255),
  quotee varchar(255)
);

create trigger post_updated 
  before update on posts
  for each row execute procedure set_updated_timestamp();