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

reset:
	rm packages/api/tarballs/example-lib.tar.gz
	rm -rf packages/example-app/node_modules/example-lib
	docker exec -it our-own-npm_mongodb_container_1 mongo --eval "db.packages.remove({})" testdb

