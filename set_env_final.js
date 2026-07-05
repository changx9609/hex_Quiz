const { execSync } = require('child_process');

// Delete old variables first
try {
  execSync('railway variable delete DATABASE_URL --service umami --yes --json 2>&1', { shell: 'cmd.exe', encoding: 'utf-8' });
} catch(e) {}
try {
  execSync('railway variable delete APP_SECRET --service umami --yes --json 2>&1', { shell: 'cmd.exe', encoding: 'utf-8' });
} catch(e) {}

// Set new variables - use separate processes to avoid any escaping issues
console.log('Setting DATABASE_URL...');
try {
  const r1 = execSync('railway variable set DATABASE_URL=${{PostgreSQL.DATABASE_URL}} --service umami --json --skip-deploys', { shell: 'cmd.exe', encoding: 'utf-8', maxBuffer: 1024 * 1024 });
  console.log('DATABASE_URL result:', r1);
} catch(e) {
  console.error('DATABASE_URL error:', e.stderr || e.message);
  console.error('stdout:', e.stdout);
}

console.log('Setting APP_SECRET...');
try {
  const r2 = execSync('railway variable set APP_SECRET=e5305c3eb05277ac6601d9244feb7884c591fd4d7048321fb23ac545d8ac41d2 --service umami --json --skip-deploys', { shell: 'cmd.exe', encoding: 'utf-8', maxBuffer: 1024 * 1024 });
  console.log('APP_SECRET result:', r2);
} catch(e) {
  console.error('APP_SECRET error:', e.stderr || e.message);
  console.error('stdout:', e.stdout);
}

// Verify
console.log('\nVerifying variables...');
const r3 = execSync('railway variable list --service umami --json', { shell: 'cmd.exe', encoding: 'utf-8', maxBuffer: 1024 * 1024 });
console.log(r3);