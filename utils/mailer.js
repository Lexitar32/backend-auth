const sgMail = require("@sendgrid/mail");
const { createAccessToken } = require("../tokens/index");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailVerification = (user) => {
    const token = createAccessToken(user);
    const msg = {
        to: user.email,
        from: "olamilekan@scalemath.com",
        subject: "Workover Platform",
        text: "and easy to do anywhere, even with Node.js",
        html: `Thanks for registering on Workover platform, we are happy to have you here, Kindly Click <a href="${process.env.BASE_URL}/auth/confirm-email?token=${token}">here</a> to very your email`,
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
