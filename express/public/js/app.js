document.querySelectorAll(".price").forEach(item => {
    item.textContent = new Intl.NumberFormat('ru-Ru', {
        currency: 'usd',
        style: 'currency'
    }).format(item.textContent);
})