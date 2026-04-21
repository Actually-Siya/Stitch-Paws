const _supabase = supabase.createClient('https://ytxdjpxjwcpabfdukhtt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGRqcHhqd2NwYWJmZHVraHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjAyNzYsImV4cCI6MjA5MTI5NjI3Nn0.0s_jqP1PNqw2Dbp9yh2kE5NJZQL3GEey4UUtQaw0PWE');

document.addEventListener('click', async function (e) {
    
    if (e.target.classList.contains('filter-btn')) {
        const filter = e.target.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        document.querySelectorAll('.product-card').forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.category === filter) ? "block" : "none";
        });
    }

    if (e.target.innerText === "BUY NOW") {
        const card = e.target.closest('.product-card');
        const name = card.querySelector('h3').innerText;
        const price = card.querySelector('.price').innerText;

        window.currentOrder = { name, price }; // Save to window memory
        
        document.getElementById('modalProductName').innerText = name + " (" + price + ")";
        document.getElementById('orderModal').style.display = "block";
    }

    if (e.target.classList.contains('close') || e.target.id === 'orderModal') {
        document.getElementById('orderModal').style.display = "none";
    }
    
    if (e.target.id === 'submitOrder') {
        const cName = document.getElementById('custName').value;
        const cPhone = document.getElementById('custPhone').value;

        if (!cName || !cPhone) return alert("Fill in details!");

        const { error } = await _supabase.from('orders').insert([{
            product_name: window.currentOrder.name,
            price: parseFloat(window.currentOrder.price.replace(/[^\d.]/g, '')),
            Customer_name: cName,
            Phone_Number: cPhone
        }]);

        if (!error) {
            alert("Success!");
            window.open(`https://wa.me/97798XXXXXXXX?text=Order:${window.currentOrder.name}`);
            document.getElementById('orderModal').style.display = "none";
        } else {
            alert("DB Error: " + error.message);
        }
    }
});
