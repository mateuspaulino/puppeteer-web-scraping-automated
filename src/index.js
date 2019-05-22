const puppeteer = require('puppeteer');

let bookingUrl = 'http://www.profnit.org.br/pt/sample-page/';
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(bookingUrl);
    
    let publishedNews = await page.evaluate(() => {
      let newsDOM = document.querySelectorAll('li.cat-post-item');
      let newsList = [];
        newsDOM.forEach((linkElement) => {
            const currentNews = linkElement.querySelector('a.cat-post-title').innerText;
            newsList.push(currentNews);
        });
        return newsList;
    });

    let dataObj = {
      amount: publishedNews.length,
      publishedNews
    };

    console.log(dataObj);
    browser.close()
})();