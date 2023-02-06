import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DBNAME = process.env.MONGODB_DB

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

/**
 * A single function that connects to the MongoDB database with Mongoose. Will
 * not allow multiple connections to reduce redundency.
 * @returns whole Mongoose object
 */
export default async function connectToDatabase() {
    if (!MONGODB_URI) { // ERROR - no MONGODB_URI has been determined
        throw new Error(
            'Please define the MONGODB_MONGODB_URI environment variable inside .env.local'
        )
    }
    
    if (!MONGODB_DBNAME) { // ERROR - no db has been determined
        throw new Error(
            'Please define the MONGODB_DB environment variable inside .env.local'
        )
    }

    if (cached.conn) {  // SINGLETON - Connection already exists
        return cached.conn
    }

    if (!cached.promise) {
        mongoose.set('strictQuery', true)
        cached.promise = mongoose
            .connect(MONGODB_URI + MONGODB_DBNAME + '?retryWrites=true&w=majority')
            .then((mongo) => mongo)
    }

    try {
        const mongo = await cached.promise

        if (mongo.connections.length > 1) { // ERROR - multiple mongo connections when supposed to be a singleton
            throw Error('Should not have multiple mongo connections.')
        }

        cached.conn = mongo
    } catch (e) {
        cached.promise = null
        throw e
    }
    return cached.conn
}