const { execSync } = require('child_process');

// Delete old DATABASE_URL first
try {
  execSync('railway variable delete DATABASE_URL --service umami --yes --json', { shell: 'cmd.exe', encoding: 'utf-8' });
  console.log('Deleted old DATABASE_URL');
} catch(e) {}

// Set DATABASE_URL with correct service name "Postgres" (not "PostgreSQL")
console.log('Setting DATABASE_URL...');
try {
  const r1 = execSync('railway variable set DATABASE_URL=${{Postgres.DATABASE_URL}} --service umami --json', { shell: 'cmd.exe', encoding: 'utf-8', maxBuffer: 1024 * 1024 });
  console.log('DATABASE_URL result:', r1);
} catch(e) {
  console.error('DATABASE_URL error:', e.stderr || e.message);
}

// Verify
console.log('\nVerifying variables...');
try {
  const r3 = execSync('railway variable list --service umami --kv', { shell: 'cmd.exe', encoding: 'utf-8', maxBuffer: 1024 * 1024 });
  console.log(r3);
} catch(e) {
  console.error('Verify error:', e.message);
}