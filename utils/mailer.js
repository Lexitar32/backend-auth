const sgMail = require("@sendgrid/mail");
const { createAccessToken } = require("../tokens/index");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailVerification = (user) => {
    const token = createAccessToken(user);
    const msg = {
        to: user.email, // Change to your recipient
        from: "olamilekan@scalemath.com", // Change to your verified sender
        subject: "Workover Platform",
        text: "and easy to do anywhere, even with Node.js",
        html: `Thanks for registering on Workover, Click <a href="${process.env.BASE_URL}/auth/confirm-email?token=${token}">here</a>`,
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
