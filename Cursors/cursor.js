// Understanding cursors
//                    find()
//              Potentially yields 1,000s or
//              Millions of Documents
//clients                                              MongoDB Server
//(Cursor)                                              Database
//                 Request Batch #1
//                 Request Batch #2

// In the shell we have a default of 20 documents.
//this gives 20 defaults outputs.
db.tvshows.find();

// lets store the cursor to a valiable name
const tvcursor = db.tvshows.find();
// To view the next cursor . use the next function.
tvcursor.next();

// To go through all the documents.
tvcursor.forEach((doc) => {
  printjson(doc);
});

tvctvcursor.hasNext;
// Sorting Cursor Results.
// -1 for decending  > highest first
// +1 for ascending  > lowest  first
db.tvshows.find().sort({ 'rating.average': -1 });

// Sort by rating and runtime
db.tvshows.find().sort({ 'rating.average': -1, runtime: -1 });

// Skipping & Limiting Cursor Results.
db.tvshows.find().sort({ 'rating.average': 1, runtime: 1 }).skip(10).pretty();

// Limit Number of elements.
// Limits the amount of data that is retrieved

// The order does not matter. Mongodb orders the documents in the right order.

db.tvshows
  .find()
  .sort({ 'rating.average': 1, runtime: 1 })
  .skip(100)
  .limit(10)
  .pretty();

// Use Project to shape our results.
// The id is always included.
//  To include some element use the number 1.
db.tvshows.find({}, { name: 1, genres: 1, runtime: 1, rating: 1 }).pretty();

// Projection on embedded documents.
db.tvshows.find({});

