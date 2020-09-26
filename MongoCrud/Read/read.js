//Methods, filters, operators;
//Query Selectors (READ)
//project Operators(READ)
//db   Collection     method     filter=> equality/single value
//db. mycollection.   find(     {age:32}   )

// db. myCollection.  find(  {age: {   $gt:     30 } } )
//                     ^                ^        ^
//                    Method         operators   value
//                  {        range filter              }

//  Read                   Update         Aggregation
// Query @ projections    update          Pipeline Status
//  Query -> find         Fields          Aggregation Modules
//  Project -> chang      Arrays

// How operators impact our Data
//  Type                purpose                  Change Data            Example
//  Query Operators     Locate data              does not               $eq
//  Project Opertors    Modify data Presentation does not               $
//  update Operators    Modify + adds data       changes                $inc

// query Selectors                 Projection Operators
//  Comparison  Evaluation              $
//  Logical     Array                 $elementMatch
//  Elements    Comments              $meta

// Load the Document Provide on in this directory. For this case i used compass.
// db -> tv  collection -> tvshows.

/* When looking for equality  🔥*/

db.movies.findOne(); //return one match document

db.tvshows.find().pretty();

// Filters
db.tvshows.find({ name: 'The Last ship' });

db.tvshows.find({name: "The Strain"}).pretty()

db.tvshows.find({name: {$eq:"The Strain"}})

/* When doint comparison */
/* Gretter than */
db.tvshows.find({runtime: {$gt: 60}}).pretty()

/* Greter than or equal to*/
db.tvshows.find({runtime: {$gte: 60}}).pretty()

/* Not equal to */
db.tvshows.find({runtime: {$ne: 60}}).pretty()

/* Lower That */
db.tvshows.find({runtime: {$lt: 60}}).pretty()

/* Lower That or equal*/
db.tvshows.find({runtime: {$lte: 42}}).pretty()

/* 🔥 Querying Embedded documents. object */
/* We use the dot Operator */

db.tvshows.find({"rating.average": {$gt: 6.7}})

/* 🔥 Querying Embedded documents. array [] */
/* there is Drama in the array */
db.tvshows.find({genres: "Drama"}) // this will return even other genres, but always contains Drama

// To only return the Fields that only match the Drama.. Surround with []

db.tvshows.find({genres: ["Drama"]}).pretty()

// $in : Searchs inside  for a range

db.tvshows.find({runtime: {$in: [30,42]}}).pretty()

// $nin : excludes a range of values.


db.tvshows.find({runtime: {$nin: [30,42]}}).pretty()

db.tvshows.find({$or: [{"rating.average": {$lt: 5}},{"rating.average": {$gt: 9.3}}]})
// $or and $nor
// $or used for multiple operators.

db.tvshows.find({$or: [{"rating.average": {$lt: 5}},{"rating.average": {$gt: 9.3}}]})

// $nor: search for all document that does not match the checks.
db.tvshows.find({$nor: [{"rating.average": {$lt: 5}},{"rating.average": {$gt: 9.3}}]})

//$and

db.tvshows.find({$and: [{"rating.average": {$gt: 9}}, {genres: "Drama"}]}).pretty()

db.tvshows.find({$and: [{"rating.average": {$gt: 9}}, {genres: "Drama"}]}).count()

//Alternative of and
db.tvshows.find({"rating.average": {$gt:9}, genres: "Drama"})

// Why do we have the $and operator then.
// in Javascript having to key object on the same code does not work.
// The last key element replaces the first one. 👇

db.tvshows.find({genres: "Drama", genres: "Horror"}).count()
//23
//👆 is the same as

db.tvshows.find({genres: 'Horror'}).count()
//23

db.tvshows.find({runtime: {$not: {$eq: 60}}}).count()

// not is not used that often. This syntax is preffered
db.tvshows.find({runtime: {$ne: 60}}).count()
// Diving into Element operator : Finds
// Lets insert some document
db.users.insertMany([
  {name: "Max", hobbies: [{title: "Sports", frequency: 3}, {title: "cooking", frequency: 6}], phone: 01317827,age: 36}, {name: "Manuel", hobbies: [{title: "Cooking", frequency: 3},{title: "swim",frequency: 5}],phone: 89989}])

db.users.updateOne({name: 'Max'},{$set : {name: "Max", hobbies: [{title: "Sports", frequency: 3}, {title: "cooking", frequency: 6}], phone: 01317827,age: 36}})

// Let find the document that age exist
db.users.find({age: {$exists: true}}).pretty()

/*
{
        "_id" : ObjectId("5f6ebbf175b3aace217f0cde"),
        "name" : "Max",
        "hobbies" : [
                {
                        "title" : "Sports",
                        "frequency" : 3
                },
                {
                        "title" : "cooking",
                        "frequency" : 6
                }
        ],
        "phone" : 1317827,
        "age" : 36
}
*/

db.users.find({age: {$exists: true, $gt: 30}}).pretty()

// What if a field exist but is null?
// lets insert a new user

db.users.insertOne({name: "Anne", hobbies: [{title: "Sports", frequency: 3}, {title: "Reading", frequency: 10}], phone: 01317827,age: null})


// Let find the document that age exist
db.users.find({age: {$exists: true}}).pretty()
/*
{
        "_id" : ObjectId("5f6ebbf175b3aace217f0cde"),
        "name" : "Max",
        "hobbies" : [
                {
                        "title" : "Sports",
                        "frequency" : 3
                },
                {
                        "title" : "cooking",
                        "frequency" : 6
                }
        ],
        "phone" : 1317827,
        "age" : 36
}
{
        "_id" : ObjectId("5f6ebde375b3aace217f0ce0"),
        "name" : "Anne",
        "hobbies" : [
                {
                        "title" : "Sports",
                        "frequency" : 3
}*/

// check of age exist and if there is a value

db.users.find({age: {$exists: true, $ne: null}}).pretty()


db.users.insertOne({name: "Edwin", hobbies: [{title: "Coding", frequency: 3}, {title: "Reading", frequency: 12}], phone: 01317827,age: null})


db.users.insertOne({name: "Edwin", hobbies: [{title: "Sleeping", frequency: 3}, {title: "Reading", frequency: 12}], phone: "01317827",age: null})

// Now lets use the type Operators. check on types on mongo documentation.
db.users.find({phone: {$type: "number"}}).pretty() // Returns all fields that are numbers.

db.users.find({phone: {$type: "string"}}).pretty() // Returns all fields that are numbers.
/*
{
        "_id" : ObjectId("5f6ebef975b3aace217f0ce2"),
        "name" : "Edwin",
        "hobbies" : [
                {
                        "title" : "Sleeping",
                        "frequency" : 3
                },
                {
                        "title" : "Reading",
                        "frequency" : 12
                }
        ],
        "phone" : "01317827",
        "age" : null
}
*/
// Using Regex: 
// Nice for Searching text, but not the most performant.
db.tvshows.find({summary: {$regex:/musical/}}).pretty()

//  financial Data

db.sales.insertMany([{volume: 100, target: 120},{voluem: 89, target: 80},{volume: 200, target: 177}])

// Comparing elements values: we use expr

db.sales.find({$expr: {$gt: ["$volume","$target"]}}).pretty()

// Play aroud this to undestand.

db.sales.find({$expr: {$gt: [{$cond: {if: {$gte: ["$volume",190]},then: {$subtract: ["$volume",10]}, else: "$volume"}}, "$target"]}}).pretty()

/* querying Array 🔥 */

