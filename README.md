# Getting Started with Create React App

1. Clone the repository.
2. `pnpm install` in both `client` and root (server) directories (pnpm is recommended for faster installs and smaller node_modules).
3. Update the `PROTOCOL_HOSTNAME_PORT` const in the client (e.g., to `http://yourdomain.com` for production).
4. Create the `.env` file in the root (server) with keys like `PORT=3001`, `NODE_ENV=production`, `JWT_SECRET=your-secret`, `MONGO_URI=mongodb://localhost:27017/yourdb` (if using MongoDB).
5. `pnpm start` (client) and `pnpm run serverDev` (server) for local development.

# Deployment

1. Log in to [Hostinger](https://hpanel.hostinger.com/).
2. Use SSH to access the VPS server as the `patmahair` user (or your dedicated app user).
3. Pull changes from Git.

# Server Configuration and Deployment Notes

For security and best practices (principle of least privilege), a dedicated system user `patmahair` was created to run the application instead of using root. This avoids permission issues and reduces risks. The user has a proper home directory (`/home/patmahair`) for standard PM2 and file management.

## User Creation
- Command: `sudo adduser patmahair` (creates user with home directory and bash shell automatically).
- Why: Creates a non-root user/group for isolating the app processes. Always use `--no-create-home` only for system services, not apps.

## File Paths and Permissions
- App files: `/home/patmahair/apps/patmahair/library` (user-owned, secure location).
- Ownership: `sudo chown -R patmahair:patmahair /home/patmahair/apps`.
- Permissions: `sudo chmod -R 755 /home/patmahair/apps/patmahair/library`.
- Add Nginx user to group: `sudo usermod -aG patmahair www-data` (allows Nginx to read files).
- For uploads folder specifically: `sudo chown -R patmahair:www-data /home/patmahair/apps/patmahair/library/uploads && sudo chmod -R 755 /home/patmahair/apps/patmahair/library/uploads`.
- React build: Served from `/home/patmahair/apps/patmahair/library/client/build`.

## PM2 Configuration
- PM2 uses the standard home directory: `~/.pm2` (no custom `PM2_HOME` needed).
- Start app: `su - patmahair && cd ~/apps/patmahair/library && pm2 start index.js --name "patmahair-api" -i max` (clusters across CPU cores).
- Save processes: `pm2 save`.
- Auto-start on boot: `pm2 startup` (run the generated `sudo` command).
- Logs/status: `pm2 logs patmahair-api` or `pm2 status`.
- App port: Defaults to 3001 (set via `PORT` in `.env`); override if needed.

## Nginx Configuration
- Config file: `/etc/nginx/sites-available/patmahair` (or custom; symlink to `sites-enabled`).
- Proxy `/api/` to local app: `proxy_pass http://127.0.0.1:3001/;` (match your PORT).
- Serve `/uploads/` statically: `location /uploads/ { alias /home/patmahair/apps/patmahair/library/uploads/; }` (efficient for images/PDFs).
- Serve React static files: `location / { root /home/patmahair/apps/patmahair/library/client/build; try_files $uri /index.html; }`.
- Test config: `sudo nginx -t`.
- Reload: `sudo systemctl reload nginx`.
- Logs: `/var/log/nginx/error.log` and `access.log`.

## Deployment Steps on Server
1. SSH into server as `patmahair` (or `su - patmahair`).
2. Pull changes: `git pull`.
3. Install dependencies: `cd ~/apps/patmahair/library && pnpm install --frozen-lockfile` (root and client if separate).
4. Restart PM2: `pm2 restart patmahair-api`.
5. Reload Nginx: `sudo systemctl reload nginx`.
6. Test: `curl http://localhost:3001/api/books` (adjust endpoints/ports).

## Troubleshooting
- Port conflicts (EADDRINUSE): `sudo lsof -i :3001` (or port) and kill processes.
- Permissions: Re-run `chown`/`chmod` if issues (e.g., after rebuild: `sudo chown -R patmahair:www-data ~/apps/patmahair/library/client/build && sudo chmod -R 755 ~/apps/patmahair/library/client/build`).
- DB: Ensure `.env` has correct `MONGO_URI`; migrate data if needed (`mongodump`/`mongorestore`). If no DB, comment out Mongoose connects in `index.js`.
- Mongoose warnings: Add `mongoose.set('strictQuery', false);` in `index.js` to suppress deprecation.
- MongoDB errors: Install MongoDB (`sudo apt install mongodb-org`), start service (`sudo systemctl enable --now mongod`), and bind to localhost.

This setup ensures the app runs securely under `patmahair`, with Nginx proxying correctly. No custom paths or hacks needed.