// PM2 ecosystem file for Azure App Service
module.exports = {
  apps: [{
    name: 'voteguard-frontend',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 8080
    }
  }]
};
