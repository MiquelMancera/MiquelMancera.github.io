// ==========================================
// 1. CONFIGURACIÓN Y CARGA DE IMÁGENES (img/) [Las imagenes se cargan en el orden que se especifique en la Array]
// ==========================================
const galleriesConfig = {
  gallery: ['photo1', 'photo2', 'photo4', 'photo5', 'photo6', 'photo7', 'photo8', 'photo9', 'photo10', 'photo11', 'photo12', 'photo13', 'photo14', 'photo15', 'photo16', 'photo17', 'photo18'],
  intro: ['title']
};

// Especificar formato de imagen (.jpg, .png, .webp...) y dirección de la carpeta
const IMG_EXTENSION = '.jpeg';
const IMG_FOLDER = 'img/';

function loadGalleries() {
  Object.keys(galleriesConfig).forEach(galleryKey => {
    const container = document.querySelector(`.gallery-grid[data-gallery="${galleryKey}"]`);
    if (!container) return;

    const sortedImages = [...galleriesConfig[galleryKey]];

    sortedImages.forEach(num => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'gallery-item';

      const img = document.createElement('img');
      img.src = `${IMG_FOLDER}${num}${IMG_EXTENSION}`;
      img.alt = `Imagen ${num}`;
      img.loading = 'lazy';

      itemDiv.appendChild(img);
      container.appendChild(itemDiv);
    });
  });
}

// ==========================================
// 2. NAVEGACIÓN Y TRANSICIÓN DE SECCIONES
// ==========================================

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  let isAnimating = false;

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      const currentSection = document.querySelector('.content-section.active');
      const nextSection = document.getElementById(targetId);
      const mainContent = document.querySelector('.main-content')

      if (!nextSection || currentSection === nextSection || isAnimating) return;

      isAnimating = true;

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      currentSection.classList.add('fade-out-up');
      mainContent.classList.add('active');
      
      setTimeout(() => {
        currentSection.classList.remove('active', 'fade-out-up');
        currentSection.style.display = 'none';

        nextSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'instant' });

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            nextSection.classList.add('active');
            setTimeout(() => {
              isAnimating = false;
            }, 350);
          });
        });
      }, 350);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadGalleries();
  initNavigation();
});