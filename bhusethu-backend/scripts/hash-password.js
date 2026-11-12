import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.log('Usage: npm run hash-password -- "your new password"');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log('\nOptional first-run bootstrap value for .env:\n');
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
console.log('Or create the admin directly with: npm run seed-admin -- <email> "<password>"\n');
