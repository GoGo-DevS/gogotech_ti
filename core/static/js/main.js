/* ============================================================
   GOGOTECH · SOLUCIONES TI — main.js
   Desarrollado por GoGoDevS
============================================================ */

'use strict';

/* ============================================================
   NAVBAR — estilo al hacer scroll
============================================================ */
const navbar = document.getElementById('mainNavbar');
function handleNavbarScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();


/* ============================================================
   CERRAR MENÚ MOBILE AL CLICKEAR UN LINK
============================================================ */
const navbarCollapse = document.getElementById('navbarNav');
document.querySelectorAll('#navbarNav .nav-link, #navbarNav .navbar-cta').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    });
});


/* ============================================================
   SCROLL REVEAL — IntersectionObserver con delay escalonado
============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(
            el.parentElement.querySelectorAll(':scope > .reveal:not(.revealed)')
        );
        if (siblings.length > 1) {
            siblings.forEach((sib, i) => {
                setTimeout(() => {
                    sib.classList.add('revealed');
                    revealObserver.unobserve(sib);
                }, i * 80);
            });
        } else {
            el.classList.add('revealed');
            revealObserver.unobserve(el);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   SMOOTH SCROLL para anclas internas
============================================================ */
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const url = new URL(this.href, window.location.href);
        if (url.pathname !== window.location.pathname) return;
        const hash = url.hash;
        if (!hash || hash === '#') return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 74;
        window.scrollTo({ top, behavior: 'smooth' });
        history.replaceState(null, '', hash);
    });
});


/* ============================================================
   FORMULARIO DE RESERVA → WhatsApp
   Valida campos requeridos, compone el mensaje y abre WhatsApp.
============================================================ */
const reservaForm = document.getElementById('reservaForm');
if (reservaForm) {
    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let valid = true;
        reservaForm.querySelectorAll('[required]').forEach(field => {
            const ok = field.value.trim() !== '';
            field.classList.toggle('is-invalid', !ok);
            if (!ok) valid = false;
        });
        if (!valid) {
            const first = reservaForm.querySelector('.is-invalid');
            if (first) first.focus();
            return;
        }

        const wa = reservaForm.dataset.wa || '56956392509';
        const get = (n) => (reservaForm.querySelector(`[name="${n}"]`)?.value || '').trim();

        const lines = [
            '¡Hola GoGoTech! Quiero reservar una hora.',
            '',
            `*Nombre:* ${get('nombre')}`,
            `*Teléfono:* ${get('telefono')}`,
        ];
        const servicio = get('servicio');
        if (servicio) lines.push(`*Servicio:* ${servicio}`);
        const modalidad = get('modalidad');
        if (modalidad) lines.push(`*Modalidad:* ${modalidad}`);
        const fecha = get('fecha');
        const hora = get('hora');
        if (fecha || hora) lines.push(`*Fecha/Hora:* ${[fecha, hora].filter(Boolean).join(' ')}`);
        const mensaje = get('mensaje');
        if (mensaje) lines.push(`*Mensaje:* ${mensaje}`);

        const msg = encodeURIComponent(lines.join('\n'));
        window.open(`https://wa.me/${wa}?text=${msg}`, '_blank', 'noopener');
    });

    reservaForm.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('input', () => field.classList.remove('is-invalid'));
    });
}
