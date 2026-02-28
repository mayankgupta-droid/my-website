// Initialize Lucide icons
lucide.createIcons();

// --- Particle Background Logic ---
const canvas = document.getElementById('particles-js');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// --- Navbar Scroll Logic ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- Mobile Menu Toggle ---
const mobileBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- Fade-in Animation on Scroll ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// --- Fetch Certificates ---
async function fetchCertificates() {
    const certList = document.getElementById('certificate-list');
    try {
        const response = await fetch('/api/certificates');
        const data = await response.json();
        
        if (data.length === 0) {
            certList.innerHTML = `
                <div class="col-span-full text-center p-12 border-2 border-dashed border-slate-700 rounded-2xl text-slate-500">
                    <p>No certificates found in the folder yet.</p>
                    <p class="text-sm">Add files to 'backend/certificates' to see them here.</p>
                </div>
            `;
            return;
        }

        certList.innerHTML = data.map(cert => `
            <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-sky-500/50 transition-all group cursor-pointer" onclick="window.open('/certificates/${cert.fileName}', '_blank')">
                <div class="flex items-start justify-between">
                    <i data-lucide="award" class="w-10 h-10 text-sky-400 mb-4"></i>
                    <i data-lucide="external-link" class="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition-colors"></i>
                </div>
                <h3 class="font-bold text-lg mb-2 text-slate-200">${cert.displayName}</h3>
                <p class="text-sm text-slate-400">Click to view certificate</p>
            </div>
        `).join('');
        
        // Re-run lucide for newly added icons
        lucide.createIcons();
    } catch (error) {
        console.error('Error fetching certificates:', error);
        certList.innerHTML = '<p class="text-red-400">Error loading certificates.</p>';
    }
}

fetchCertificates();

// --- Contact Form Submission ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    const originalBtnText = submitBtn.innerText;
    
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    const payload = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        formStatus.classList.remove('hidden', 'text-red-400', 'text-green-400');
        if (response.ok) {
            formStatus.innerText = result.success;
            formStatus.classList.add('text-green-400');
            contactForm.reset();
        } else {
            formStatus.innerText = result.error || 'Something went wrong.';
            formStatus.classList.add('text-red-400');
        }
    } catch (error) {
        formStatus.innerText = 'Network error. Please try again later.';
        formStatus.classList.add('text-red-400');
    } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        setTimeout(() => formStatus.classList.add('hidden'), 5000);
    }
});
