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

remove:
	docker-compose rm

# connect-db:
# 	mongo admin -u root -p rootpassword

# web-app:
# 	docker run -p 3000:3000 ourownnpm_web

# mongo:
	# docker exec -it ourownnpm_mongodb_container_1 mongo
	# docker-compose exec ourownnpm_mongodb_container_1 bash

ssh-web:
	# docker exec -it our-own-npm_web_1 bash 
	docker exec -it our-own-npm_web_1 /bin/sh

ssh-mongo:
	docker exec -it our-own-npm_mongodb_container_1 bash

ssh-api:
	docker exec -it our-own-npm_api_1 /bin/sh

# ssh-storage:
# 	docker exec -it our-own-npm_storage_1 bash
