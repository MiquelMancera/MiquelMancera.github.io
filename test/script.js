// 1. CURSOR, FOCO DE LUZ Y FONDO
const cursor = document.querySelector('.cursor');
const spotlight = document.querySelector('.spotlight');
const woolTexture = document.querySelector('.wool-texture');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, spotX = 0, spotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if(woolTexture) {
        // Movimiento muy sutil y suave de la textura
        const tx = (window.innerWidth / 2 - mouseX) * 0.005;
        const ty = (window.innerHeight / 2 - mouseY) * 0.005;
        woolTexture.style.transform = `translate(${tx}px, ${ty}px)`;
    }
});

function animateInteractions() {
    // Inercia para el cursor (rápido)
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    // Inercia para el foco de luz (lento y difuso)
    spotX += (mouseX - spotX) * 0.08;
    spotY += (mouseY - spotY) * 0.08;

    if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    }
    if (spotlight) {
        spotlight.style.left = spotX + 'px';
        spotlight.style.top = spotY + 'px';
    }
    
    requestAnimationFrame(animateInteractions);
}
animateInteractions();

// Efecto magnético del cursor en enlaces
const hoverElements = document.querySelectorAll('a');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '1px solid var(--text-color)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.backgroundColor = 'var(--text-color)';
        cursor.style.border = 'none';
    });
});

// 2. EFECTO HOVER 3D (BALANCEO SUAVE EN LAS TARJETAS)
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Posición X dentro de la tarjeta
        const y = e.clientY - rect.top;  // Posición Y dentro de la tarjeta
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calcular rotación (máximo 4 grados para que sea muy elegante)
        const rotateX = ((y - centerY) / centerY) * -4; 
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        // Al salir el ratón, vuelve a su posición original suavemente
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// 3. ANIMACIÓN DE APARICIÓN AL HACER SCROLL
const fadeElements = document.querySelectorAll('.fade-scroll');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

fadeElements.forEach(el => observer.observe(el));

// 4. CARRUSELES CROSSFADE (FUNDIDO CRUZADO CON TIEMPOS DE 6 A 15 SEGUNDOS)
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('.project-img');
    let currentIndex = 0;

    // Generar un tiempo aleatorio único (entre 6000ms y 15000ms)
    const randomInterval = Math.floor(Math.random() * (15000 - 6000 + 1)) + 6000;

    function moveCarousel() {
        // Quitar la clase active a la imagen actual
        images[currentIndex].classList.remove('active');
        
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0; // Vuelve a la primera imagen
        }
        
        // Poner la clase active a la nueva imagen
        images[currentIndex].classList.add('active');
    }

    // Iniciar el fundido cruzado automático
    setInterval(moveCarousel, randomInterval);
});