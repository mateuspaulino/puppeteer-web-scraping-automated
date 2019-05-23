require('dotenv').config()

const data = require('./data')
const {
    pageURL
} = data

const webscraping = require('./webscraping')
const resultAnalysis = require('./resultAnalysis')

webscraping(pageURL).then((dataObj) => {
	resultAnalysis(dataObj)
}).catch(console.error)