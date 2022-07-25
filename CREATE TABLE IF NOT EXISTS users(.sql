CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL primary key,
    first_name text NOT NULL,
    middle_name text NOT NULL,
    last_name text NOT NULL,
    zip_code integer NOT NULL 
);
DO
$do$
begin 
if exists(select first_name from users where first_name ='bob') then
COMMENT ON TABLE users IS 'users table';
COMMENT ON COLUMN users.first_name IS 'first name';
end if;
end
$do$



select id from users;