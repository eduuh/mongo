// What Influence Performance?

// Developer /DB Admin 🔥
// Efficent queries /operations
// Indexes
// Fitting Data Schema

// Db ADmin/ System Admin 🔥
// Hardware & Network.
// Efficent queries /op
// Sharding
// Replica Sets

// Capped Collection . A collection which data is deleted. Authomatic clearup.
// Cached data is a good example.

db.createCollection('capped', { capped: true, size: 1000, max: 3 });
db.capped.insertOne({ name: 'edwin' });
db.capped.insertOne({ name: 'Muray' });
db.capped.insertOne({ name: 'Kamau' });

// For capped collection . Inserting order is maintained
// A capped collection . clears the oldest document when new documents are added.

// Replica Sets.
/* Client (shell, Driver)
           client (Shell Driver)
              
             MongoDB server
            
               Primary Node (Asynchromous replicate)
secordary                               secondary 
node                                     node
*/

// Why use Replica (create a replica set : chech that out)
// 1. Performance
// 2. Fault prove

// sharding. (Horizontal Scalling)
//  MongoDB server: More servers.
//  With sharding, data is distributed (not replicated) across shards.
//
// How sharding Works.
//                   client;
//
//                   mongos(Router)
//      mongod(server)      mongod(server)  mongod(server)
//      Shards              Shards          Shards
//    Shard key            shard key         shard key
//                   Documents

// Queries & Sharding;
//           find();
//
//           mongos()

//   mongos: operation does       option:2 Operation does
//   not contain shard key        contain shard Key
//
//                                         Direct send right shard.
//   shard               shard           shard

// Deploying a mongDB Server.
// localhost                    =>              Web server/Host
// mongod                       =>              mongod
// manage shards        Secure User/Auth        Proctet Web Server/
//                        setup                 Network
// Mnage Replica sets    Encryptions             Reqular Backups     Update Software
//                       Transportation and
//                        rest

// MongoDB Atlas is a Managed Solution.
//
