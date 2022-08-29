CREATE DATABASE list;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    email TEXT
);

INSERT INTO users (name,email) values('rafael dominguez','rafael@hotmail.com');

 create or replace procedure sp_UpdateUser(
   c_id int,
   c_name text DEFAULT NULL, 
   c_email text DEFAULT NULL
)

language plpgsql    
as $$
declare
   c_message text DEFAULT '';
begin

IF EXISTS (SELECT * FROM users 
              WHERE  id=c_id) THEN
    update users 
    set  name=COALESCE(c_name,name), email=COALESCE(c_email,email)  
    where id = c_id;
		commit; 	
Else
 c_message:='el id no existe en la base de datos';
END IF;

end;$$;