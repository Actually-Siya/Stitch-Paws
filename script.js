window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
        nav.style.padding = "10px 50px";
    } else {
        nav.style.boxShadow = "none";
        nav.style.padding = "20px 50px";
    }
const revealSection = () => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 }); 

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
    window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
};

revealSection();
});