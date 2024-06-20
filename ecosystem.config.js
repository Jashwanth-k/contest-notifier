module.exports = {
  apps: [
    {
      script: "server.js",
      watch: false,
      name: "contest notifier",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "production",
        TZ: "Asia/Kolkata",
      },
    },
  ],
};
