drop trigger if exists user_updated on users;
drop table users CASCADE;
drop function if exists set_updated_timestamp() CASCADE;