var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'smtp.163.com',
    host: "smtp.163.com",
    secureConnection: true,
    port:465,
    auth: {
        user: 'sdu_meeting_book@163.com',
        pass: 'sdumeeting2019'
    }
});

async function sendEmail(data)
{
    // data: {
    //     to: 'someonr@mail.com',
    //     subject : 'subject',
    //     text : "body"
    // }
    var mailOptions = {
        from: 'sdu_meeting_book@163.com',
        to: data.to,
        subject: data.subject,
        html: data.body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
            console.log(error);
        }
        else
        {
            console.log('Email sent: ' + info.response);
        }
    });
    return true;
}

module.exports =
{
    sendEmail
}
