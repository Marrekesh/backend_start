
const $basket = document.querySelector('.basket')
if ($basket) {
    $basket.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-remove')) {
            const id = e.target.dataset.id
            
            fetch('/basket/remove/' + id, {
                method: 'DELETE'
            }).then((res) => res.json())
              .then((basket) => {
                  console.log(basket)
                  if (basket.courses.length) {
                      const html = basket.courses.map(item => {
                          return `
                          <tr>
                            <td>${item.title}</td>
                            <td>${item.count}</td>
                            <td>
                              <button class="btn btn-small js-remove" data-id="${item.id}">Удалить</button>
                            </td>
                           </tr>
                          `
                      }).join('')
                      $basket.querySelector('tbody').innerHTML = html

                  } else {
                    $basket.innerHTML = `<p>Корзина пуста</p>`
                  }
              })
        }
    })
}