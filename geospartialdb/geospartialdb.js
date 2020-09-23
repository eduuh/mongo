// coordinates are always express as lat , long pairs (google maps)
// You need to store location exatly as a geojson.
// google maps gives [lat, lng] but mongo takes [lng, lat]
//
// Storing Geospartail Data.
// You store geospartail data next to your other data in your documents.
// Geospartail data has to follow the special GeoJson format and respects the types supported in mongoDB.
// Don't forget that the coordinates are [longitude, latitude] not the other way around
//
// Geospartial queries.
// $near, $geoWithin and $geoInterects get you very far.
// Gespartial queries work with geoJson data.
//
//
// Geospartial indexes.
// You can add an index to geosparatial data "2dsphere"
// Some operations ($near) require such and index.
//

db.places.insertOne({
  name: 'calfornia Academy of Science',
  location: { type: 'Point', coordinates: [-122.4748484, 37.7672544] },
});

db.places.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [-122.47114, 37.7771104] },
    },
  },
});

//☝ fails with the error
//Error: error: {
//"ok" : 0,
//"errmsg" : "error processing query: ns=test.placesTree: GEONEAR  field=location maxdist=1.79769e+308 isNearSphere=0\nSort: {}\nProj: {}\n planner returned error :: caused by :: unable to find index for $geoNear query",
//"code" : 291,
//"codeName" : "NoQueryExecutionPlans"
//}
// The above query benefits alot from '2dsphere' index
//### lets add a Geospartial Index.
db.places.createIndex({ location: '2dsphere' });

☝ successeds
//

//> db.places.createIndex({ location: '2dsphere' });
//{
        //"createdCollectionAutomatically" : false,
        //"numIndexesBefore" : 1,
        //"numIndexesAfter" : 2,
        //"ok" : 1
//}
//
//When we rerun the code that failed. It suceeds but not much information is shown
//We neet to restrict.
// You want to Find all location within a distance that are in your database 🔥

db.places.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [-122.47114, 37.7771104] }, $maxDistance: 30, $minDistance: 10,
    },
  },
});

// winthin 30 meters you get nothing for this. Lets try 1500 👇I get my location.
// Which points are near to our points.

//> db.places.find({   location: {     $near: {       $geometry: { type: 'Point', coordinates: [-122.47114, 37.7771104] }, $maxDistance: 1000, $minDistance: 10,     },   }, });
//> db.places.find({   location: {     $near: {       $geometry: { type: 'Point', coordinates: [-122.47114, 37.7771104] }, $maxDistance: 1500, $minDistance: 10,     },   }, });
//{ "_id" : ObjectId("5f6baaca3597821d61f2768e"), "name" : "calfornia Academy of Science", "location" : { "type" : "Point", "coordinates" : [ -122.4748484, 37.7672544 ] } }
//>

//## which points are in this area 🔥
// lets add few more coordinates.
db.places.insertOne({name: "Conservatory of Flowers", location: {type: "Point", coordinates: [-122.4615748,37.7701756]}})


db.places.insertOne({name: "Golden Gate tenis park", location: {type: "Point", coordinates: [-122.4593702,37.7705046]}})

// This is not within the geometry. We dont expect it in the output.
db.places.insertOne({name: "Nopa", location: {type: "Point", coordinates: [-122.4389058,37.7747415]}})

// I now expect we have 4 places in the database
//
db.places.find().pretty()

// query to find places inside an area.
//
const p1 = [-122.4547, 37.77473]
const p2 = [-122.45303, 37.76641]
const p3 = [-122.51026, 37.76411]
const p4 = [-122.51088, 37.77131]

// 
db.places.find({location: {$geoWithin: {$geometry: {type: "Polygon", coordinates: [[p1,p2,p3,p4,p1]]}}}})

// the output is as follows
//> db.places.find({location: {$geoWithin: {$geometry: {type: "Polygon", coordinates: [[p1,p2,p3,p4,p1]]}}}})
//{ "_id" : ObjectId("5f6bafcd3597821d61f2768f"), "name" : "Conservatory of Flowers", "location" : { "type" : "Point", "coordinates" : [ -122.4615748, 37.7701756 ] } }
//{ "_id" : ObjectId("5f6bb1343597821d61f27690"), "name" : "Golden Gate tenis park", "location" : { "type" : "Point", "coordinates" : [ -122.4593702, 37.7705046 ] } }
//{ "_id" : ObjectId("5f6baaca3597821d61f2768e"), "name" : "calfornia Academy of Science", "location" : { "type" : "Point", "coordinates" : [ -122.4748484, 37.7672544 ] } }
//>

// Find out of the User in a Certain Area. 🔥 First and last coordinates have to match.
db.area.insertOne({name: "Golden Gate Park", area: {type: "Polygon", coordinates: [[p1,p2,p3,p4,p1]]}})

// We need to create and index again.
db.area.createIndex({area: "2dsphere"})

// Query
db.area.find({ area: {$geoIntersects: {$geometry: {type: "Point", coordinates: [-122.49089,37.76992]}}}})

// I get  ther are that intersect.
/*
{
        "_id" : ObjectId("5f6bb4f93597821d61f27692"),
        "name" : "Golden Gate Park",
        "area" : {
                "type" : "Polygon",
                "coordinates" : [
                        [
                                [
                                        -122.4547,
                                        37.77473
                                ],
                                [
                                        -122.45303,
                                        37.76641
                                ],
                                [
                                        -122.51026,
                                        37.76411
                                ],
                                [
                                        -122.51088,
                                        37.77131
                                ],
                                [
                                        -122.4547,
                                        37.77473
                                ]
                        ]
                ]
        }
}*/

// You could also intersect areas themselfs.
//> db.area.find({ area: {$geoIntersects: {$geometry: {type: "Point", coordinates: [-122.4846,39.76992]}}}}).pretty()

// Finding places inside a certain Radius. 🔥
db.places.find({location: {$geoWithin: {$centerSphere:[[-122.46203,37.77286], 1/6378.1] }}})


//We find all the locations that are within the radious.

/*
> db.places.find({location: {$geoWithin: {$centerSphere:[[-122.46203,37.77286], 1/6378.1] }}}).pretty()
{
        "_id" : ObjectId("5f6bafcd3597821d61f2768f"),
        "name" : "Conservatory of Flowers",
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        -122.4615748,
                        37.7701756
                ]
        }
}
{
        "_id" : ObjectId("5f6bb1343597821d61f27690"),
        "name" : "Golden Gate tenis park",
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        -122.4593702,
                        37.7705046
                ]
        }
}*/


