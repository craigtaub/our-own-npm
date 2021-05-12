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
	curl -X DELETE \
		'http://localhost:5984/registry/example-lib?rev=2-af1e27bbc64d719c79c1a4dd7e7c6323' \
		-H 'authorization: Basic YWRtaW46YWRtaW4=' \
		-H 'content-type: application/json'
	rm -rf packages/example-app/node_modules/example-lib

