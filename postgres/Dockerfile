FROM postgres

COPY /tables/ /docker-entrypoint-initdb.d/tables
COPY /seed/ /docker-entrypoint-initdb.d/seed
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/