## Why mongo

- Mongo is a database `from` browser `and` mobile App
  - We use `mongoose` to work with mongo in Node.
    - `ORM` object relational mapper.

## Where mongo fits

- There is usually a server between the mobile and db

## Fundamental of Mongodb

- Database #1 . Allows us to create multiple databases on a single instance.
  - Collection

### Core of Mongoose/Mongo

The four operation **CRUD**.

1. Create.
2. Update.
3. Destory/Delete.
4. Read

## Mongo Connection.

```
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');

mongoose.connection
  .once('open', () => console.log('Good to go'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });
```

> Event Handlers.
> **once()** => watch for mongoose to emit an even 'open'
> **on()** => watch for mongoose to emit and error event.

## Create a Schema and a model

- Properties in schema are not madatory(unless indicated.)

```Javascript
const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const UserSchema = new Schema({ name: String });

const User = mongoose.model('user', UserSchema);

modules.exports = user;
```

## Mocha : Testing Framework

- Using mocha to test Crud functtions.

### Create

### Find

- To Find records, from mongo db. There a number of ways to do
  - model.findOne({\_id: joe.\_id})

### Delete

- **Remove is deplicated.**
- You can use either **model class** or **model instance**
- **Model class**
  - remove : remove alot with a criteria.
  - findOneAndRemove
  - findByIdAndRemove
- **Model instance**
  - remove

### Update

- **Model Class**
  - update
  - findOneAndUpdate
  - findByIdAndUpdate
- **Model Instance**

  - Update
  - 'set' and 'save'

#### Update operator.

### Mongoose Validation.

### Embedding Relationship.

![Embedding Mongo Relationship](./images/embedding.png)

### Our server.

- Virtual types: properties on a model that don't get persisted to the database.
- Use repl to test virtual types.

```
UserSchema.virtual('postCount').get(function(){
return this.posts.length;
};

```

We don't use fat arrow functions => since we want to have access to the **this** keyword.

```

### challages of NestedDocuments.
```

1. Fetching specific number of posts is challaging.
2. When you nest Documents inside posts. - It not easy to get the list of nested documents.

### Using Separate database.

- We don't have single operation join with mongodb. (we have to touch the database alot of times.)

### querys.

```Js
User.findOne({name: 'edwin'}).populate('blogPosts').then()

### Loading deeply nested Collection.
```

### Middleware : pre and post Hooks.

### Dealing with cylic : delete

## Schema-less or Not?

Isn't MongoDB all about havng No data Schema? Yes mongodb does not force schema on you.
MongoDB enforce no schemas! Documents don't have to use the smae schema inside of one collection.

> But that does not mean that you can't use some kind of schema!

## To Schema or Not to Schema

### Chaos!

You choose any approach here.

- very Different!
- Extra Data
- Full Equality (sql)
  img(9:19)

## Data Types.

- Text "max"
- Boolean true
- Number
  - integers(int32)
  - NumberLong(int64)
  - NumberDecimal- Provides high precision.
- ObjectId()
  - Has sorting. Respect timestamp.
- ISODate
  - Timestamp
    - Autogenerated.
- Embeded Documents
  - Have all above fields
- Array

db.companies.insertOne({name: "Fresh Apples Inc", isStartup: true, employees: 33, funding: 1234567890123456789, details: {ceo: "Mark Super"}, tags: [{title: "super"}, {title: "perfect"}], foundingDate: new Date() , insertedAt: new Timestamp()})

> db.companies.find().pretty()
> {

        "_id" : ObjectId("5f66f97031192e5844fab766"),
        "name" : "Fresh Apples Inc",
        "isStartup" : true,
        "employees" : 33,
        "funding" : 1234567890123456800,
        "details" : {
                "ceo" : "Mark Super"
        },
        "tags" : [
                {
                        "title" : "super"
                },
                {
                        "title" : "perfect"
                }
        ],
        "foundingDate" : ISODate("2020-09-20T06:40:48.512Z"),
        "insertedAt" : Timestamp(1600584048, 1)

}

