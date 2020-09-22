Here we want to consider the default behaviour of mongodb

db.persons.insertOne({});
 //- Inserts one documents one at a time
db.person.insertMany([{}, {}]);
// - Inserts Many Documents at a time

//insert() also exists but it's not recommended to use it anymore - It also doesn't return the inserted Ids

db.hobbies.insertMany([
  { name: 'Sports' },
  { name: 'Cooking' },
  { name: 'cars' },
]);

  // defining custom ids.
db.hobbies.insertMany([
  { _id: 'sports', name: 'Sports' },
  { _id: 'cooking', name: 'Cooking' },
  { _id: 'cars', name: 'cars' }
]);

// Lets isert Items with thes same id
db.hobbies.insertMany([
  { _id: 'yoga', name: 'yoga' },      // Inserted
  { _id: 'sports', name: 'Sports' },  // WriteError // Terminates
  { _id: 'cooking', name: 'Cooking' },
  { _id: 'cars', name: 'cars' }
]);

//Ordered Insertes
//By default, when using insertMany() insert are ordered- that means that the inserting process stops if an error occurs.
//You can change this by swithcing to "unordered inserts" - your inserting process will then continue , even if error occurred.
//In bot cases, no successful inserts (before the error will be rolled back.)



//👆 gives an  write errors 
// Mongo will start to insert Documents as it would.
// When It reaches a conflict element the whole insertion process is terminated. 
// But The inserted fields are not roled back.
// if you now rerun the insert  statement again.
// you will find that nothing is inserted
        //"writeConcernErrors" : [ ],
        //"nInserted" : 0,
        //"nUpserted" : 0,
        //"nMatched" : 0,
        //"nModified" : 0,
        //"nRemoved" : 0,
        //"upserted" : [ ]
//
//Well then How can we change the behaviour 👇?
//We could set add some options as a second parameter object to the insert {ordered: true} ==> default behaviour

db.hobbies.insertMany([
  { _id: 'yoga', name: 'yoga' },      // Inserted
  { _id: 'sports', name: 'Sports' },  // WriteError // Terminates
  { _id: 'cooking', name: 'Cooking' },
  { _id: 'cars', name: 'cars' },
  { _id: 'pen', name: 'pen' }
], {ordered: false});

//Setting ordered to false, instructs mongoDB to at least check all the document and insert what can be inserted.
//You get all errors listed out

        //"writeErrors" : [
                //{
                        //"index" : 0,
                        //"code" : 11000,
                        //"errmsg" : "E11000 duplicate key error collection: test.hobbies index: _id_ dup key: { _id: \"yoga\" }",
                        //"op" : {
                                //"_id" : "yoga",
                                //"name" : "yoga"
                        //}
                //},
                //{
                        //"index" : 1,
                        //"code" : 11000,
                        //"errmsg" : "E11000 duplicate key error collection: test.hobbies index: _id_ dup key: { _id: \"sports\" }",
                        //"op" : {
                                //"_id" : "sports",
                                //"name" : "Sports"
                        //}
                //},
                //{
                        //"index" : 2,
                        //"code" : 11000,
                        //"errmsg" : "E11000 duplicate key error collection: test.hobbies index: _id_ dup key: { _id: \"cooking\" }",
                        //"op" : {
                                //"_id" : "cooking",
                                //"name" : "Cooking"
                        //}
                //},
                //{
                        //"index" : 3,
                        //"code" : 11000,
                        //"errmsg" : "E11000 duplicate key error collection: test.hobbies index: _id_ dup key: { _id: \"cars\" }",
                        //"op" : {
                                //"_id" : "cars",
                                //"name" : "cars"
                        //}
                //}
        //],
// You even get the event list of what happend.
//
        //"writeConcernErrors" : [ ],
        //"nInserted" : 1,
        //"nUpserted" : 0,
        //"nMatched" : 0,
        //"nModified" : 0,
        //"nRemoved" : 0,
        //"upserted" : [ ]

//## Understanding WriteConcern

//- Data should be stored and you can control the "level of guarantees" of that happen with the writeConcern option
  //- The app will be a litle slower but you are sure your data makes to the database
   //- chose the options value based on your app requirements
//client (shell)    ->    MongoDB Server  ->    Storage Engine
//Image Teusday: 5:17

db.persons.insertOne({name:"crhrissy", age: 41}, {writeConcern: {w: 0}})
 //{ "acknowledged" : false }

// ☝ important for collection you don't mind loosing some seconds.
// You dont wait for Id generations. The query is fast.

db.persons.insertOne({name:"edwin", age: 22}, {writeConcern: {w: 1 ,j: true}})

// when Journalling: is true: you are sure that the records will endup in the database.

db.persons.insertOne({name:"lilian", age: 22}, {writeConcern: {w: 1 ,j: true, wtimeout: 1}})

// What is "Atomicity"
// operation (insertOne()) Error
// MongDB gurantees Atomicity. The Documents fails as a whole is succeds as a whole.
// Error: Rolled Back
// Success: Saved as whole
//MongoDB CRUD operation are Atomic on the Document Level (including Embedded Documents)

//Importing Data
You need to be outside mongo Shell in the normal CLI

//mongoimport 02-passengers.json -d Passagers -c passagersData --jsonArray --drop
//-d database
//-c collection
// --jsonArray (Type of data you are importaing)
// --drop Drops existing collection  and then insert
