const { execSync } = require('child_process');

try {
  const result = execSync(
    'railway variable set DATABASE_URL=${{PostgreSQL.DATABASE_URL}} --service umami --json',
    { shell: 'cmd.exe', encoding: 'utf-8' }
  );
  console.log('DATABASE_URL set successfully:', result);
} catch (e) {
  console.error('Error setting DATABASE_URL:', e.stderr || e.message);
}

try {
  const result = execSync(
    'railway variable set APP_SECRET=e5305c3eb05277ac6601d9244feb7884c591fd4d7048321fb23ac545d8ac41d2 --service umami --json',
    { shell: 'cmd.exe', encoding: 'utf-8' }
  );
  console.log('APP_SECRET set successfully:', result);
} catch (e) {
  console.error('Error setting APP_SECRET:', e.stderr || e.message);
}