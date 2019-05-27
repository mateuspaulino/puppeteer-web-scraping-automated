const data = require("./data");
const { pageURL } = data;

const webscraping = require("./webscraping");
const compareAndSaveResults = require("./resultAnalysis");

webscraping(pageURL)
  .then(dataObj => {
    compareAndSaveResults(dataObj);
  })
  .catch(console.error);
