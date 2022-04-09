const sgMail = require("@sendgrid/mail");
const { createAccessToken } = require("../tokens/index");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailVerification = (user) => {
  const token = createAccessToken(user);
  const msg = {
    to: user.email,
    from: "support@workover.io",
    subject: "Workover Platform",
    templateId: "d-a14734ba8a09451c8e2def97b149b28b",
    dynamicTemplateData: {
      verifylink: `${process.env.BASE_URL}/auth/confirm-email?token=${token}`,
    }
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
