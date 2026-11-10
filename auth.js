
async function handleCredentialResponse(response) {

    const message = document.getElementById("login-message");

    message.textContent = "Vérification de votre identité...";

    try {

        const result = await fetch("/api/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({
                credential: response.credential
            })
        });

        const data = await result.json();

        if (!result.ok || !data.valid) {
            throw new Error("Authentification refusée.");
        }

        message.textContent = "Connexion réussie !";

        window.location.href = "portfolio.html";

    } catch (error) {

        console.error(error);

        message.textContent =
            "Échec de connexion. Réessayez.";

    }
}
