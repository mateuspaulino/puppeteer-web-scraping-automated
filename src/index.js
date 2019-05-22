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
	const jsonPath = './data/news.json'

	const createFile = path => {
		fs.writeFile(path, JSON.stringify(dataObj), function (err) {
			if (err) throw err
		})
	}

	try {
		if (fs.existsSync(jsonPath)) {

			fs.readFile(jsonPath, 'utf8', function (err, content) {
				if (err) throw err

				const { amount, publishedNews } = dataObj
				const fileContent = JSON.parse(content)
				const fileAmount = fileContent.amount
				const fileNews = fileContent.publishedNews

				let catchDifference = false

				if (fileAmount !== amount) {
					catchDifference = true
				} else {
					fileNews.forEach((news, i) => {
						if (news !== publishedNews[i])
							catchDifference = true
					})
				}

				if (catchDifference) {
					createFile(jsonPath)
					// send email
				}

			})

		} else {
			createFile(jsonPath)
		}
	} catch (err) {
		console.error(err)
	}

}).catch(console.error)