const fs = require('fs')
const nodemailer = require('nodemailer')

const data = require('./data')
const {
	email,
    jsonPath,
    mongoURI
} = data

const mongoose = require('mongoose')

const compareAndSaveResults = (dataObj) => {

    mongoose
        .connect(mongoURI, { useNewUrlParser: true })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

    const News = require('./models/News');

    const newNews = new News(dataObj);

    newNews
        .save().then(() => {
            
            mongoose.disconnect()
        })
        .catch(err => console.log(err))


    const createFile = path => {
        console.log(dataObj)
        fs.writeFile(path, JSON.stringify(dataObj), function (err) {
            if (err) throw err
        })
    }

	try {
		if (fs.existsSync(jsonPath)) {

			fs.readFile(jsonPath, 'utf8', function (err, content) {
				if (err) throw err

				const {
					amount,
					publishedNews
				} = dataObj
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

					var transporter = nodemailer.createTransport({
						service: email.service,
						auth: email.auth
					})

					var mailOptions = {
						from: email.from,
						to: email.to,
						subject: email.subject,
						text: email.text
					}

					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							console.log(error)
						} else {
							console.log('Email sent: ' + info.response)
						}
					})

				} else {
					console.log('File is equal to page, no news to report')
				}

			})

		} else {
			createFile(jsonPath)
		}
	} catch (err) {
		console.error(err)
	}
}

module.exports = compareAndSaveResults