function handleClick(cardName) {
    alert(`Button clicked in ${cardName} card!`);
}

function scrollToTop() {
    const content = document.getElementById('content');
    content.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Prevent pull-to-refresh on mobile
document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('touchmove', function(e) {
        if (e.target.closest('#content')) {
            return;
        }
        e.preventDefault();
    }, { passive: false });

    // Log when page loads
    console.log('Mobile app loaded successfully');
});