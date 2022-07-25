-- delete from users where id in (select id from users)
-- select * from users
-- Create table if not exists dom_ids(
-- id_name text not null
-- )
CREATE TABLE IF NOT EXISTS users(
  id SERIAL NOT NULL primary key,
  first_name varchar(20) NOT NULL,
  middle_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  zip_code varchar(10) NOT NULL
);

-- DO
-- $do$
-- begin 
-- if exists(select first_name from users where first_name ='bob') then
-- COMMENT ON TABLE users IS 'users table';
-- COMMENT ON COLUMN users.first_name IS 'first name';
-- end if;
-- end
-- $do$

drop table users;

-- insert some data
insert into  users(first_name,middle_name, last_name, zip_code) values('bob', 'sucks', 'dirt', 9263);

-- drop all users
drop table friends;

-- delete all usres
delete from users where id in (select id from users);


DECLARE @a int
SET @a = 1
UPDATE users SET order_position = @a, @a=@a+1  WHERE id = 5000;

select
    json_build_object(
        'persons', json_agg(
            json_build_object(
                'person_name', p.first_name,
                'cars', last_name
            )
        )
    ) persons
from users p
left join (
    select 
        id,
        json_agg(
            json_build_object(
                'carid', c.id,    
                'type', c.first_name,
                'comment', 'nice car' -- this is constant
                
                )
            ) cars
    from
        friends c
    group by 1
) c on p.id = c.id;
         