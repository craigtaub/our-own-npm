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

ssh-couch:
	docker exec -it our-own-npm_couchdb_container_1 bash

reset:
	rm packages/api/tarballs/example-lib.tar.gz
	rm -rf packages/example-app/node_modules/example-lib
	docker exec -it our-own-npm_couchdb_container_1 couch --eval "db.packages.remove({})" testdb

