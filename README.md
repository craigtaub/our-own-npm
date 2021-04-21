# Our own npm

## Mongo basics

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
