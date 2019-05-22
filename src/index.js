const puppeteer = require('puppeteer');
let bookingUrl = 'http://www.profnit.org.br/pt/sample-page/';

const webscraping = (async () => {
	const browser = await puppeteer.launch({
		headless: true
	});
	const page = await browser.newPage();
	let dataObj = {};

	try {
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

		dataObj = {
			amount: publishedNews.length,
			publishedNews
		};
		console.log(dataObj);
	} catch (e) {
		console.log(e)
	}

	browser.close()
})()