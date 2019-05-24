const nodemailer = require('nodemailer')

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