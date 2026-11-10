
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

module.exports = async function handler(req, res) {

    const cookies = req.headers.cookie || "";

    const match = cookies.match(
        /(?:^|;\s*)google_session=([^;]+)/
    );

    if (!match) {
        return res.status(401).json({
            authenticated: false
        });
    }

    try {

        const credential = decodeURIComponent(match[1]);

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email_verified) {
            throw new Error("Session invalide");
        }

        return res.status(200).json({
            authenticated: true,
            email: payload.email
        });

    } catch (error) {

        return res.status(401).json({
            authenticated: false
        });

    }
};
