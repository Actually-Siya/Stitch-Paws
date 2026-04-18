
const _supabase = supabase.createClient('https://ytxdjpxjwcpabfdukhtt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGRqcHhqd2NwYWJmZHVraHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjAyNzYsImV4cCI6MjA5MTI5NjI3Nn0.0s_jqP1PNqw2Dbp9yh2kE5NJZQL3GEey4UUtQaw0PWE');

let selectedProduct = {};

function handleBuyNow(pName, pPrice) {
    selectedProduct = { name: pName, price: pPrice };
    document.getElementById('modalProductName').innerText = pName + " - " + pPrice;
    document.getElementById('orderModal').style.display = "block";
}


document.getElementById('submitOrder').onclick = async function() {
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;

    if (!name || !phone) {
        alert("Please fill in your details!");
        return;
    }

    const numericPrice = parseFloat(selectedProduct.price.replace(/[^\d.]/g, ''));

   
    const { error } = await _supabase.from('Orders').insert([
        { 
            product_name: selectedProduct.name, 
            price: numericPrice, 
            Customer_name: name, 
            Phone_Number: phone 
        }
    ]);

    if (!error) {
        alert("Order Recorded!");
        const msg = `Hi! I'm ${name}. I just ordered the ${selectedProduct.name} (${selectedProduct.price}).`;
        window.open(`https://wa.me/9779847694695?text=${encodeURIComponent(msg)}`);
        document.getElementById('orderModal').style.display = "none";
    } else {
        alert("Database error, but we'll try WhatsApp!");
    }
};

document.querySelector('.close').onclick = () => document.getElementById('orderModal').style.display = "none";

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