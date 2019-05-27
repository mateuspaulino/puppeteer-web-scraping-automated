const notifyUser = require("./email");
const data = require("./data");
const { email, mongoURI } = data;

const mongoose = require("mongoose");
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const compareAndSaveResults = dataObj => {
  try {
    const News = require("./models/News");

    News.find({}, function(err, newsList) {
      return newsList;
    })
      .then(newsList => {
        if (newsList == "") {
          console.log(`A new data was created:\n${JSON.stringify(dataObj)}`);
          const newNews = new News(dataObj);
          return newNews.save().catch(err => console.log(err));
        }

        const { amount, publishedNews } = dataObj;

        const dbId = newsList[0]._id;
        const dbAmount = newsList[0].amount;
        const dbNews = newsList[0].publishedNews;

        let catchDifference = false;

        if (dbAmount !== amount) {
          catchDifference = true;
        } else {
          dbNews.forEach((news, i) => {
            if (news !== publishedNews[i]) catchDifference = true;
          });
        }

        if (catchDifference) {
          console.log("A new evidence was found, updating database...");
          notifyUser(email, publishedNews);
          mongoose.set('useFindAndModify', false);
          return News.findOneAndUpdate({ _id: dbId }, dataObj);
        }

        console.log("File is equal to page, no news to report");
      })
      .then(() => {
        mongoose.disconnect();
      })
      .catch(err => console.log(err));
  } catch (err) {
    console.error(err);
  }
};

module.exports = compareAndSaveResults;
