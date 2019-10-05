create table categories(
  id serial primary key,
  name varchar(255) not null,
  image_name varchar(255) not null,
  about text not null
);