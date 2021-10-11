const {MongoClient} = require('mongodb')

// Connection URL
const url = process.env.DB_URL || 'mongodb://localhost:27017'
const client = new MongoClient(url)
let db = null;
// Database Name
const dbName = process.env.DB_NAME || 'sampleDB';

const connectDB = async () => {
    try {
        // Use connect method to connect to the server
        await client.connect()
        console.log('Connected successfully to server')
        return client.db(dbName);
    } catch (e) {
        console.log(" Error while connecting to DB ", e);
        disconnectDB();
    }
}

/*
* Initialise DB connection
* */
((async () => {
    db = await connectDB(dbName);
})())

const disconnectDB = async () => client.close()

const getQuery = async (collectionName, queryStr, limit) => {
    try {
        return await db.collection(collectionName).find(queryStr).limit(limit).toArray();
    } catch (e) {
        console.log(" There is some error while getting results from DB ");
        console.log(e);
        return []
    }
}

module.exports = {
    connectDB,
    disconnectDB,
    getQuery
}