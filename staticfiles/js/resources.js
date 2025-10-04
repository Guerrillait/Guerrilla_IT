const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.resource-card');


searchInput.addEventListener('keyup', () => {
  const query = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();
    card.style.display = (title.includes(query) || desc.includes(query)) ? 'block' : 'none';
  });
});
