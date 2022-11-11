module.exports = {
  apps : [
    {
      name: 'blog',
      script: 'npm run start',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        PORT: 3002,
        NODE_ENV: 'production'
      }
    }
  ],
   
  // Deployment Configuration
  deploy : {
    production : {
       "user" : "root",
       "host" : '120.78.190.140',
       "ref"  : "origin/master",
       "repo" : "git@github.com:Stan-BK/blog-resource.git",
       "path" : "/www/blog/production",
       'pre-deploy': 'git fetch --all',
       "post-deploy" : "npm install && pm2 startOrRestart pm2.config.js --env production"
    }
  }
};