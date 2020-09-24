// Document : geospartial
// gogle maps lat , lng
// mongo -> lng, lat

db.geospartial.insertOne({
  name: 'Adison',
  location: {
    type: 'Point',
    coordinates: [36.959827, -0.394561],
  },
});

db.geospartial.insertOne({
  name: 'Kimathi Hockey Grounds',
  location: { type: 'Point', coordinates: [36.959752, -0.393842] },
});

db.geospartial.insertOne({
  name: 'Kimathi Hockey Grounds',
  location: { type: 'Point', coordinates: [36.959519, -0.39417] },
});

// first Lets create an Index.
db.geospartial.createIndex({ location: '2dsphere' });
/*
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}*/

// Lets coordinates around 100m
db.geospartial.find({
  location: {
    $near: { $geometry: { type: 'Point', coordinates: [36.959519, -0.39417] } },
  },
});

/*

{
        "_id" : ObjectId("5f6c470264f92933450233b3"),
        "name" : "Kimathi Hockey Grounds",
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        36.959519,
                        -0.39417
                ]
        }
}
{
        "_id" : ObjectId("5f6c46e664f92933450233b2"),
        "name" : "Kimathi Hockey Grounds",
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        36.959752,
                        -0.393842
                ]
        }
}
{
        "_id" : ObjectId("5f6c46e064f92933450233b1"),
        "name" : "Adison",
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        36.959827,
                        -0.394561
                ]
        }
}
*/

// Find coordinates that are within Kimathi Hockey Grounds
// apploximately a distance of 50 meters

db.geospartial.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [36.959519, -0.39417] },
      $maxDistance: 30,
      $minDistance: 10,
    },
  },
});
/*
{
        "_id" : ObjectId("5f6c46e664f92933450233b2"),
        "name" : "Kimathi Hockey Grounds",
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        36.959752,
                        -0.393842
                ]
        }
}*/

// Create the hockey grounds areas
p1 = [36.959476, -0.393671];
p2 = [36.959814, -0.393652];
p3 = [36.959457, -0.393652];
p4 = [36.959816, -0.394339];

db.areas.insertOne({
  name: 'Kimathi Hockey Grounds',
  location: { type: 'Polygon', coordinates: [[p1, p2, p3, p4, p1]] },
});

//## Points.//inside;
gps1 = [36.960218, -0.397404];
gps2 = [36.960378, -0.397239];

gps3 = [36.96, -0.397746];

db.gpslocation.insertOne({
  name: 'inside point 1',
  location: { type: 'Point', coordinates: gps1 },
});

db.gpslocation.insertOne({
  name: 'inside point 2',
  location: { type: 'Point', coordinates: gps2 },
});

db.gpslocation.insertOne({
  name: 'outside point 1',
  location: { type: 'Point', coordinates: gps3 },
});

//long lat
//Boudaries

p1 = [36.960181, -0.397128];
p2 = [36.960445, -0.397204];
p3 = [36.960359, -0.397563];
p4 = [36.960069, -0.397432];

db.areas.insertOne({
  name: 'VC court',
  location: { type: 'Polygon', coordinates: [[p1, p2, p3, p4, p1]] },
});

db.gpslocation.find({
  location: {
    $geoWithin: {
      $geometry: { type: 'Polygon', coordinates: [[p1, p2, p3, p4, p1]] },
    },
  },
});
/*
{
        "_id" : ObjectId("5f6c567967ef7f442f202a52"),
        "name" : "inside point 1",
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        36.960218,
                        -0.397404
                ]
        }
}
{
        "_id" : ObjectId("5f6c56a967ef7f442f202a53"),
        "name" : "inside point 2",
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        36.960378,
                        -0.397239
                ]
        }
}*/

