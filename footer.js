document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
    <footer class="bg-primary text-white text-center py-3 mt-auto">
      <p class="mb-1">Derechos reservados © 2025 - 2030 - Agregando Valor Al Mundo 🌐</p> 
      <p class="mb-0 small"> 
        <a href="politica-privacidad.html" class="text-white text-decoration-none">Política de Privacidad</a>
        <span class="mx-2">|</span> 
        <a href="terminos-condiciones.html" class="text-white text-decoration-none">Términos y Condiciones</a>
      </p>
    </footer>
  `;

  const placeholder = document.getElementById("footer-placeholder");
  if (placeholder) {
    placeholder.innerHTML = footerHTML;
  } else {
       console.error("Error: Elemento con ID 'footer-placeholder' no encontrado en el DOM.");
  }
});