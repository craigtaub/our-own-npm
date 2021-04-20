# Our own npm

## Tarball

> tar -zcvf mongo-src.tar.gz src/

## SCP

From "storage"

> scp web:/usr/src/app/mongo-src.tar.gz /home/mongo-src.tar.gz

From "web"

> scp /usr/src/app/mongo-src.tar.gz storage:/home/mongo-src.tar.gz

## Mongo

Simple (no auth)

```js
use testdb
db.createCollection('users', {})
show collections
db.users.insert({name: 'Bill', meta: 'craig worked'})
db.users.findOne({name: 'Bill'})
db.users.find()
db.users.remove({name: 'Bill'})
```

Create auth

```js
use admin
db.createUser({
  user: "root",
  pwd: "root",
  roles: ["root"]
})
```
