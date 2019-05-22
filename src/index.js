const puppeteer = require('puppeteer')
const fs = require('fs')
let bookingUrl = 'http://www.profnit.org.br/pt/sample-page/'

const webscraping = async () => {
	const browser = await puppeteer.launch({
		headless: true
	})
	const page = await browser.newPage()
	let dataObj = {}

	try {
		await page.goto(bookingUrl)

		let publishedNews = await page.evaluate(() => {
			let newsDOM = document.querySelectorAll('li.cat-post-item')
			let newsList = []
			newsDOM.forEach((linkElement) => {
				const currentNews = linkElement.querySelector('a.cat-post-title').innerText
				newsList.push(currentNews)
			})
			return newsList
		})

		dataObj = {
			amount: publishedNews.length,
			publishedNews
		}
	} catch (e) {
		console.log(e)
	}

	browser.close()
	return dataObj
}

webscraping().then((dataObj) => {
	console.log(dataObj);
	// verify if the file exists

	// compares file content with object

	// if its different, send an alert and create a new file

	// create the new file
	// fs.writeFile("./data/news.json", JSON.stringify(dataObj), function(err) {
	// 	if (err) throw err;
	// });
}).catch(console.error);

