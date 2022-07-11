const toCurrency = price => {
    return new Intl.NumberFormat('ru-Ru', {
        currency: 'usd',
        style: 'currency'
    }).format(price);
}
const updataCardUi = card => {
    if(card.courses.length){
        const html = card.courses.map(c => {
            return `
            <tr>
                <td><a href="/courses/${c.id}" target="_blank">${c.title}</a></td>
                <td>${c.count}</td>
                <td>
                    <button class="btn btn-small js-remove" data-id="${c.id}">
                        Удалить
                    </button>
                    <button class="btn btn-small js-add" data-id="${c.id}">
                        добавить
                    </button>
                </td>
            </tr>
            `
        }).join('');
        $card.querySelector('tbody').innerHTML = html;
        $card.querySelector('.price').textContent = toCurrency(card.price);
    }else{
        $card.innerHTML = `<p class="card-empty">Корзина пуста</p>`;
    }
}
 
document.querySelectorAll(".price").forEach(item => {
    item.textContent = toCurrency(item.textContent);
})

const $card = document.querySelector('#card');

if($card){
    $card.addEventListener('click', (e)=>{
        if(e.target.classList.contains('js-remove')){
            const id = e.target.dataset.id;
            
            fetch(`/card/remove/${id}`, {
                method: 'delete',
            })
            .then(res => res.json())
            .then(updataCardUi)

        }
        if(e.target.classList.contains('js-add')){
            const id = e.target.dataset.id;
            
            fetch(`/card/add/${id}`, {
                method: 'get',
            })
            .then(res => res.json())
            .then(updataCardUi)

        }
    })
}