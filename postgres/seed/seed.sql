BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Milktea', 'milktea@gmail.com', 5, '2022-01-01');
INSERT into login (hash, email) values ('$2a$10$U161U9IBkDWJjmlJe8dFF.molMhuguCl54j.6MncGaX8Uhz//aUaW', 'milktea@gmail.com');

COMMIT;