const puppeteer = require("puppeteer");

const webscraping = async pageURL => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();
  let dataObj = {};

  try {
    await page.goto(pageURL);

    const publishedNews = await page.evaluate(() => {
      const newsDOM = document.querySelectorAll("li.cat-post-item");
      let newsList = [];
      newsDOM.forEach(linkElement => {
        const currentNews = linkElement.querySelector("a.cat-post-title")
          .innerText;
        newsList.push(currentNews);
      });
      return newsList;
    });

    dataObj = {
      amount: publishedNews.length,
      publishedNews
    };
  } catch (e) {
    console.log(e);
  }

  browser.close();
  return dataObj;
};

module.exports = webscraping;
