// ===== GLOBAL VARIABLES =====
let galleryData = [];
let displayedCount = 10;
let currentLightboxImg = '';
let currentLightboxTitle = '';

// Slider variables
let currentSlide = 0;
let sliderImages = [];
let autoSlideInterval = null;

// ===== LOAD DATA FROM JSON =====
async function loadWallpaperData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        galleryData = data.wallpapers;
        sliderImages = galleryData.slice(0, 10);
        renderGallery(displayedCount);
        renderSlider();
        updateStats(data.stats);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Fallback data
        galleryData = [
            { id: 1, name: "Gundam Sky Fly", category: "Anime", image: "images/wallpapers/gundam-anime-8k-wallpaper-uhdpaper.com-724@3@a.jpg", resolution: "8K" },
            { id: 2, name: "Neon City", category: "urbano", image: "images/wallpapers/city-lights-night-scenery-4k-wallpaper-uhdpaper.com-545@5@f.jpg", resolution: "4K" },
            { id: 3, name: "Fluxo Digital", category: "tecnologia", image: "images/wallpapers/140251_adapted_1080x2520.jpg", resolution: "WFHD" },
            { id: 4, name: "Sung Jinwoo Dark Aura", category: "Anime", image: "images/wallpapers/sung-jinwoo-solo-leveling-anime-4k-wallpaper-uhdpaper.com-142@5@d.jpg", resolution: "4K" },
            { id: 5, name: "Ashes of Captain America", category: "Filmes", image: "images/wallpapers/wp2111258.jpg", resolution: "4K" },
            { id: 6, name: "Silence", category: "espaço", image: "images/wallpapers/94536_original_2560x1440.jpg", resolution: "FHD" },
            { id: 7, name: "Sunset Mountains", category: "Paisagens", image: "images/wallpapers/sunset-mountain-beautiful-digital-art-scenery-4k-wallpaper-uhdpaper.com-183@1@n.jpg", resolution: "FHD" },
            { id: 8, name: "Cyberpunk Girl", category: "Games", image: "images/wallpapers/cyberpunk-girl-sci-fi-digital-art-4k-wallpaper-uhdpaper.com-376@5@d.jpg", resolution: "4K" },
            { id: 9, name: "Snowy Mountain Sunrise", category: "natureza", image: "images/wallpapers/snowy-mountain-sunrise-scenery-4k-wallpaper-uhdpaper.com-346@5@c.jpg", resolution: "4K" },
            { id: 10, name: "Sunset City Clouds", category: "Anime", image: "images/wallpapers/sunset-city-clouds-sky-anime-art-scenery-4k-wallpaper-uhdpaper.com-155@5@b.jpg", resolution: "FHD" },
            { id: 11, name: "White Lamborghini", category: "Carros", image: "images/wallpapers/131872_original_3840x2160.jpg", resolution: "4K" },
            { id: 12, name: "Plasma Waves", category: "Efeitos Visuais", image: "images/wallpapers/Vivid-Line Wallpaper Without Plasma Logo.jpg", resolution: "FHD" },
            { id: 13, name: "Master Chief Helmet", category: "Games", image: "images/wallpapers/wallpaperflare.com_wallpaper (8).jpg", resolution: "4K" },
            { id: 14, name: "Tree Grass Field", category: "natureza", image: "images/wallpapers/sunrise-grass-field-tree-scenery-4k-wallpaper-uhdpaper.com-284@5@d.jpg", resolution: "FHD" },
            { id: 15, name: "A Way for Sunset", category: "abstrato", image: "images/wallpapers/sunset-horizon-standing-alone-mountains-scenery-ai-art-4k-wallpaper-uhdpaper.com-715@1@l.jpg", resolution: "4K" },
            { id: 16, name: "Tokyo Night", category: "urbano", image: "images/wallpapers/tokyo-night.jpg", resolution: "4K" },
            { id: 17, name: "Ice Crystal", category: "natureza", image: "images/wallpapers/ice-crystal.jpg", resolution: "FHD" },
            { id: 18, name: "Vaporwave", category: "abstrato", image: "images/wallpapers/vaporwave.jpg", resolution: "FHD" },
            { id: 19, name: "Nebula Color", category: "espaco", image: "images/wallpapers/nebula-color.jpg", resolution: "4K" },
            { id: 20, name: "Clean UI", category: "minimalista", image: "images/wallpapers/clean-ui.jpg", resolution: "FHD" }
        ];
        sliderImages = galleryData.slice(0, 6);
        renderGallery(displayedCount);
        renderSlider();
    }
}

