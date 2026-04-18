const products = [
    { name: "Flower Keychain", category: "toy", price: 150, img: "flower-key.jpg" },
    { name: "Bear Keychain", category: "toy", price: 200, img: "bear-key.jpg" },
    { name: "Octopus Keychain", category: "toy", price: 250, img: "octo-key.jpg" },
    { name: "Paw Keychain", category: "toy", price: 150, img: "paw-key.jpg" },
    { name: "Mini Purse", category: "bag", price: 350, img: "purse.jpg" },
    { name: "Card Holder", category: "bag", price: 200, img: "card-holder.jpg" },
    { name: "Mini Hand Bag", category: "bag", price: 450, img: "handbag.jpg" },
    { name: "Flower Headband", category: "headwear", price: 250, img: "flower-head.jpg" },
    { name: "Pastel Headband", category: "headwear", price: 250, img: "pastel-head.jpg" },
    { name: "Single Color Headband", category: "headwear", price: 200, img: "solid-head.jpg" }
];


const productShowcase = {
    "Octopus Keychain": [
        { name: "Bulky Yarn (Fluffy)", price: "Rs.300", img: "octo-bulky.jpg" },
        { name: "Cotton Yarn (Classic)", price: "Rs.250", img: "octo-cotton.jpg" }
    ],
    "Mini Hand Bag": [
        { name: "Lavender", price: "Rs.450", img: "bag-lavender.jpg" },
        { name: "Mint Green", price: "Rs.450", img: "bag-mint.jpg" }
    ]

};

const _supabase = supabase.createClient(
    'https://ytxdjpxjwcpabfdukhtt.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGRqcHhqd2NwYWJmZHVraHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjAyNzYsImV4cCI6MjA5MTI5NjI3Nn0.0s_jqP1PNqw2Dbp9yh2kE5NJZQL3GEey4UUtQaw0PWE'
);


async function handleBuyNow(productName, priceString) {
    const customerName = prompt("Order for Stitch Paws! Please enter your name:");
    const phoneNumber = prompt("Your Phone Number (for eSewa/WhatsApp):");

    if (!customerName || !phoneNumber) return;

    
    const numericPrice = parseFloat(priceString.replace(/[^\d.]/g, ''));

   
    const { data, error } = await _supabase
        .from('orders')
        .insert([
            { 
                product_name: productName, 
                price: numericPrice, 
                Customer_name: customerName, 
                Phone_Number: phoneNumber,
                Payment_status: 'pending'
            }
        ]);

    if (error) {
        console.error('Supabase Error:', error);
        alert("We couldn't log the order, but you can still message us on WhatsApp!");
    } else {
        alert("Order Recorded! Opening WhatsApp for payment info...");
        
    
        const message = `Hi Stitch Paws! I'm ${customerName}. I just ordered the ${productName} (Rs. ${numericPrice}) from the website. Can I get the eSewa details?`;
        window.open(`https://wa.me/97798XXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
    }
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
        if (e.target.closest('.variant-item')) {
            const vName = e.target.parentElement.querySelector('h4').innerText;
            const vPrice = e.target.parentElement.querySelector('p').innerText;
            handleBuyNow(vName, vPrice);
        } 
        else {
            const card = e.target.closest('.product-card');
            const pName = card.querySelector('h3').innerText;
            const pPrice = card.querySelector('.price').innerText;
            handleBuyNow(pName, pPrice);
        }
    }
});


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

const modal = document.getElementById('product-modal');
const vGrid = document.getElementById('variant-grid');

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
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

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const category = card.dataset.category;
        
        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = (activeFilter === 'all' || category === activeFilter);

        if (matchesSearch && matchesFilter) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        searchInput.dispatchEvent(new Event('input'));
    });
});





document.querySelector('.close-modal').onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }; });