{
"db" : "companyData",
"collections" : 1,
"views" : 0,
"objects" : 1,
"avgObjSize" : 236,
"dataSize" : 236,
"storageSize" : 20480,
"indexes" : 1,
"indexSize" : 20480,
"totalSize" : 40960,
"scaleFactor" : 1,
"fsUsedSize" : 103304413184,
"fsTotalSize" : 171171495936,
"ok" : 1
}

> db.company.drop(_)
> uncaught exception: ReferenceError: _ is not defined :
> @(shell):1:1
> db.company.drop()
> false
> db.companies.drop()
> true
> db.stats()
> {

        "db" : "companyData",
        "collections" : 0,
        "views" : 0,
        "objects" : 0,
        "avgObjSize" : 0,
        "dataSize" : 0,
        "storageSize" : 0,
        "indexes" : 0,
        "indexSize" : 0,
        "totalSize" : 0,
        "scaleFactor" : 1,
        "fsUsedSize" : 103304376320,
        "fsTotalSize" : 171171495936,
        "ok" : 1

}

There are mongoDb datatypes.

> db.numbers.insertOne({a: NumberInt(1)})
> {

        "acknowledged" : true,
        "insertedId" : ObjectId("5f66fbbf31192e5844fab768")

}

> db.stats()
> {

        "db" : "companyData",
        "collections" : 1,
        "views" : 0,
        "objects" : 2,
        "avgObjSize" : 29,
        "dataSize" : 58,
        "storageSize" : 20480,
        "indexes" : 1,
        "indexSize" : 20480,
        "totalSize" : 40960,
        "scaleFactor" : 1,
        "fsUsedSize" : 103304437760,
        "fsTotalSize" : 171171495936,
        "ok" : 1

}

> typeof db.numbers.findOne().a
> number

## Data Schemas and Data Modelling

## Which Data does my App need or generate?

- User information , Product, Information , Orders

- Define The fields you'll need (and how they relate)

## Where do I need my Data?

- Welcome Page, products, List Page Orders Page

  - \_Defines Your required collections + fields grouping

## Which kind of Data or Information do I want to display?

- Welcome Page, product Names, Product Page
- Define which queries you'll need.

## How often do I fetch my data?

- For every page reload.
- Defines whether you should optimize for easy fetching.

## How often do I write or Change my Data?

Orders => Often Product Data Rarely.

- Define whether you should optimize for easy writing.

### Nested/ Embeded Document

- Example is address

### References

- Customers and Books as different collection

Example #1 - Patient <-> Desease Summary.

Patient A - summary a

using variables in shell

> dsid
> db.patients.findOne({name: "Max"}).diseaseSummary
> summary-max-1
> var dsid = db.patients.findOne({name: "Max"}).diseaseSummary
> dsid
> summary-max-1
> db.diseaseSumaries.findOne({\_id: dsid})
> { "\_id" : "summary-max-1", "diseases" : [ "cold", "broken leg" ] }

👆 is not idea. The most Ideal way of dealing with this could be using nested documents.

> db.persons.insertOne({name: "edwin", car: {model: "Audi", price: 300000}})
> {

        "acknowledged" : true,
        "insertedId" : ObjectId("5f67015c31192e5844fab76b")

}

> db.persons.findOne()
> {

        "_id" : ObjectId("5f67015c31192e5844fab76b"),
        "name" : "edwin",
        "car" : {
                "model" : "Audi",
                "price" : 300000
        }

}

### One to one Relationship.

> db.persons.insertOne({name: "max", age: 29, salary: 30000})
> {

        "acknowledged" : true,
        "insertedId" : ObjectId("5f6701ee31192e5844fab76c")

}

> db.cars.insertOne({model: "Bmw", price: 40000, owner: ObjectId("5f6701ee31192e5844fab76c")})

