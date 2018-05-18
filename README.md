# mean
mean project

http://localhost:5000

username:unmsm
password:unmsm


curl -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidW5pdmVyc2lkYWQgbmFjaW9uYWwgbWF5b3IgZGUgc2FuIG1hcmNvcyIsInVzZXJuYW1lIjoidW5tc20iLCJpYXQiOjE1MjY2NzMxMDUsImV4cCI6MTUyNjc1OTUwNX0.36FSquDuQhXyhyOVxJDdizPt2bROAt-LuY5vVQvE4hU' \
-X GET http://localhost:5000/api/users

Modificar
curl -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidW5pdmVyc2lkYWQgbmFjaW9uYWwgbWF5b3IgZGUgc2FuIG1hcmNvcyIsInVzZXJuYW1lIjoidW5tc20iLCJpYXQiOjE1MjY2NzMxMDUsImV4cCI6MTUyNjc1OTUwNX0.36FSquDuQhXyhyOVxJDdizPt2bROAt-LuY5vVQvE4hU' \
-X PUT http://localhost:5000/api/users/578d6e61acfbe089048f2aa3 \
-d '{"_id":"578d6e61acfbe089048f2aa3","username":"perltatin","name":"peralta soto","__v":0,"email":"peralta@gmail.com"}'

Eliminar:
curl -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidW5pdmVyc2lkYWQgbmFjaW9uYWwgbWF5b3IgZGUgc2FuIG1hcmNvcyIsInVzZXJuYW1lIjoidW5tc20iLCJpYXQiOjE1MjY2NzMxMDUsImV4cCI6MTUyNjc1OTUwNX0.36FSquDuQhXyhyOVxJDdizPt2bROAt-LuY5vVQvE4hU' \
-X DELETE http://localhost:5000/api/users/57abc92c249415100ef634d9

Crear:
curl -H 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidW5pdmVyc2lkYWQgbmFjaW9uYWwgbWF5b3IgZGUgc2FuIG1hcmNvcyIsInVzZXJuYW1lIjoidW5tc20iLCJpYXQiOjE1MjY2NzMxMDUsImV4cCI6MTUyNjc1OTUwNX0.36FSquDuQhXyhyOVxJDdizPt2bROAt-LuY5vVQvE4hU' \
-X POST http://localhost:5000/api/users/ \
-d '{"name":"Frank Jonislla","username":"fjonislla","password":"fjonislla","email":"fjonislla@gmail.com"}'

