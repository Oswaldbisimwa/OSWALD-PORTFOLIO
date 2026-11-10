
async function checkAuthentication() {

    try {

        const response = await fetch("/api/session", {
            credentials: "same-origin"
        });

        if (!response.ok) {
            window.location.replace("index.html");
            return;
        }

        const user = await response.json();

        const welcome = document.getElementById("welcome-user");

        if (welcome && user.email) {
            welcome.textContent = "Connecté avec : " + user.email;
        }

    } catch (error) {

        console.error(error);
        window.location.replace("index.html");

    }
}

async function logout() {

    try {

        await fetch("/api/logout", {
            method: "POST",
            credentials: "same-origin"
        });

    } finally {

        window.location.replace("index.html");

    }
}

checkAuthentication();

document.getElementById("logout-btn")
    ?.addEventListener("click", logout);
