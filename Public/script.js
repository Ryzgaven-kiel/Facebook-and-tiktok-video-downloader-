document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("download-btn");
    const videoUrlInput = document.getElementById("video-url");
    const messageDiv = document.getElementById("message");

    downloadButton.addEventListener("click", function () {
        const videoUrl = videoUrlInput.value.trim();
        if (videoUrl === "") {
            messageDiv.textContent = "Veuillez entrer une URL valide.";
            return;
        }

        // Envoyer une requête POST au backend
        fetch("/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: videoUrl }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.innerHTML = `<a href="${data.downloadUrl}" target="_blank">Télécharger la vidéo</a>`;
            } else {
                messageDiv.textContent = "Erreur lors du téléchargement de la vidéo.";
            }
        })
        .catch(error => {
            console.error("Erreur:", error);
            messageDiv.textContent = "Une erreur est survenue.";
        });
    });
});
