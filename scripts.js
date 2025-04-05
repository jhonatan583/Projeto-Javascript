const list = document.querySelector('ul')
const buttonshowall = document.querySelector('.show-all')
const buttonmapall = document.querySelector('.map-all')
const buttonsumall = document.querySelector('.sum-all')
const buttonFilter = document.querySelector('.filter-all')

function formatcurrency(value){
    const newvalue= value.toLocaleString('pt-br',{
        style: 'currency',
        currency:'BRL',
    })

    return newvalue
}

function showall(myarray) {
    let myli = ''
    myarray.forEach((product) => {
        myli += `
       <li>
            <img src="${product.src}">
            <p>${product.name} </p>
            <p class="item-price"> ${formatcurrency(product.price)}</p>
        </li>
       `

    })
    list.innerHTML = myli
}

function mapallitems() {
    const newPrices = menuOptions.map((product) => ({
        ...product,
        price: product.price * 0.9,


    }))
    showall(newPrices)

}

function sumalllist() {
    const valuetotal = menuOptions.reduce((acc, curr) => acc + curr.price, 0)
    list.innerHTML = `
          <li>
            <p> O Valor total dos itens é  ${formatcurrency(valuetotal)}</p>
        </li>
`
}

function filtervegan() {
    const filtervegan = menuOptions.filter(array => array.vegan)

    showall(filtervegan)
}

buttonshowall.addEventListener('click', () => showall(menuOptions));
buttonmapall.addEventListener('click', mapallitems);
buttonsumall.addEventListener('click', sumalllist)
buttonFilter.addEventListener('click', filtervegan)