// ===== RENDER SLIDER =====
function renderSlider() {
    const track = document.getElementById('sliderTrack');
    const dotsContainer = document.getElementById('sliderDots');

    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Create first slide
    track.innerHTML = `
        <div class="slide-content" id="slide-${currentSlide}">
            <img src="${sliderImages[currentSlide].image}" alt="${sliderImages[currentSlide].name}"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22900%22 height=%22400%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%230d3a8f%22/%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%231a6dd4%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23g)%22 width=%22900%22 height=%22400%22/%3E%3Ctext fill=%22white%22 font-family=%22Arial%22 font-size=%2224%22 x=%2250%25%22 y=%2245%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${sliderImages[currentSlide].name}%3C/text%3E%3Ctext fill=%22rgba(255,255,255,0.6)%22 font-family=%22Arial%22 font-size=%2214%22 x=%2250%25%22 y=%2260%25%22 text-anchor=%22middle%22%3E${sliderImages[currentSlide].resolution}%3C/text%3E%3C/svg%3E'">
            <div class="slide-info">
                <div>
                    <h3>${sliderImages[currentSlide].name}</h3>
                    <p>${sliderImages[currentSlide].resolution} • ${sliderImages[currentSlide].category}</p>
                </div>
                <div class="slide-actions">
                    <button class="slide-btn-download" onclick="event.stopPropagation(); openLightbox('${sliderImages[currentSlide].image}', '${sliderImages[currentSlide].name}')">🖼️ Ver</button>
                    <button class="slide-btn-fav" onclick="event.stopPropagation(); downloadWall('${sliderImages[currentSlide].name}')">⬇ Download</button>
                </div>
            </div>
        </div>
    `;

    // Create dots
    sliderImages.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === currentSlide ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    // Auto slide
    startAutoSlide();
}

