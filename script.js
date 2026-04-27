(function () {
    'use strict';

    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Disclaimer dialog — show once per browser, dismissed state stored in localStorage.
    const dialog = document.getElementById('disclaimer-dialog');
    const DISMISS_KEY = 'abbaspizza-disclaimer-dismissed';
    if (dialog && !localStorage.getItem(DISMISS_KEY)) {
        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
        } else {
            dialog.setAttribute('open', '');
        }
        dialog.addEventListener('close', () => {
            localStorage.setItem(DISMISS_KEY, '1');
        });
    }

    // Slider — auto-cycle every 4 seconds with a 1-second cross-fade.
    // Manual prev/next + dot navigation reset the timer.
    const slides = document.querySelectorAll('#slider .slide');
    const dotsContainer = document.querySelector('#slider .slider-dots');
    const prevBtn = document.querySelector('#slider .slider-prev');
    const nextBtn = document.querySelector('#slider .slider-next');

    if (slides.length > 1) {
        let current = 0;
        const SLIDE_INTERVAL = 4000;
        let timer;

        const dots = Array.from(slides).map((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Kuva ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
            return dot;
        });

        const render = () => {
            slides.forEach((s, i) => s.classList.toggle('active', i === current));
            dots.forEach((d, i) => d.setAttribute('aria-selected', i === current ? 'true' : 'false'));
        };

        const goTo = (i) => {
            current = (i + slides.length) % slides.length;
            render();
            restart();
        };

        const next = () => goTo(current + 1);
        const prev = () => goTo(current - 1);

        const restart = () => {
            clearInterval(timer);
            timer = setInterval(next, SLIDE_INTERVAL);
        };

        prevBtn?.addEventListener('click', prev);
        nextBtn?.addEventListener('click', next);

        render();
        restart();
    }

    // Mobile navigation toggle
    const navToggle = document.getElementById('mobile-nav-toggle');
    const nav = document.querySelector('#main-header nav');
    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
        nav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') nav.classList.remove('open');
        });
    }

    // Header shadow when scrolled
    const header = document.getElementById('main-header');
    const onScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();
