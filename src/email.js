const nodemailer = require("nodemailer");

const notifyUser = emailData => {
  const transporter = nodemailer.createTransport({
    service: emailData.service,
    auth: emailData.auth
  });

  const mailOptions = {
    from: emailData.from,
    to: emailData.to,
    subject: emailData.subject,
    text: emailData.text
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = notifyUser;