{
"acknowledged" : true,
"insertedId" : ObjectId("5f67023131192e5844fab76d")
}

> db.cars.find().pretty()
> {

        "_id" : ObjectId("5f67023131192e5844fab76d"),
        "model" : "Bmw",
        "price" : 40000,
        "owner" : ObjectId("5f6701ee31192e5844fab76c")

}

### Many to Many Realationship.

consider this case

> db.questionThreads.insertOne({creator: "Max", question: "how does that all work?", aswers: ["q1aq1","q1a2"]})
> {

        "acknowledged" : true,
        "insertedId" : ObjectId("5f6702ee31192e5844fab76e")

}

> db.questionThreads.findOne()
> {

        "_id" : ObjectId("5f6702ee31192e5844fab76e"),
        "creator" : "Max",
        "question" : "how does that all work?",
        "aswers" : [
                "q1aq1",
                "q1a2"
        ]

}

> db.answes.insertMany([{_id: "q1a1", text: "It works like that."}, {_id: "q1a2", text: "Thanks!"}])
> { "acknowledged" : true, "insertedIds" : [ "q1a1", "q1a2" ] }
> db.answers.find()
> db.answes.find()
> { "\_id" : "q1a1", "text" : "It works like that." }
> { "\_id" : "q1a2", "text" : "Thanks!" }

👆 have some challaegs. The best solution in this case could just be to embedd documents

> db.questionThreads.deleteMany({})
> { "acknowledged" : true, "deletedCount" : 1 }
> db.questionThreads.insertOne({creator: "Edwin", question: "how does that work?", answers: [{text: "Like that."}, {text: "Thanks"}]})
> {

        "acknowledged" : true,
        "insertedId" : ObjectId("5f67041631192e5844fab76f")

}

> db.questionThreads.findOne()
> {

        "_id" : ObjectId("5f67041631192e5844fab76f"),
        "creator" : "Edwin",
        "question" : "how does that work?",
        "answers" : [
                {
                        "text" : "Like that."
                },
                {
                        "text" : "Thanks"
                }
        ]

}

>

Many To Many Relationship Using reference.

### Example #4 - City <-> Citizens

> db.cities.insertOne({name: "New York city", coordinates: {lat: 21, lng: 55}})
> {

        "acknowledged" : true,
        "insertedId" : ObjectId("5f6705ac31192e5844fab770")

}

> db.citizens.insertMany([{name: "Ewin" , cityId: ObjectId("5f6705ac31192e5844fab770")}, {name: "Manuel", cityId: ObjectId("5f6705ac31192e5844fab770")}])
> {

        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("5f67064531192e5844fab771"),
                ObjectId("5f67064531192e5844fab772")
        ]

}

> db.citizens.find()
> { "\_id" : ObjectId("5f67064531192e5844fab771"), "name" : "Ewin", "cityId" : ObjectId("5f6705ac31192e5844fab770") }
> { "\_id" : ObjectId("5f67064531192e5844fab772"), "name" : "Manuel", "cityId" : ObjectId("5f6705ac31192e5844fab770") }
> { "\_id" : ObjectId("5f67064531192e5844fab772"), "name" : "Manuel", "cityId" : ObjectId("5f6705ac31192e5844fab770") }

### Customer and Products.

You could decide to create a Join table to model the relational.

> db.products.insertOne({title: "A book" , price: 12.833})
> {

        "acknowledged" : true,
        "insertedId" : ObjectId("5f6706bd31192e5844fab773")

}

> db.customre.insertOne({name: "max", age: 29})
> {

        "acknowledged" : true,
        "insertedId" : ObjectId("5f6706da31192e5844fab774")

}

> db.order.insertOne({productId: ObjectId("5f6706bd31192e5844fab773"), customerId: ObjectId("5f6706da31192e5844fab774")})
> {

        "acknowledged" : true,
        "insertedId" : ObjectId("5f67073331192e5844fab775")

}

### You could also create [Orders array in the customre]

