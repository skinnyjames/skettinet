CREATE FUNCTION set_updated_timestamp()
  RETURNS TRIGGER
  LANGUAGE plpgsql
AS $$
BEGIN 
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

create table users(
  id serial primary key,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  username varchar(180) not null,
  email varchar(255) not null,
  avatar varchar(255),
  first_name varchar(255),
  last_name varchar(255),
  born date not null,
  password_hash varchar not null,
  password_salt varchar not null,
  work_title varchar not null,
  bio text,
  admin boolean not null default false,
  banned boolean not null default false,
  experience integer not null default 0  
);

create trigger user_updated 
  before update on users
  for each row execute procedure set_updated_timestamp();

create unique index users_lower_email_idx on users(lower(email));
