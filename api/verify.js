
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

module.exports = async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Méthode non autorisée"
        });
    }

    const credential = req.body?.credential;

    if (!credential) {
        return res.status(400).json({
            error: "Jeton manquant"
        });
    }

    try {

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email_verified) {
            return res.status(401).json({
                valid: false
            });
        }

        res.setHeader("Set-Cookie",
            `google_session=${encodeURIComponent(credential)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`
        );

        return res.status(200).json({
            valid: true
        });

    } catch (error) {

        console.error("Erreur Google:", error.message);

        return res.status(401).json({
            valid: false,
            error: "Jeton Google invalide"
        });

    }
};
