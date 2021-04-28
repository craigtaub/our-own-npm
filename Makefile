build:
	docker-compose build

up:
	docker-compose up --build

stop:
	docker-compose stop

down:
	docker-compose down

remove:
	docker-compose rm

ssh-web:
	docker exec -it our-own-npm_web_1 /bin/sh

ssh-mongo:
	docker exec -it our-own-npm_mongodb_container_1 bash

ssh-api:
	docker exec -it our-own-npm_api_1 /bin/sh
