# Our own npm

`mongodb` -> Registry
`src` -> Website
`bin` -> CLI 

## Mongo

Simple (no auth)
```js
use testdb
db.createCollection('users', {})
show collections
db.users.insert({name: 'Bill', meta: 'craig worked'})
db.users.findOne({name: 'Bill'})
db.users.find()
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
