require('dotenv').config()

const email = {
	service: process.env.SERVICE,
	auth: {
		user: process.env.USEREMAIL,
		pass: process.env.PASSWORDEMAIL
	},
	from: process.env.USEREMAIL,
	to: process.env.TO,
	subject: 'A new evidence was found',
	text: 'Check it on the website'
}

const jsonPath = './json/news.json'

const pageURL = 'http://www.profnit.org.br/pt/sample-page/'

const mongoURI = process.env.MONGOURI

module.exports = {
    email,
    jsonPath,
    pageURL,
    mongoURI
}