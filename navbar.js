document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
    <header class="bg-primary text-white py-4">
      <div class="container d-flex justify-content-between align-items-center">
        <a class="text-white text-decoration-none" href="index.html">
          <h1 class="mb-0 fs-4">Plataforma Multimedia</h1>
        </a>
        <button class="navbar-toggler d-md-none border-0 bg-transparent text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
          &#9776;
        </button>
        <nav class="collapse d-md-flex mt-3 mt-md-0 ms-md-auto" id="navbarMenu">
          <a class="text-white me-3 text-decoration-none d-block d-md-inline" href="index.html">🏠 Inicio</a>
          <a class="text-white me-3 text-decoration-none d-block d-md-inline" href="radio.html">📻 Radio</a>
          <a class="text-white me-3 text-decoration-none d-block d-md-inline" href="television.html">📺 Televisión</a>
          <a class="text-white me-3 text-decoration-none d-block d-md-inline" href="peliculas.html">🎬 Películas</a>
          <a class="text-white me-3 text-decoration-none d-block d-md-inline" href="musica.html">🎵 Música</a>
          <a class="text-white me-3 text-decoration-none d-block d-md-inline" href="videos.html">📹 Videos</a>
          <a class="text-white me-3 text-decoration-none d-block d-md-inline" href="quienessomos.html">👥 Quiénes Somos</a>
          <a class="text-white me-3 text-decoration-none d-block d-md-inline" href="contacto.html">✉️ Contacto</a>
        </nav>
      </div>
    </header>
  `;

  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;
  } else {
    console.error("Error: Elemento con ID 'navbar-placeholder' no encontrado en el DOM.");
  }
});
