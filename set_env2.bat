@echo off
railway variable set "DATABASE_URL=${{PostgreSQL.DATABASE_URL}}" --service umami --json
railway variable set "APP_SECRET=e5305c3eb05277ac6601d9244feb7884c591fd4d7048321fb23ac545d8ac41d2" --service umami --json