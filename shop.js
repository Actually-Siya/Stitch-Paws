
const _supabase = supabase.createClient('YOUR_URL', 'YOUR_KEY');


let selectedProduct = { name: "", price: "" };

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('filter-btn')) {
        const filter = e.target.getAttribute('data-filter');
        
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        document.querySelectorAll('.product-card').forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (e.target.innerText === "BUY NOW") {
        const card = e.target.closest('.product-card');
        const pName = card.querySelector('h3').innerText;
        const pPrice = card.querySelector('.price').innerText;
        
        selectedProduct = { name: pName, price: pPrice };
        
        document.getElementById('modalProductName').innerText = pName + " - " + pPrice;
        document.getElementById('orderModal').style.display = "block";
    }

    if (e.target.classList.contains('close') || e.target.id === 'orderModal') {
        document.getElementById('orderModal').style.display = "none";
    }
});

document.getElementById('submitOrder').addEventListener('click', async () => {
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;

    if (!name || !phone) {
        alert("Please fill in your details!");
        return;
    }

    const { error } = await _supabase.from('orders').insert([
        { 
            product_name: selectedProduct.name, 
            price: parseFloat(selectedProduct.price.replace(/[^\d.]/g, '')), 
            Customer_name: name, 
            Phone_Number: phone 
        }
    ]);

    if (!error) {
        alert("Order Recorded!");
        window.open(`https://wa.me/9779823080682?text=I've ordered ${selectedProduct.name}`);
        document.getElementById('orderModal').style.display = "none";
    } else {
        alert("Error: " + error.message);
    }
});