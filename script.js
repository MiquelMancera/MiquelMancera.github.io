// 1. EL CURSOR
const follower = document.getElementById('follower');
document.addEventListener('mousemove', (e) => {
    follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// 2. EL ELEMENTO QUE ESCAPA (BOTÓN CENTRAL)
const escaper = document.getElementById('escaper');
document.addEventListener('mousemove', (e) => {
    const rect = escaper.getBoundingClientRect();
    const escaperX = rect.left + rect.width / 2;
    const escaperY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - escaperX, e.clientY - escaperY);
    
    if (dist < 150) { 
        const pushX = (escaperX - e.clientX) * 1.5;
        const pushY = (escaperY - e.clientY) * 1.5;
        let newX = Math.max(0, Math.min(window.innerWidth - rect.width, rect.left + pushX));
        let newY = Math.max(0, Math.min(window.innerHeight - rect.height, rect.top + pushY));
        
        escaper.style.left = newX + 'px';
        escaper.style.top = newY + 'px';
    }
});

// 3. TELETRANSPORTE DE LOS POP-UPS 
const spam1 = document.getElementById('spam1');
const spam2 = document.getElementById('spam2');
const btnIgnorar = document.getElementById('btn-ignorar');
const btnReclamar = document.getElementById('btn-reclamar');

function teleportSpam(element) {
    const randomX = Math.random() * (window.innerWidth - 320);
    const randomY = Math.random() * (window.innerHeight - 250);
    element.style.bottom = 'auto'; element.style.right = 'auto';
    element.style.top = `${randomY}px`; element.style.left = `${randomX}px`;

    const randomColor1 = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const randomColor2 = `hsl(${Math.random() * 360}, 100%, 50%)`;
    element.style.borderColor = randomColor1;
    element.style.boxShadow = `10px 10px 0px ${randomColor2}`;
    
    const header = element.querySelector('.spam-header');
    header.style.backgroundColor = randomColor1;
}

btnIgnorar.addEventListener('click', () => teleportSpam(spam1));
btnReclamar.addEventListener('click', () => teleportSpam(spam2));

// 4. MÚLTIPLES LOGOS REBOTANDO
const bouncers = document.querySelectorAll('.bouncer');
const bouncerData = Array.from(bouncers).map(el => {
    return {
        el: el, x: Math.random() * (window.innerWidth - 150), y: Math.random() * (window.innerHeight - 100),
        vx: (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 4), vy: (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 4)
    };
});

function animateBouncers() {
    bouncerData.forEach(b => {
        const rect = b.el.getBoundingClientRect();
        if (b.x + rect.width >= window.innerWidth || b.x <= 0) b.vx = -b.vx;
        if (b.y + rect.height >= window.innerHeight || b.y <= 0) b.vy = -b.vy;
        b.x += b.vx; b.y += b.vy; b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
    });
    requestAnimationFrame(animateBouncers);
}
animateBouncers();

// 5. CHISPAS MULTICOLOR EN EL CANVAS
const canvas = document.getElementById('sparks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particles = [];

document.addEventListener('mousemove', (e) => {
    for(let i = 0; i < 4; i++){ 
        particles.push({
            x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 0.5) * 15,
            life: 1, color: `hsl(${Math.random() * 360}, 100%, 60%)` 
        });
    }
});

function animateSparks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.03; 
        ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, p.life); ctx.fillRect(p.x, p.y, 4, 4);
        if (p.life <= 0) particles.splice(index, 1);
    });
    requestAnimationFrame(animateSparks);
}
animateSparks();

// 6. PARALLAX EXTREMO EN LAS FOTOS
const f1 = document.getElementById('float1');
const f2 = document.getElementById('float2');
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 10;
    const y = (window.innerHeight / 2 - e.clientY) / 10;
    f1.style.transform = `translate(${x}px, ${y}px) rotate(${x/10}deg)`;
    f2.style.transform = `translate(${-x}px, ${-y}px) rotate(${-x/10}deg)`;
});

window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });


// =========================================================
// 7. MECÁNICA: LA FLASHBANG DE LA MUERTE
// =========================================================
const eventoFlashbang = document.getElementById('evento-flashbang');
const bocadilloFlash = document.getElementById('bocadillo-flashbang');
const btnDesactivar = document.getElementById('btn-desactivar');
const pantallaBlanca = document.getElementById('pantalla-blanca');

let temporizadorBomba;

function programarAtaque() {
    // ⚠️ MODO DE PRUEBA: Aparece aleatoriamente entre 10 y 15 segundos.
    const tiempoAleatorio = Math.random() * (15000 - 10000) + 10000;
    
    // ⚠️ PARA EL MODO FINAL (De 2 a 5 minutos): 
    // BORRA LA LÍNEA DE ARRIBA Y DESCOMENTA LA DE ABAJO:
    // const tiempoAleatorio = Math.random() * (300000 - 120000) + 120000;

    setTimeout(mostrarAmenaza, tiempoAleatorio);
}

function mostrarAmenaza() {
    // 1. Mostrar tu foto con el botón
    eventoFlashbang.classList.remove('oculto');
    bocadilloFlash.classList.add('oculto');

    // 2. Iniciar cuenta atrás de 5 segundos
    temporizadorBomba = setTimeout(detonarFlashbang, 5000);
}

// Si el usuario es rápido y pulsa DESACTIVAR:
btnDesactivar.addEventListener('click', () => {
    clearTimeout(temporizadorBomba);       // Paramos la bomba
    eventoFlashbang.classList.add('oculto'); // Ocultamos tu foto
    programarAtaque();                     // Reprogramamos el siguiente ataque
});

// Si pasan los 5 segundos sin pulsar:
function detonarFlashbang() {
    // Aparece el bocadillo de cómic
    bocadilloFlash.classList.remove('oculto');

    // Esperamos medio segundo para que lean "¡¡FLASHBANG!!" y sufran
    setTimeout(() => {
        // Ceguera instantánea (quitamos transición para que sea de golpe)
        pantallaBlanca.style.transition = 'none';
        pantallaBlanca.style.opacity = '1';
        
        // Escondemos tu foto y el botón por detrás del blanco
        eventoFlashbang.classList.add('oculto');

        // Tras 2 segundos de ceguera absoluta, difuminamos de vuelta a la normalidad
        setTimeout(() => {
            pantallaBlanca.style.transition = 'opacity 2s ease-out';
            pantallaBlanca.style.opacity = '0';
            
            // Programar el siguiente ataque para cuando el usuario baje la guardia
            programarAtaque();
        }, 2000);
    }, 500);
}

// Iniciar el ciclo de terror al cargar la web
programarAtaque();