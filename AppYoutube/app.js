document.addEventListener('DOMContentLoaded', function () {
    const videoListElement = document.getElementById('video-list');

    // Llamada a la API para obtener la lista de videos
    fetch('http://127.0.0.1:3000/video/listarVideos')
        .then(response => response.json())
        .then(data => {
            // Manipula la respuesta y actualiza la interfaz
            displayVideoList(data.data);
        })
        .catch(error => {
            console.error('Error al obtener la lista de videos:', error);
        });

    function displayVideoList(videos) {
        videos.forEach(video => {
            const listItem = createListItem(video);
            videoListElement.appendChild(listItem);
        });
    }

    function createListItem(video) {
        const listItem = document.createElement('li');
    
        const titleElement = document.createElement('h3');
        titleElement.textContent = video.titulo;
    
        const durationElement = document.createElement('p');
        durationElement.textContent = `Duración: ${video.duracion}`;
    
        const authorElement = document.createElement('p');
        authorElement.textContent = `Autor: ${video.autor}`;
    
        const videoFrame = createYouTubeIframe(video.url);
    
        listItem.appendChild(titleElement);
        listItem.appendChild(durationElement);
        listItem.appendChild(authorElement);
        listItem.appendChild(videoFrame);
    
        return listItem;
    }
    
    function createYouTubeIframe(videoUrl) {
        const iframeElement = document.createElement('iframe');
        iframeElement.width = '560'; // Ancho del reproductor
        iframeElement.height = '315'; // Altura del reproductor
        iframeElement.src = videoUrl; // Debería ser una URL de YouTube
        iframeElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframeElement.allowFullscreen = true;
    
        return iframeElement;
    }
    
}
);
