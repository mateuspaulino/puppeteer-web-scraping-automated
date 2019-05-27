const nodemailer = require('nodemailer')

const notifyUser = emailData => {
    var transporter = nodemailer.createTransport({
        service: emailData.service,
        auth: emailData.auth
    })

    var mailOptions = {
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}

module.exports = notifyUser