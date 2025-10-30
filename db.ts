import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(" Please define MONGODB_URI in your .env.local file");
}

// Extend global type to include a cached mongoose connection
declare global {
  
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

async function connect() {
  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "charlotte-facet", // Change to your DB name if needed
    });
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}

export default connect;
