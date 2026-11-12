import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB, upsertAdmin } from '../store.js';

const [, , email, password, name] = process.argv;

if (!email || !password) {
  console.log('Usage: npm run seed-admin -- admin@example.com "your password" ["Display name"]');
  process.exit(1);
}

if (password.length < 8) {
  console.log('Please use a password with at least 8 characters.');
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);

await connectDB();
const admin = await upsertAdmin({ email, passwordHash, name: name || 'Admin' });

if (!admin) {
  console.log('Could not save the admin account.');
  process.exitCode = 1;
} else {
  console.log(`Admin saved: ${admin.email}`);
}

if (mongoose.connection.readyState) await mongoose.disconnect();