> db.customre.findOne()
> { "\_id" : ObjectId("5f6706da31192e5844fab774"), "name" : "max", "age" : 29 }
> db.products.findOne()
> {

        "_id" : ObjectId("5f6706bd31192e5844fab773"),
        "title" : "A book",
        "price" : 12.833

}

> db.customre.updateOne({}, {\$set: {orders: [{productId: ObjectId("5f6706bd31192e5844fab773"), quntity: 2}]}}(
> ...
> db.customre.updateOne({}, {\$set: {orders: [{productId: ObjectId("5f6706bd31192e5844fab773"), quntity: 2}]}})
> { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

## What about Embedding Documents.

Are duplicate fine? In some cases , duplicate are just fine.

But some data need to be current. if You data change. Dont use Embedded approach.

### Books and Author.

For this case, It make more sens to reference data that might need to be updated in the future.

> db.authors.insertMany([{name: "max Schwarz", "age": 23}, {name: "Manuel Lor", "age": 30}])
> {

        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("5f670bcc31192e5844fab777"),
                ObjectId("5f670bcc31192e5844fab778")
        ]

}

> db.authors.find({})
> { "\_id" : ObjectId("5f670bcc31192e5844fab777"), "name" : "max Schwarz", "age" : 23 }
> { "\_id" : ObjectId("5f670bcc31192e5844fab778"), "name" : "Manuel Lor", "age" : 30 }
> db.books.updateOne({}, {\$set: {authors: [ ObjectId("5f670bcc31192e5844fab777"), ObjectId("5f670bcc31192e5844fab778")]}})
> { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
> db.books.findOne()
> {

        "_id" : ObjectId("5f670a3c31192e5844fab776"),
        "name" : "My favorite Book",
        "authors" : [
                ObjectId("5f670bcc31192e5844fab777"),
                ObjectId("5f670bcc31192e5844fab778")
        ]

}

### Relations - Options.

- Nested / Embedded Documents

  - Groups data together logically.
  - Greate for data that belong togethre and is not really overlapping with other data.
  - Avoid super-deep nesting (100+ levels) or extremely long arrays (15mbs size limit per document)

- References.
- Split Data across collections.
- Great for related but shared data as well as for data which is used in relations and standalone.
  - Allows you to overcome nesting and size limits (by creating new documents)

## Joining with \$lookup.

This givs you all the date in one Step.

> db.books.aggregate([{$lookup: {from: "authors", localField: "authors" , foreignField: "_id", as: "creators" }}]).pretty()
> {

        "_id" : ObjectId("5f670a3c31192e5844fab776"),
        "name" : "My favorite Book",
        "authors" : [
                ObjectId("5f670bcc31192e5844fab777"),
                ObjectId("5f670bcc31192e5844fab778")
        ],
        "creators" : [
                {
                        "_id" : ObjectId("5f670bcc31192e5844fab777"),
                        "name" : "max Schwarz",
                        "age" : 23
                },
                {
                        "_id" : ObjectId("5f670bcc31192e5844fab778"),
                        "name" : "Manuel Lor",
                        "age" : 30
                }
        ]

}

>

### Example Project: A blog : [image 11:20]

User
create post Edit post Detele Pst, Fetch Post Fetch Post comment
App server

### user

## Data

- User (independent collections)

  - \_id
  - name
  - age
  - email

- Post

  - \_id
  - title
  - text
  - tags

  - comment (Nesting comment could be fine) - \_id - text

image 12:51

> db.post.find().pretty()
> {

        "_id" : ObjectId("5f67272f31192e5844fab77b"),
        "title" : "My First Post!",
        "text" : "This is my first Post, I hope you like it",
        "comments" : [
                {
                        "text" : "I like your post",
                        "author" : ObjectId("5f67270931192e5844fab779")
                }
        ],
        "creator" : ObjectId("5f67270931192e5844fab77a"),
        "tags" : [
                "new",
                "tech"
        ]

}

### Schema Validation.

insertOne()
collections
schemaValidation

```javascript
db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'Must be a String and required',
        },
        text: {
          bsonType: 'objectId',
          description: 'Must be an objectId and is required',
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an objectId and is required',
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              author: {
                bsonType: 'objectId',
                description: 'must be an objecct id and is required',
              },
            },
          },
        },
      },
    },
  },
});
```

> db.posts.insertOne({title: "My First Post!" , text: "This is my first Post, I hope you like it", tags: ["new", "tech"] , creator: ObjectId("5f67270931192e5844fab77a"), comments: [{text: "I like your post", author: 12}]})
> WriteError({

        "index" : 0,
        "code" : 121,
        "errmsg" : "Document failed validation",
        "op" : {
                "_id" : ObjectId("5f672ebb93a3e16ef842ba4e"),
                "title" : "My First Post!",
                "text" : "This is my first Post, I hope you like it",
                "tags" : [
                        "new",
                        "tech"
                ],
                "creator" : ObjectId("5f67270931192e5844fab77a"),
                "comments" : [
                        {
                                "text" : "I like your post",
                                "author" : 12
                        }
                ]
        }

}) :
WriteError({
"index" : 0,
"code" : 121,
"errmsg" : "Document failed validation",
"op" : {
"\_id" : ObjectId("5f672ebb93a3e16ef842ba4e"),
"title" : "My First Post!",
"text" : "This is my first Post, I hope you like it",
"tags" : [
"new",
"tech"
],
"creator" : ObjectId("5f67270931192e5844fab77a"),
"comments" : [
{
"text" : "I like your post",
"author" : 12
}
]
}
}
})
WriteError@src/mongo/shell/bulk_api.js:458:48
mergeBatchResults@src/mongo/shell/bulk_api.js:855:49
executeBatch@src/mongo/shell/bulk_api.js:919:13
Bulk/this.execute@src/mongo/shell/bulk_api.js:1163:21
DBCollection.prototype.insertOne@src/mongo/shell/crud_api.js:264:9
@(shell):1:1

### Updating Validations

### Data Modelling & Structuring - Things to consider.

1. In which Format will you Fetch your Data?
2. How often will you fetch and change your Data?
3. How much data will you save and how big is it?
4. How is your Data related?
5. Will Duglicate hurt you (==> many updates?)
6. Will you

##### Modelling Schemas

- Schemas should be modelled based on your appliation needs.
- Important factors are: Read and Write Frequecy, relations, amount (and size) of data.
- Modelling Relations
  -Two options: Embedded documents or references.
  - **use embedded documents** if you got one-to-one or one-to-many relationships and no app or data size reason to split.
  - Use reference if data amount/size of application needs requires it to for many to many relationships.
  - Exception are always possible ==> keep your app requirements in mind!.

### Schema Validation.

- You can define rules to validate inserts and updat before writing to the database. Choose your validation level and ction based on your application.

### Working with shell @and server

- Beyond Start and Stop.

1. Start MongoDB server as **Process** and **Service**
   \$ mongod --port 27017

2. Set custom path for the logs and Database.

   mongod --dbpath /mongo/db --logpath /mongo/logs/log.log

3. **--repair** : Repair the database.
4. --fork. Only runs on mac on linux
   sudo mongod --fork --logpath /mongo/logs/log.log

Start mongodb as a service.

windows. net stop mongodb

mongod --port 23343 --bind_ip 127.0.0.1 --dbpath ./data

### Using mongoDb config files

mongod -f <pathtoconfig> --port <port> --bind_ip 127.0.0.1

### shell

\$ help
\$ db.help()
\$ db.collection()

### MongoDB Compass.

Give you a way to explore data visual.

##### What insied

insertOne() db.collectionName.insertOne({field: "value"})

insertMany() db.conllection.insertMany([{field: "value"}, field: "value"])

insert() db.collection.insert()

mongoimport mongoimport -d cars -c carsList --drop --jsonArray
