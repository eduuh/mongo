// Securty & user Authentication
// Lock Down Your Data



// Security Checklist
/* 1. Authen*tication and Authorization.
   - The database will know users.
   2. Transport encrption.
   3. Encryption at Rest.
   4. Auditing.
   5. Server & Network config and Setup.
   6. Backups & software Up dates.
 */

// Authentication & Authorization
/*   Authentication                        Authorization
 *   Identification valid users of db    Indefies what the users many actually do in the database.
 *   Analogy: You are employed and       Analogy: You are employed as an account and therefore may access the
 *   therefore may access the office     office and process orders.
 * */

// Role BAsed Access Control
/* mongoDB employs Role based Access control.
 Not a User of    >         User
 Application             (Data Analyst,)
                          My application
                                                             Grouped in Roles
                                                             Privileges
 Login with username and password                     Resources            Action
                                                         Shop                 insert()


                                MongoDBServer
 Shop Database               Blog Database                 AdminDatabase
 Product    Customer      Post         Auths
 Collection collection   collection   collections

You could log in but you dont have rights to do anything in the MongoDB database.
*/

// Why Roles?
/* Different Types of Database Users.
 
   Administrator                          Developer /Your APP                 Data Scienctist
Needs to be able to manage          Needs to be able to insert, update       Needs to able to fetch data
the database config, create         delete or fetch data (CRUD)
users

Does not need to be able to         Does not need to be able to create       This user should not be able
insert or fetch Data                users or manage the database config      to delete data or insert

*/

// Create and Editing users
/*                           CreateUser()
 *
 *                            edwin
 *                             Roles
 *                             Privleges
 *                            Database (i.e admin)
 */
// Start your mongo with auth by passing the field --auth
// docker run -p 27017:27017 mongo --auth
// mongod --dbpath=./data --auth
/*  Connct to mongoDB server using mongo command
 *  You are connected to a database that requires authentication. You will see nothing when you type
 *  show dbs
 *  Mongo allows to create only one User if its the first time you are connecting.
 */
db.createUser({ user: 'edwin', pwd: 'max', roles: ['userAdminAnyDatabase'] });

// authenticate
db.auth('admin', 'pwd');
// mongo -u 'edwin' -p 'max' --authenticationDatabase admin
// now you are able to
/*
> use admin
switched to db admin
> db.createUser({ user: 'edwin', pwd: 'max', roles: ['userAdminAnyDatabase'] });
Successfully added user: { "user" : "edwin", "roles" : [ "userAdminAnyDatabase" ] }
*/

/* Build-In Roles.
 
 Database User              Database Admin            All Database Roles
    Read                      dbAdmin                   readAnyDatbase
    readWrite               userAdmin                   readWriteAnyDatabase
                             dbOwner                    userAdminAnyDatabase
                                                        dbAdminAnyDatabase
Cluster Admin          Backups/Restore         SuperUser
  clusterManager         backup                dbOwner(admin)
  clusterMonitor         restore               userAdmin(admin)
  hostMnager                                   userAdminAnyDatabase
  clustAdmin                                       root

To read more about this: google Build in Roles.
*/
//Assigning roles
db.createUser({ user: 'appdev', pwd: 'dev', roles: ['readWrite'] });
//Successfully added user: { "user" : "appdev", "roles" : [ "readWrite" ] }
// use shop
db.auth('appdev', 'dev');
db.products.insert({ name: 'Book' });
WriteCommandError({
  ok: 0,
  errmsg: 'too many users are authenticated',
  code: 13,
  codeName: 'Unauthorized',
});

// ☝ To avoid this lets login with this user from the start
// mongo -u 'appdev' -p 'dev' --authenticationDatabase shop
/*
> db.products.insertOne({name: 'A book'})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("5f6bccb10e7788848db593c2")
}*/

// Updating and extending Roles to other Databases.
db.updateUser('appdev', {
  roles: ['readWrite', { role: 'readWrite', db: 'blog' }],
});

// ☝ The command fails

//2020-09-24T01:35:10.671+0300 E QUERY    [js] Error: Updating user failed: Missing expected field "role" :
//_getErrorWithCode@src/mongo/shell/utils.js:25:13
//DB.prototype.updateUser@src/mongo/shell/db.js:1541:15
//@(shell):1:1
//>
//
//The current loged user is not authorized to update users.
db.logout();
//use admin

db.updateUser('appdev', {
  roles: ['readWrite', { role: 'readWrite', db: 'blog' }],
});
db.getUser('appdev');
/*{
        "_id" : "shop.appdev",
        "userId" : UUID("bf485102-940b-4011-81e8-ba0c0c17d27c"),
        "user" : "appdev",
        "db" : "shop",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "shop"
                },
                {
                        "role" : "readWrite",
                        "db" : "blog"
                }
        ],
        "mechanisms" : [
                "SCRAM-SHA-1",
                "SCRAM-SHA-256"
        ]
}*/

// Add ssl Transport Encryption.
//
//
// Client                    Encryted
// APP
// MongoDb Driver
//
// google configure mongod and mongos

/*
 -> openssl req -newkey rsa:2048 --new -x509 -days 365 -nodes --out mongodb-cert.crt -keyout mongodb-cert.key
Generating a RSA private key

..................................+++++
...........+++++
writing new private key to 'mongodb-cert.key'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:KE
State or Province Name (full name) [Some-State]:Nyeri
Locality Name (eg, city) []:Nyeri
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Dekut
Organizational Unit Name (eg, section) []:localhost
Common Name (e.g. server FQDN or YOUR name) []:localhost
Email Address []:edwin@gmail.com


➜ cat mongodb-cert.key mongodb-cert.crt > mongodb.pem
*/
//Starting the Server with ssl -> pointing to ☝
// mongod --dbpath=./data --sslMode requireSSl --sslPEMKeyFile mongodb.pem

//2020-09-24T02:15:37.704+0300 I NETWORK  [initandlisten] waiting for connections on port 27017 ssl
//
//☝ the instance requires ssl enabled.
//connect with ssl 👇
//➜ mongo --ssl --sslCAFile mongodb.pem --host localhost

// Production. Using Authority Certificate.

// Encryptin at Rest
//  Hashing passwords.

// Module summary
//  User and Roles
// MongoDB uses a role based Access control approach.
// You creat users on database and you then log in with your credentials (against those databases)
// Users have no rights by default you need to add roles to allow certains operations.
// Persmissons that are granted by roles ["Privileges"] are not only granted for the database the user was added to unless you explicity grant access to other database.
// You can use "AnyDatabase" roles for cross datbase access.

// Encryptions.
//  You can encrypt data during transportation and at rest.
//  During transportation you use TLS/ SSL to encrypt data.
//  For production, you should use SSL certificates issues by a certificates authority (Not self signed certificates.)
//  For encryption at rest you can encrypt both the files that hold your data(mode simple with "mongoDB Enterprise") and the values inside your documents.


