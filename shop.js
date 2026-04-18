const _supabase = supabase.createClient('https://ytxdjpxjwcpabfdukhtt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGRqcHhqd2NwYWJmZHVraHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjAyNzYsImV4cCI6MjA5MTI5NjI3Nn0.0s_jqP1PNqw2Dbp9yh2kE5NJZQL3GEey4UUtQaw0PWE');


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
        alert("Database error, but we can still take your order on WhatsApp!");
    } else {
        alert("Order Recorded! Opening WhatsApp...");
        const message = `Hi! I'm ${customerName}. I just ordered the ${productName} (Rs. ${numericPrice}). Can you send me payment details?`;
        window.open(`https://wa.me/9779847694695?text=${encodeURIComponent(message)}`, '_blank');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('shop-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('product-modal');

    document.addEventListener('click', function (e) {

        if (e.target.classList.contains('add-to-cart')) {
            const card = e.target.closest('.product-card') || e.target.closest('.variant-item');
            const pName = card.querySelector('h3')?.innerText || card.querySelector('h4')?.innerText;
            const pPrice = card.querySelector('.price')?.innerText || card.querySelector('p')?.innerText;
            handleBuyNow(pName, pPrice);
        }

        if (e.target.classList.contains('filter-btn')) {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            runSearchAndFilter();
        }

        
        if (e.target.classList.contains('close-modal') || e.target === modal) {
            modal.style.display = "none";
        }
    });

    
    function runSearchAndFilter() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        
        document.querySelectorAll('.product-card').forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const category = card.dataset.category;
            const matchesSearch = title.includes(searchTerm);
            const matchesFilter = (activeFilter === 'all' || category === activeFilter);
            card.style.display = (matchesSearch && matchesFilter) ? "block" : "none";
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', runSearchAndFilter);
    }
});