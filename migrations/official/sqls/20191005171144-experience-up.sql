CREATE FUNCTION experience(target_id integer) RETURNS integer as $$
BEGIN 
  RETURN (select sum(u.experience + pm.experience + c.experience) from users as u
  left join posts as p 
  on p.user_id = u.id
  inner join post_mods as pm
  on p.id = pm.post_id
  left join comments as c
  on c.user_id = u.id
  where u.id = target_id);
END; $$
LANGUAGE PLPGSQL;
