const _supabase = supabase.createClient('https://ytxdjpxjwcpabfdukhtt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eGRqcHhqd2NwYWJmZHVraHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjAyNzYsImV4cCI6MjA5MTI5NjI3Nn0.0s_jqP1PNqw2Dbp9yh2kE5NJZQL3GEey4UUtQaw0PWE');

const amountInput = document.getElementById('custom-amount');
const tierButtons = document.querySelectorAll('.donate-select');
const completeBtn = document.querySelector('.cta-btn.bubbly');
const modal = document.getElementById('donateModal');
const finalDonateBtn = document.getElementById('finalDonateBtn');

tierButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.impact-card');
        const amount = card.getAttribute('data-amount');
    
        amountInput.value = amount;
        document.querySelectorAll('.impact-card').forEach(c => c.style.borderColor = "#eee");
        card.style.borderColor = "#ffb7c5";
        tierButtons.forEach(btn => {
            btn.style.backgroundColor = "";
            btn.innerText = "Select";
        });
        e.target.style.backgroundColor = "#FBB6CE";
        e.target.innerText = "Selected";
        
        amountInput.focus();
    });
});

completeBtn.onclick = () => {
    const amount = amountInput.value;
    if (!amount || amount <= 0) {
        alert("Please select or enter an amount! 🐾");
        return;
    }
    
    document.getElementById('donate-summary').innerText = `Total Contribution: Rs. ${amount}`;
    modal.style.display = "block";
};

finalDonateBtn.onclick = async () => {
    const name = document.getElementById('donorName').value;
    const amount = amountInput.value;

    if (!name) {
        alert("Please enter your name so we can thank you!");
        return;
    }

    const { data, error } = await _supabase.from('donations').insert([
        { 
            donor_name: name, 
            amount: parseFloat(amount),
            status: 'pending' 
        }
    ]);

    if (!error) {
        const msg = `Hi! I'm ${name}. I just donated Rs. ${amount} to Stitch Paws via eSewa. Here is my payment screenshot! 🐾`;
        const whatsappURL = `https://wa.me/97798XXXXXXXX?text=${encodeURIComponent(msg)}`;
        
        alert("Record saved! Opening WhatsApp for verification...");
        window.open(whatsappURL, '_blank');
        
        modal.style.display = "none";
        amountInput.value = "";
    } else {
        console.error("Supabase Error:", error);
        alert("Technical glitch, but you can still donate via QR and message us!");
    }
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};