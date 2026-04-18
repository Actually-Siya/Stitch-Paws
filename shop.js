
const _supabase = supabase.createClient('https://ytxdjpxjwcpabfdukhtt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGRqcHhqd2NwYWJmZHVraHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjAyNzYsImV4cCI6MjA5MTI5NjI3Nn0.0s_jqP1PNqw2Dbp9yh2kE5NJZQL3GEey4UUtQaw0PWE');

function handleBuyNow(pName, pPrice) {
    console.log("Button clicked for:", pName);
    const modal = document.getElementById('orderModal');
    document.getElementById('modalProductName').innerText = pName + " (" + pPrice + ")";
    modal.style.display = "block";
    
    
    window.currentOrder = { name: pName, price: pPrice };
}

const submitBtn = document.getElementById('submitOrder');
if (submitBtn) {
    submitBtn.onclick = async function() {
        const cName = document.getElementById('custName').value;
        const cPhone = document.getElementById('custPhone').value;

        if (!cName || !cPhone) {
            alert("Please fill in your details!");
            return;
        }

        const numericPrice = parseFloat(window.currentOrder.price.replace(/[^\d.]/g, ''));

        const { error } = await _supabase.from('orders').insert([
            { 
                product_name: window.currentOrder.name, 
                price: numericPrice, 
                Customer_name: cName, 
                Phone_Number: cPhone 
            }
        ]);

        if (!error) {
            alert("Order Success!");
            window.open(`https://wa.me/97798XXXXXXXX?text=Order:${window.currentOrder.name}`);
            document.getElementById('orderModal').style.display = "none";
        } else {
            console.error(error);
            alert("Database Error: " + error.message);
        }
    };
}

const closeBtn = document.querySelector('.close');
if (closeBtn) {
    closeBtn.onclick = () => { document.getElementById('orderModal').style.display = "none"; };
}

document.addEventListener('click', function (e) {
    if (e.target.innerText && e.target.innerText.includes("BUY NOW")) {
        const card = e.target.closest('.product-card');
        const pName = card.querySelector('h3').innerText;
        const pPrice = card.querySelector('.price').innerText;
        handleBuyNow(pName, pPrice);
    }
});