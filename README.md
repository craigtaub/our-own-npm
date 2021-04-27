# Our own npm

## Mongo basics

Simple (no auth)

```js
use testdb
db.createCollection('packages', {})
show collections
db.packages.insert({name: 'Bill', meta: 'craig worked'})
db.packages.findOne({name: 'Bill'})
db.packages.find()
db.packages.remove({name: 'Bill'})
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
