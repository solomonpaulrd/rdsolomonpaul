// Interactive Resume JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
    });
    
    // Hover effect for links and buttons
    const hoverElements = document.querySelectorAll('a, button, .btn, .skill-item, .timeline-item, .cert-item, .award-item, .contact-detail-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.width = '15px';
            cursor.style.height = '15px';
            cursor.style.backgroundColor = 'var(--accent-color)';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderColor = 'var(--accent-color)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursor.style.backgroundColor = 'var(--primary-color)';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.borderColor = 'var(--primary-color)';
        });
    });
    
    // Typewriter Effect
    const typewriterText = document.getElementById('typewriter-text');
    const phrases = [
        'Data Tech & Business Intelligence Expert',
        'Cloud Data Analytical Engineer',
        'Machine Learning Specialist',
        'Data Visualization Professional',
        'Business Insights Analyst'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 1000);
    
    // Animate Skill Bars on Scroll
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }
    
    // Animate Stats Counter on Scroll
    function animateStatsCounter() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Initialize Radar Chart for Skills
    function initSkillRadarChart() {
        const ctx = document.getElementById('skillRadarChart').getContext('2d');
        
        const skillRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Python', 'SQL', 'Data Visualization', 'Data Engineering & Automation', 'Cloud Platforms', 'Machine Learning & AI', 'Business Intelligence'],
                datasets: [{
                    label: 'Skills Proficiency',
                    data: [90, 95, 95, 75, 80, 75, 90],
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(37, 99, 235, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(100, 116, 139, 0.2)'
                        },
                        grid: {
                            color: 'rgba(100, 116, 139, 0.2)'
                        },
                        pointLabels: {
                            color: 'var(--text-secondary)',
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: 'var(--text-tertiary)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    // Initialize GSAP ScrollTrigger Animations
    function initScrollAnimations() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        gsap.utils.toArray('.section').forEach(section => {
            gsap.fromTo(section, 
                { opacity: 0, y: 50 }, 
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Animate timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            const direction = i % 2 === 0 ? 50 : -50;
            
            gsap.fromTo(item, 
                { opacity: 0, x: direction }, 
                {
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Animate skill items
        gsap.utils.toArray('.skill-item').forEach((item, i) => {
            gsap.fromTo(item, 
                { opacity: 0, y: 30 }, 
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: '.skills-container',
                        start: 'top 70%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Animate education items
        gsap.utils.toArray('.education-item').forEach((item, i) => {
            gsap.fromTo(item, 
                { opacity: 0, y: 30 }, 
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    delay: i * 0.2,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Animate certification items
        gsap.utils.toArray('.cert-item').forEach((item, i) => {
            gsap.fromTo(item, 
                { opacity: 0, scale: 0.9 }, 
                {
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.5,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: '.certifications-container',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Animate award items
        gsap.utils.toArray('.award-item').forEach((item, i) => {
            gsap.fromTo(item, 
                { opacity: 0, scale: 0.9 }, 
                {
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.5,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: '.awards-container',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
        
        // Animate contact items
        gsap.utils.toArray('.contact-detail-item').forEach((item, i) => {
            gsap.fromTo(item, 
                { opacity: 0, x: -30 }, 
                {
                    opacity: 1, 
                    x: 0, 
                    duration: 0.5,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: '.contact-info-detailed',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }
    
    // Initialize all animations and interactive elements
    function initializeAll() {
        // Initialize skill bars animation when skills section is in view
        const skillsSection = document.getElementById('skills');
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
        
        // Initialize stats counter animation when about section is in view
        const aboutSection = document.getElementById('about');
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatsCounter();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        if (aboutSection) {
            aboutObserver.observe(aboutSection);
        }
        
        // Initialize radar chart
        initSkillRadarChart();
        
        // Initialize scroll animations
        initScrollAnimations();
    }
    
    // Call the initialization function
    initializeAll();
    
    // Form submission (for demo purposes)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form, so no message was actually sent.');
            this.reset();
        });
    }
    
    // Add click event to form button since it's not in a form
    const formButton = document.querySelector('.contact-form .primary-btn');
    if (formButton) {
        formButton.addEventListener('click', function() {
            alert('Thank you for your message! This is a demo form, so no message was actually sent.');
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        });
    }
});
