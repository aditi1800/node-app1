# node-app1
https://www.tutorialworks.com/openshift-jenkins-docker-pipeline

Create User in Mongo :-
------------------------------

mongo mongodb://admin:test1234@mongo.aditi-poc.svc.cluster.local:27017

use mydatabase
db.createUser(
   {
     user: "test",
     pwd: "password",  // Or  "<cleartext password>"
     roles: [ "readWrite", "dbAdmin" ]
   }
)

 
mongo --host mongo.aditi-poc.svc.cluster.local --port 27017 -u test -p password --authenticationDatabase mydatabase

 
mongo mongodb://test:password@mongo.aditi-poc.svc.cluster.local:27017/mydatabase
