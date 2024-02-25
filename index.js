const express = require('express');
const helper = require("./src/lib/helper");
const config = require('./config/config');
const app = express();
const port = config.server.port;

app.use(express.json());
//Register routes
const testFilePattern = /\.test\.js$/;
helper.fileList('./src/routes')
    .forEach((filePath) => {
      if (!testFilePattern.test(filePath)) {
        require(`./${filePath.toString()}`)(app)
      }
    });

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = {
  app: app,
  server: server,
}