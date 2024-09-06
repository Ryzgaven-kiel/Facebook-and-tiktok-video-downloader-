document.getElementById('download-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const url = document.getElementById('video-url').value;
    const status = document.getElementById('status');
    
    status.textContent = 'Téléchargement en cours...';
    
    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            status.textContent = 'Téléchargement réussi !';
            window.location.href = result.file;
        } else {
            status.textContent = `Erreur: ${result.error}`;
        }
    } catch (error) {
        status.textContent = 'Une erreur est survenue.';
    }
});