document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('tv-player');
    const channelButtons = document.querySelectorAll('#channel-buttons button');
    // Selecciona AMBOS botones de navegación
    const prevChannelButton = document.getElementById('prev-channel-button');
    const nextChannelButton = document.getElementById('next-channel-button');
    let hlsInstance = null;
    let currentChannelIndex = -1; // -1 indica que no hay canal seleccionado inicialmente

    // --- Función para destruir la instancia HLS (sin cambios) ---
    function destroyHls() {
        if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
            console.log("Instancia HLS anterior destruida.");
        }
    }

    // --- Función para cargar HLS (sin cambios respecto a la última versión funcional) ---
    function loadMedia(url, type) {
        console.log(`Intentando cargar [${type}]: ${url}`);
        videoPlayer.pause();
        videoPlayer.removeAttribute('src');
        videoPlayer.load();
        destroyHls();

        if (type === 'hls' && url.includes('.m3u8')) {
            if (Hls.isSupported()) {
                console.log("Usando HLS.js");
                hlsInstance = new Hls();
                hlsInstance.on(Hls.Events.ERROR, function (event, data) {
                    console.error('Error HLS:', data);
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR: console.warn('Error de red HLS fatal.'); break;
                            case Hls.ErrorTypes.MEDIA_ERROR: console.warn('Error de medios HLS fatal, intentando recuperar...'); hlsInstance.recoverMediaError(); break;
                            default: console.error('Error HLS fatal no recuperable.'); destroyHls(); break;
                        }
                    }
                });
                hlsInstance.loadSource(url);
                hlsInstance.attachMedia(videoPlayer);
                hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.log("Manifiesto HLS cargado, iniciando reproducción...");
                    videoPlayer.play().catch(e => console.warn("Autoplay HLS bloqueado:", e.message));
                });
            } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
                console.log("Usando soporte HLS nativo.");
                videoPlayer.src = url;
                videoPlayer.addEventListener('loadedmetadata', () => {
                    console.log("Metadatos HLS (nativo) cargados...");
                    videoPlayer.play().catch(e => console.warn("Autoplay HLS nativo bloqueado:", e.message));
                }, { once: true });
                videoPlayer.addEventListener('error', (e) => console.error("Error en video (HLS nativo):", videoPlayer.error), { once: true });
            } else {
                console.error("HLS no soportado.");
                alert("Tu navegador no parece soportar HLS.");
            }
        } else {
             console.error(`Tipo desconocido o URL inválida: ${type}, ${url}`);
        }
    }

    // --- Función reutilizable para cargar un canal por índice ---
    function loadChannelByIndex(index) {
        if (index >= 0 && index < channelButtons.length) {
            const button = channelButtons[index];
            const mediaUrl = button.dataset.url;
            const mediaType = button.dataset.type;
            if (mediaUrl && mediaType) {
                currentChannelIndex = index; // Actualiza el índice actual
                console.log(`Cargando canal índice: ${currentChannelIndex}`);
                loadMedia(mediaUrl, mediaType);
            } else {
                console.error(`El botón en el índice ${index} no tiene URL o tipo.`);
            }
        } else {
            console.error(`Índice fuera de rango: ${index}`);
        }
    }


    // --- Event Listeners para los BOTONES DE CANAL INDIVIDUALES ---
    channelButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            loadChannelByIndex(index); // Llama a la función reutilizable
        });
    });

    // --- Event Listener para el BOTÓN "SIGUIENTE CANAL" ---
    if (nextChannelButton) {
        nextChannelButton.addEventListener('click', () => {
            if (channelButtons.length === 0) return;
            // Calcula el siguiente índice con loop
            const nextIndex = (currentChannelIndex + 1) % channelButtons.length;
            loadChannelByIndex(nextIndex);
        });
    }

    // --- NUEVO: Event Listener para el BOTÓN "CANAL ANTERIOR" ---
    if (prevChannelButton) {
        prevChannelButton.addEventListener('click', () => {
            if (channelButtons.length === 0) return;
            // Calcula el índice anterior con loop
            // (currentChannelIndex - 1 + N) % N maneja el caso -1 inicial y el 0
            const prevIndex = (currentChannelIndex - 1 + channelButtons.length) % channelButtons.length;
            loadChannelByIndex(prevIndex);
        });
    }

});