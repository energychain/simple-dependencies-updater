const app = require("./main.js");

const boot = async function() {
  await app();
  console.log("done");
}

boot();
