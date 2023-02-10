SELECT id,username from customer 
WHERE UPPER(username)=UPPER(${username})
AND password=${password}