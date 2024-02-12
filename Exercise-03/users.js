const fetch = require('node-fetch');

async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
}

module.exports = {
  getUsers
};
