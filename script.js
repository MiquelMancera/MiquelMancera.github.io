// 1. CURSOR Y PARALLAX
const cursor = document.querySelector('.cursor');
const shapes = document.querySelectorAll('.shape');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = (window.innerWidth - mouseX * speed) / 100;
        const y = (window.innerHeight - mouseY * speed) / 100;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

const hoverElements = document.querySelectorAll('a');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '1px solid #2C2A28';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'rgba(44, 42, 40, 0.4)';
        cursor.style.border = 'none';
    });
});

// 2. SCROLL ANIMATION
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

// 3. LÓGICA DE LOS CARRUSELES AUTOMÁTICOS Y ALEATORIOS
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = carousel.querySelectorAll('.project-img');
    let currentIndex = 0;

    // Generar un tiempo aleatorio único para este carrusel (entre 6000ms y 15000ms)
    const randomInterval = Math.floor(Math.random() * (15000 - 6000 + 1)) + 6000;

    function moveCarousel() {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0; // Vuelve a la primera imagen
        }
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Iniciar el cambio automático con el intervalo aleatorio asignado
    setInterval(moveCarousel, randomInterval);
});
