module.exports = {
    apps : [{
      name: 'nextjs-app-admin',
      script: 'npm',
      args: 'start -- --port 4000',
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  }
  