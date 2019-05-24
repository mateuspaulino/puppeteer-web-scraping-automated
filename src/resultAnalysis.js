const fs = require('fs')

const data = require('./data')
const {
	email,
    jsonPath,
    mongoURI
} = data

const mongoose = require('mongoose')
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const compareAndSaveResults = (dataObj) => {

    const createFile = path => {
        console.log(dataObj)
        fs.writeFile(path, JSON.stringify(dataObj), function (err) {
            if (err) throw err
        })
    }

	try {

        const News = require('./models/News')
        const newNews = new News(dataObj)

        // verify if didn't find any result
        News.find({}, function(err, newsList) {
            return newsList
        }).then((newsList) => {

            if (newsList != "") {

                const {
                    amount,
                    publishedNews
                } = dataObj
    
                const dbId = newsList[0]._id
                const dbAmount = newsList[0].amount
                const dbNews = newsList[0].publishedNews
    
                let catchDifference = false
    
                if (dbAmount !== amount) {
                    catchDifference = true
                } else {
                    dbNews.forEach((news, i) => {
                        console.log(news)
                        if (news !== publishedNews[i])
                            catchDifference = true
                    })
                }
    
                if (catchDifference) {
                    // createFile(jsonPath)
                    // update database
    
                    //send email
                    // send email as parameter
    
                } else {
                    console.log('File is equal to page, no news to report')
                }

            } else {
                // save to database
                newNews
                .save().then(() => {
                    
                    console.log(dataObj)
                    mongoose.disconnect()
                })
                .catch(err => console.log(err))
            }

        }).catch(err => console.log(err))

		
	} catch (err) {
		console.error(err)
	}
}

module.exports = compareAndSaveResults