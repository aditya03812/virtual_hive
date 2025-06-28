import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://adityakumar:923414@cluster0.jtburli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// 1. Define a proper interface
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 2. Extend the global object
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

// 3. Initialize global cache
const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: 'virtual-hive',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};