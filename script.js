window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
        nav.style.padding = "10px 50px";
    } else {
        nav.style.boxShadow = "none";
        nav.style.padding = "20px 50px";
    }
    // Function to handle the scroll reveal
const revealSection = () => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the element is visible

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
    window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    
    // Check if the page has been scrolled more than 50px
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
};

// Run the function
revealSection();
});