// Data for the different "types" of items
const productShowcase = {
    "Exclusive Keyring": [
        { name: "Panda Paw", price: "Rs.150", img: "key-panda.jpg" },
        { name: "Heart Shape", price: "Rs.150", img: "key-heart.jpg" }
    ],
    "Plushie": [
        { name: "Blue Dino", price: "Rs.350", img: "plush-dino.jpg" },
        { name: "Pink Bunny", price: "Rs.350", img: "plush-bunny.jpg" }
    ],
    "Mini Bag": [
        { name: "Tote Style", price: "Rs.350", img: "bag-tote.jpg" },
        { name: "Clutch Style", price: "Rs.400", img: "bag-clutch.jpg" }
    ],
    "Bandana": [
        { name: "Floral", price: "Rs.250", img: "b-flower.jpg" },
        { name: "Classic Blue", price: "Rs.250", img: "b-blue.jpg" }
    ]
};

// 1. Filtering Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        document.querySelectorAll('.product-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// 2. Showcase Modal Logic
const modal = document.getElementById('product-modal');
const vGrid = document.getElementById('variant-grid');

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if they just clicked "Add to Basket"
        if (e.target.classList.contains('add-to-cart')) return;

        const title = card.querySelector('h3').innerText;
        const variants = productShowcase[title];

        if (variants) {
            document.getElementById('modal-title').innerText = title + " Collection";
            vGrid.innerHTML = variants.map(v => `
                <div class="variant-item">
                    <img src="${v.img}" style="width:100%; border-radius:10px;" onerror="this.src='https://via.placeholder.com/150'">
                    <h4>${v.name}</h4>
                    <p>${v.price}</p>
                    <button class="add-to-cart">Select</button>
                </div>
            `).join('');
            modal.style.display = "block";
        }
    });
    const searchInput = document.getElementById('shop-search');

// Search Functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const category = card.dataset.category;
        
        // Match search text AND the active category filter
        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = (activeFilter === 'all' || category === activeFilter);

        if (matchesSearch && matchesFilter) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// Update existing Filter logic to respect the Search bar
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // ... (Existing active class logic) ...
        
        // Trigger the search logic again when a filter is clicked
        // so it filters the search results by category
        searchInput.dispatchEvent(new Event('input'));
    });
});
});

// Close Modal
document.querySelector('.close-modal').onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };