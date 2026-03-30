const amountInput = document.getElementById('custom-amount');
const tierButtons = document.querySelectorAll('.donate-select');

tierButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Get amount from the parent card's data attribute
        const amount = e.target.parentElement.getAttribute('data-amount');
        
        // Update input field
        amountInput.value = amount;
        
        // Visual feedback
        tierButtons.forEach(btn => btn.style.backgroundColor = ""); // Reset others
        e.target.style.backgroundColor = "#FBB6CE"; // Change to pink
        
        // Scroll to the input for clarity
        amountInput.focus();
    });
});