
const _supabase = supabase.createClient('https://ytxdjpxjwcpabfdukhtt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGRqcHhqd2NwYWJmZHVraHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjAyNzYsImV4cCI6MjA5MTI5NjI3Nn0.0s_jqP1PNqw2Dbp9yh2kE5NJZQL3GEey4UUtQaw0PWE');

async function handleBuyNow(productName, priceString) {
    const customerName = prompt("Order for Stitch Paws! Please enter your name:");
    const phoneNumber = prompt("Your Phone Number (for eSewa/WhatsApp):");

    if (!customerName || !phoneNumber) return;

    const numericPrice = parseFloat(priceString.replace(/[^\d.]/g, ''));

    const { data, error } = await _supabase
        .from('orders')
        .insert([{ 
            product_name: productName, 
            price: numericPrice, 
            Customer_name: customerName, 
            Phone_Number: phoneNumber,
            Payment_status: 'pending'
        }]);

    if (error) {
        console.error(error);
        alert("Database error, but we can still take your order via WhatsApp!");
    } else {
        alert("Order Recorded! Opening WhatsApp...");
        const message = `Hi! I'm ${customerName}. I just ordered the ${productName} (Rs. ${numericPrice}). Can you send me payment details?`;
        window.open(`https://wa.me/9779847694695?text=${encodeURIComponent(message)}`, '_blank');
    }
}

document.addEventListener('click', function (e) {
    if (e.target.innerText === "BUY NOW" || e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('.product-card');
        const pName = card.querySelector('h3').innerText;
        const pPrice = card.querySelector('.price').innerText;
        
        handleBuyNow(pName, pPrice);
    }

    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.dataset.filter;
        
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.category === filter) ? "block" : "none";
        });
    }
});