document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Simple form validation and submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all skill cards (guarded) - removed as skills section doesn't exist

    // Observe all struktur cards
    document.querySelectorAll('.struktur-card').forEach(card => {
        observer.observe(card);
    });

    // Observe all student cards
    document.querySelectorAll('.student-card').forEach(card => {
        observer.observe(card);
    });

    // Observe all project cards
    document.querySelectorAll('.project').forEach(project => {
        observer.observe(project);
    });

    // Observe all album items
    document.querySelectorAll('.album-item').forEach(item => {
        observer.observe(item);
    });

    // Add hover effect to navigation
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Parallax effect on header — disabled on small screens for performance/usability
    const enableParallax = !window.matchMedia('(max-width: 768px)').matches;
    if (enableParallax) {
        const onParallax = () => {
            const scrollTop = window.pageYOffset;
            const header = document.querySelector('header');
            if (header) {
                header.style.transform = `translateY(${scrollTop * 0.5}px)`;
            }
        };
        window.addEventListener('scroll', onParallax);
    } else {
        const header = document.querySelector('header');
        if (header) header.style.transform = 'translateY(0)';
    }

    // Add ripple effect on button clicks
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });



    // Mobile optimization: Reduce animations on mobile devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
        // Disable heavy animations on mobile
        const animatedElements = document.querySelectorAll('.student-card, .project, .struktur-card');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
    }
});