
module.exports = function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Méthode non autorisée"
        });
    }

    res.setHeader(
        "Set-Cookie",
        "google_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0"
    );

    return res.status(200).json({
        success: true
    });
};
