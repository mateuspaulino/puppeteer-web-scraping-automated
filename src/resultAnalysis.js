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

        News.find({}, function(err, newsList) {
            return newsList
        }).then((newsList) => {

            if (newsList != "") {

                const {
                    amount,
                    publishedNews
                } = dataObj
    
                const dbId = newsList[0].identifier
                const dbAmount = newsList[0].amount
                const dbNews = newsList[0].publishedNews
    
                let catchDifference = false
    
                if (dbAmount !== amount) {
                    catchDifference = true
                } else {
                    dbNews.forEach((news, i) => {
                        if (news !== publishedNews[i])
                            catchDifference = true
                    })
                }
    
                if (catchDifference) {
                    // update database
                    console.log(dbId)
                    News.findOne({identifier: dbId}, function (err, news) {
                        console.log(news)
                        
                        // news.amount = 100;
                        // news.save(function (err) {
                        //     if(err) {
                        //         console.error('ERROR!');
                        //     }
                        //     console.log('deu bom')
                        // });
                    }); 
    
                    //send email
                    // send email as parameter
    
                } else {
                    console.log('File is equal to page, no news to report')
                }

                mongoose.disconnect()
            } else {
                const newNews = new News(dataObj)
                newNews
                .save().then(() => {
                    console.log(dataObj)
                    mongoose.disconnect()
                })
                .catch(err => console.log(err))
            }

        }).then(() => {
            
        }).catch(err => console.log(err))

		
	} catch (err) {
		console.error(err)
	}
}

module.exports = compareAndSaveResults