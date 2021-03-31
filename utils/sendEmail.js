const nodemailer=require('nodemailer')

const sendEmail=(option)=>{


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: option.email,
    subject: option.subject,
    html: `
    <div>
    <h1>Don't miss your code</h1>
      <ul>
        <li> user :  ${option.email} </li>
        <li> code:  ${option.resetToken} </li>
      </ul>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } 
  });

}

module.exports=sendEmail