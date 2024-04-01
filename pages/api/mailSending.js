const nodemailer = require("nodemailer");
export default async function mail(req, res) {
  const info = JSON.parse(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thirdacc2314@gmail.com",
      pass: "yakr krjm opxk hauq",
    },
  });

  const mailOptions = {
    from: "example@yahoo.com",
    to: "supermcp123@gmail.com",
    subject: `email sent by:${info.transportEmail}`,
    html: `<h2>${info.title}</h2><p>${info.text}</p>`,
  };

  const sentInfo = await transporter.sendMail(mailOptions);
  console.log(sentInfo.messageId);
  res.status(200).json({ message: "successful" });
}
