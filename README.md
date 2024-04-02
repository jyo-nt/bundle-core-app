# bundle-core-app

Application to search, retrieve and download bioinformatics tools packages

## Migrate dbs:

`docker-compose run backend python manage.py migrate`

### Load data into db

`docker-compose run backend python manage.py load_data metadata data/tools-metadata.csv`

`docker-compose run backend python manage.py load_data versions data/tools-versions.csv`

### Now run the container

`docker-compose up`

Client: http://localhost:3000/

### Django

Backend: http://localhost:8000/

Data: Inside `data` directory
