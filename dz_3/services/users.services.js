const fs = require('fs');
const path = require('path');

const users = require('../db/users');

const usersPath = path.join(process.cwd(), 'db', 'users.js');

module.exports = {
  writeUser: () => {
    fs.writeFile(usersPath, `module.exports = ${JSON.stringify(users)}`, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  }
};
