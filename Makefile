build:
	docker-compose build

up-fast:
	docker-compose up

up:
	docker-compose up --build

up-detach:
	docker-compose up --build -d

stop:
	docker-compose stop

down:
	docker-compose down

connect-db:
	mongo admin -u root -p rootpassword

remove:
	docker-compose rm

web-app:
	docker run -p 3000:3000 ourownnpm_web

mongo:
	docker exec -it ourownnpm_mongodb_container_1 mongo
	# docker-compose exec ourownnpm_mongodb_container_1 bash

mongo-ssh:
	docker exec -it ourownnpm_mongodb_container_1 bash
