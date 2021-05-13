build:
	docker-compose build

up:
	docker-compose up --build

db:
	curl -XPUT http://localhost:5984/registry

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
		'http://localhost:5984/registry' \
		-H 'content-type: application/json'
	rm -rf packages/example-app/node_modules/example-lib
	# to delete just package using ref
	# curl -X DELETE \
	# 	'http://localhost:5984/registry/example-lib?rev=$(shell curl 'http://localhost:5984/registry/example-lib' -H 'content-type: application/json' 2>/dev/null | jq --raw-output ._rev)' \
	# 	-H 'authorization: Basic YWRtaW46YWRtaW4=' \
	# 	-H 'content-type: application/json'
