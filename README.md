# Getting Started with Create React App

1. Clone the repository
2. npm install in both client and server
3. Update the PROTOCOL_HOSTNAME_PORT const in the client
4. Create the .env file in the server
5. npm start (client) and npm run serverDev (server)

# Deployment

1. Login to [Hostinger](https://hpanel.hostinger.com/)
2. Use SSH to access the vps server
3. pull the changes from git

# Server Configuration and Deployment Notes

For security and best practices (principle of least privilege), a dedicated system user 'patmahair' was created to run the application instead of using root. This avoids permission issues and reduces risks.

## User Creation
- Command: sudo adduser --system --group --no-create-home patmahair
- Why: Creates a non-login user/group for isolating the app processes.

## File Paths and Permissions
- App files moved to: /var/www/patmahair/library (standard web directory)
- Ownership: sudo chown -R patmahair:patmahair /var/www/patmahair
- Permissions: sudo chmod -R 755 /var/www/patmahair
- Add nginx user to group: sudo usermod -aG patmahair www-data (allows nginx to read files)
- For uploads folder specifically: sudo chown -R patmahair:www-data /var/www/patmahair/library/uploads && sudo chmod -R 755 /var/www/patmahair/library/uploads

## PM2 Configuration
- PM2_HOME set to /var/lib/patmahair/.pm2 (custom dir since user has no home)
- Create dir: sudo mkdir -p /var/lib/patmahair/.pm2 && sudo chown -R patmahair:patmahair /var/lib/patmahair && sudo chmod -R 755 /var/lib/patmahair
- Start app: sudo -u patmahair PM2_HOME=/var/lib/patmahair/.pm2 pm2 start /var/www/patmahair/library/index.js --name "patmahair"
- Save processes: sudo -u patmahair PM2_HOME=/var/lib/patmahair/.pm2 pm2 save
- Auto-start on boot: sudo -u patmahair PM2_HOME=/var/lib/patmahair/.pm2 pm2 startup systemd -u patmahair --hp /var/lib/patmahair
- Then run the generated command (e.g., sudo systemctl enable pm2-patmahair)
- Logs/status: sudo -u patmahair PM2_HOME=/var/lib/patmahair/.pm2 pm2 logs/status
- App port: Defaults to 5000 (from index.js); override with env PORT if needed.

## Nginx Configuration
- Config file: /etc/nginx/sites-available/default (or custom)
- Proxy /api/ to local app: proxy_pass http://localhost:5000; (adjust port if changed)
- Serve /uploads/ statically: alias /var/www/patmahair/library/uploads/; (efficient for images/PDFs)
- Test config: sudo nginx -t
- Reload: sudo systemctl reload nginx
- Logs: /var/log/nginx/error.log and access.log

## Deployment Steps on Server
1. SSH into server.
2. Pull changes: git pull
3. Install dependencies: cd /var/www/patmahair/library && sudo -u patmahair npm install
4. Restart PM2: sudo -u patmahair PM2_HOME=/var/lib/patmahair/.pm2 pm2 restart patmahair
5. Reload nginx: sudo systemctl reload nginx
6. Test: curl http://localhost:5000/api/books (adjust endpoints/ports)

## Troubleshooting
- Port conflicts (EADDRINUSE): sudo lsof -i :8800 (or port) and kill processes.
- Permissions: Re-run chown/chmod if issues.
- DB: Ensure .env has correct CONNECTION_URL; migrate data if needed (mongodump/mongorestore).

This setup ensures the app runs securely under 'patmahair', with nginx proxying correctly.