function updateSlide() {
    const track = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('.slider-dot');

    const img = document.querySelector('#sliderTrack img');
    const nameEl = document.querySelector('.slide-info h3');
    const infoEl = document.querySelector('.slide-info p');

    // Fade out
    img.style.opacity = '0';

    setTimeout(() => {
        img.src = sliderImages[currentSlide].image;
        img.onerror = function() {
            this.src = `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22900%22 height=%22400%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%230d3a8f%22/%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%231a6dd4%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23g)%22 width=%22900%22 height=%22400%22/%3E%3Ctext fill=%22white%22 font-family=%22Arial%22 font-size=%2224%22 x=%2250%25%22 y=%2245%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${sliderImages[currentSlide].name}%3C/text%3E%3Ctext fill=%22rgba(255,255,255,0.6)%22 font-family=%22Arial%22 font-size=%2214%22 x=%2250%25%22 y=%2260%25%22 text-anchor=%22middle%22%3E${sliderImages[currentSlide].resolution}%3C/text%3E%3C/svg%3E`;
        };
        nameEl.textContent = sliderImages[currentSlide].name;
        infoEl.textContent = `${sliderImages[currentSlide].resolution} • ${sliderImages[currentSlide].category}`;

        // Fade in
        img.style.opacity = '1';

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        // Update download/view buttons
        const viewBtn = document.querySelector('.slide-btn-download');
        const dlBtn = document.querySelector('.slide-btn-fav');
        if (viewBtn) viewBtn.setAttribute('onclick', `event.stopPropagation(); openLightbox('${sliderImages[currentSlide].image}', '${sliderImages[currentSlide].name}')`);
        if (dlBtn) dlBtn.setAttribute('onclick', `event.stopPropagation(); downloadWall('${sliderImages[currentSlide].name}')`);
    }, 300);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % sliderImages.length;
    updateSlide();
    resetAutoSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
    updateSlide();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    resetAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function resetAutoSlide() {
    startAutoSlide();
}

// ===== RENDER GALLERY =====
function renderGallery(count) {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';
    const items = galleryData.slice(0, count);

    items.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'gallery-item animate-on-scroll';
        el.setAttribute('data-cat', item.category);
        el.onclick = () => openLightbox(item.image, item.name);
        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22600%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%230d3a8f%22/%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%231a6dd4%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23g)%22 width=%22400%22 height=%22600%22/%3E%3Ctext fill=%22white%22 font-family=%22Arial%22 font-size=%2220%22 x=%2250%25%22 y=%2245%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${item.name}%3C/text%3E%3Ctext fill=%22rgba(255,255,255,0.6)%22 font-family=%22Arial%22 font-size=%2214%22 x=%2250%25%22 y=%2260%25%22 text-anchor=%22middle%22%3E${item.resolution}%3C/text%3E%3C/svg%3E'">
            <div class="gallery-overlay">
                <h4>${item.name}</h4>
                <span>${item.category} • ${item.resolution}</span>
                <div class="gallery-actions">
                    <button class="btn-download-sm" onclick="event.stopPropagation(); downloadWall('${item.name}')">⬇ Download</button>
                    <button class="btn-fav" onclick="event.stopPropagation(); toggleFavorite()">♡</button>
                </div>
            </div>
        `;
        grid.appendChild(el);
    });

    observeAnimations();
}

function loadMore() {
    displayedCount = Math.min(displayedCount + 8, galleryData.length);
    renderGallery(displayedCount);

    if (displayedCount >= galleryData.length) {
        const btn = document.getElementById('loadMoreBtn');
        btn.textContent = '✓ Todos os wallpapers carregados';
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'default';
    }
}

// ===== FILTER GALLERY =====
function filterGallery(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const grid = document.getElementById('galleryGrid');
    const items = grid.querySelectorAll('.gallery-item');

    if (category === 'all') {
        items.forEach((item, index) => {
            item.style.display = '';
            item.style.animation = 'fadeInUp 0.5s ease';
        });
    } else {
        items.forEach((item, index) => {
            const itemCat = item.getAttribute('data-cat');
            if (itemCat === category) {
                item.style.display = '';
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// ===== LIGHTBOX =====
function openLightbox(imgSrc, title) {
    currentLightboxImg = imgSrc;
    currentLightboxTitle = title;

    const img = document.getElementById('lightboxImg');
    img.src = imgSrc;
    img.onerror = function() {
        this.src = `data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%230a2a5e%22/%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%230d3a8f%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23g)%22 width=%22800%22 height=%22600%22/%3E%3Ctext fill=%22white%22 font-family=%22Arial%22 font-size=%2224%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${title}%3C/text%3E%3C/svg%3E`;
    };

    document.getElementById('lightboxTitle').textContent = title;
    const lb = document.getElementById('lightbox');
    lb.style.display = 'flex';
    requestAnimationFrame(() => lb.classList.add('active'));
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('active');
    setTimeout(() => {
        lb.style.display = 'none';
        document.body.style.overflow = '';
    }, 400);
}

document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});

// ===== DOWNLOAD =====
function downloadWall(name) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #0d3a8f, #1a6dd4);
        color: white;
        padding: 16px 30px;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 600;
        z-index: 3000;
        box-shadow: 0 8px 30px rgba(13,58,143,0.4);
        animation: slideUp 0.4s ease;
    `;
    notification.textContent = `⬇ Download iniciado: ${name}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// ===== FAVORITE =====
function toggleFavorite() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #f5576c, #ff6b6b);
        color: white;
        padding: 16px 30px;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 600;
        z-index: 3000;
        box-shadow: 0 8px 30px rgba(245,87,108,0.4);
        animation: slideUp 0.4s ease;
    `;
    notification.textContent = '♡ Adicionado aos favoritos!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ===== STATS =====
function updateStats(stats) {
    const targets = [
        { el: document.getElementById('stat1'), target: stats.totalWallpapers, suffix: '+' },
        { el: document.getElementById('stat2'), target: stats.totalDownloads, suffix: '+', format: true },
        { el: document.getElementById('stat3'), target: stats.totalCategories, suffix: '' },
        { el: document.getElementById('stat4'), target: stats.activeUsers, suffix: '+', format: true }
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                targets.forEach(t => {
                    let current = 0;
                    const step = t.target / 60;
                    const interval = setInterval(() => {
                        current += step;
                        if (current >= t.target) {
                            current = t.target;
                            clearInterval(interval);
                        }
                        if (t.format) {
                            t.el.textContent = Math.floor(current).toLocaleString('pt-BR') + t.suffix;
                        } else {
                            t.el.textContent = Math.floor(current) + t.suffix;
                        }
                    }, 25);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.querySelector('.stats-section'));
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');

    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }

    const sections = ['home', 'gallery', 'contact'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom > 200) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        }
    });
});

// ===== MOBILE MENU =====
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('hamburger').classList.remove('active');
    });
});

// ===== SCROLL TO TOP =====
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== ANIMATE ON SCROLL =====
function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadWallpaperData();
    observeAnimations();
});