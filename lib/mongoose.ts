import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is not defined in .env.local');
}

// Extend the NodeJS global type for TypeScript
declare global {
  // Allow this to exist globally without TS errors
  // eslint-disable-next-line no-var
  var mongooseConn: typeof mongoose | null;
}

let cached = global.mongooseConn || null;

export async function connectToDB() {
  if (cached) return cached;

  cached = await mongoose.connect(uri!, { bufferCommands: false });
  global.mongooseConn = cached;

  return cached;
}
