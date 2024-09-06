const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));
app.use(express.json());

// Téléchargement de la vidéo
app.post('/download', async (req, res) => {
    const videoUrl = req.body.url;

    try {
        // Remplacez ceci par l'appel à une API réelle pour télécharger la vidéo
        // Ex: const response = await fetch(`API_URL?url=${videoUrl}&apikey=VOTRE_API_KEY`);
        
        // Simulation de la réponse API
        const response = await fetch(videoUrl);
        
        if (!response.ok) {
            throw new Error('Impossible de télécharger la vidéo');
        }

        const fileName = path.basename(videoUrl);
        const filePath = path.join(__dirname, 'public', fileName);
        const fileStream = fs.createWriteStream(filePath);
        
        response.body.pipe(fileStream);
        
        fileStream.on('finish', () => {
            res.json({ file: `/${fileName}` });
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});