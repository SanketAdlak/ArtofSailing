document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        }));
    }

    const alertModal = document.getElementById('alert-modal');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');
    const alertClose = document.getElementById('alert-close');

    const showAlert = (message, title = 'Success!') => {
        alertTitle.textContent = title;
        alertMessage.textContent = message;
        alertModal.classList.remove('hidden');
    };

    const hideAlert = () => alertModal.classList.add('hidden');

    alertClose.addEventListener('click', hideAlert);
    alertModal.addEventListener('click', event => {
        if (event.target === alertModal) {
            hideAlert();
        }
    });

    const sampleForm = document.getElementById('sample-form');
    if (sampleForm) {
        sampleForm.addEventListener('submit', event => {
            event.preventDefault();

            const name = document.getElementById('sample-name').value;
            const email = document.getElementById('sample-email').value;

            console.log('Sample request (simulated):', { name, email });

            showAlert('Your chapter preview is on its way. Check your inbox in the next 5 minutes.');

            sampleForm.reset();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href');
            if (targetId && targetId !== '#') {
                event.preventDefault();
                const section = document.querySelector(targetId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    const navShell = document.querySelector('.nav-shell');
    if (navShell) {
        const onScroll = () => {
            if (window.scrollY > 24) {
                navShell.classList.add('nav-shell--condensed');
            } else {
                navShell.classList.remove('nav-shell--condensed');
            }
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            question.addEventListener('click', () => {
                answer.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        });
    }

    if (!prefersReducedMotion) {
        const animatedNodes = document.querySelectorAll('[data-animate]');
        const observerOptions = {
            root: null,
            threshold: 0.22,
            rootMargin: '0px 0px -10% 0px'
        };

        const applyStagger = (container, type) => {
            const children = Array.from(container.children);
            children.forEach((child, index) => {
                child.style.transitionDelay = `${(index * 90 + 120)}ms`;
            });
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const { animate, animateDelay } = target.dataset;

                    if ((animate === 'stagger-up' || animate === 'stagger-fade') && !target.dataset.staggerInitialised) {
                        applyStagger(target, animate);
                        target.dataset.staggerInitialised = 'true';
                    }

                    if (animateDelay) {
                        target.style.setProperty('--animate-delay', `${animateDelay}ms`);
                    }

                    target.dataset.animateState = 'visible';
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        animatedNodes.forEach(node => observer.observe(node));

        const tiltTargets = document.querySelectorAll('[data-tilt]');
        tiltTargets.forEach(target => {
            const rectCache = { width: 0, height: 0 };

            const updateRect = () => {
                const rect = target.getBoundingClientRect();
                rectCache.width = rect.width;
                rectCache.height = rect.height;
            };

            updateRect();
            window.addEventListener('resize', updateRect);

            const handleMove = event => {
                const rect = target.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateX = ((y / rectCache.height) - 0.5) * -10;
                const rotateY = ((x / rectCache.width) - 0.5) * 12;
                target.classList.add('is-tilting');
                target.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
            };

            const resetTilt = () => {
                target.classList.remove('is-tilting');
                target.style.transform = 'rotateX(0deg) rotateY(0deg)';
            };

            target.addEventListener('mousemove', handleMove);
            target.addEventListener('mouseleave', resetTilt);
        });
    }
});

