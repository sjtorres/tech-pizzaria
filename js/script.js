// criar a variavel modalKey que sera global
let modalKey = 0

// variavel para controlar a quantidade de pizzas no modal
let quantPizzas = 1

// carrinho
let cart = []

// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

// função para formatar o valores monetarios
const formatoReal = (valor) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
  if (valor) {
    return valor.toFixed(2)
  }
}

const abrirModal = () => {
  seleciona('.pizzaWindowArea').style.opacity = 0
  seleciona('.pizzaWindowArea').style.display = 'flex'
  setTimeout(() => seleciona('.pizzaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
  seleciona('.pizzaWindowArea').style.opacity = 0
  setTimeout(() => seleciona('.pizzaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
  /*
  document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', () => {
      //document.querySelector('.pizzaWindowArea').style.display = 'none'
      fecharModal()
  })
  document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', () => {
      //document.querySelector('.pizzaWindowArea').style.display = 'none'
      fecharModal()
  })
  */
  // BOTOES FECHAR MODAL
  selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', fecharModal)
  })
}

const preencheDadosDasPizzas = (pizzaItem, item, index) => {
  pizzaItem.setAttribute('data-key', index)
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector('.pizza-item--price').innerHTML = formatoReal(item.price[2])
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
  // document.querySelector('.pizzaBig img').src = item.img
  // document.querySelector('.pizzaInfo h1').innerHTML = item.name
  // document.querySelector('.pizzaInfo--desc').innerHTML = item.description
  // document.querySelector('.pizzaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
  seleciona('.pizzaBig img').src = item.img
  seleciona('.pizzaInfo h1').innerHTML = item.name
  seleciona('.pizzaInfo--desc').innerHTML = item.description
  seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

const pegarKey = (e) => {
  // .closest retorna o elemento mais proximo que tem a class que passamos
  // do .pizza-item ele vai pegar o valor do atributo data-key
  let key = e.target.closest('.pizza-item').getAttribute('data-key')
  console.log('Pizza clicada ' + key)
  console.log(pizzaJson[key])

  // garantir que a quantidade inicial de pizzas é 1
  quantPizzas = 1

  // Para manter a informação de qual pizza foi clicada
  modalKey = key

  return key
}

const preencherTamanhos = (key) => {
  // tirar a selecao de tamanho atual e selecionar o tamanho grande
  seleciona('.pizzaInfo--size.selected').classList.remove('selected')

  // selecionar todos os tamanhos
  selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
    // selecionar o tamanho grande
    (sizeIndex == 2) ? size.classList.add('selected') : ''
    size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
  })
}

const escolherTamanhoPreco = (key) => {
  // Ações nos botões de tamanho
  // selecionar todos os tamanhos
  selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
      // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
      // tirar a selecao de tamanho atual e selecionar o tamanho grande
      seleciona('.pizzaInfo--size.selected').classList.remove('selected')
      // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
      size.classList.add('selected')

      // mudar o preço de acordo com o tamanho  -  formatoReal(pizzaJson[key].price[sizeIndex])
      seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
    })
  })
}

const mudarQuantidade = () => {
  // Ações nos botões + e - da janela modal
  seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
    quantPizzas++
    seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
  })

  seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (quantPizzas > 1) {
      quantPizzas--
      seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
    }
  })
}

// MAPEAR pizzaJson para gerar lista de pizzas
pizzaJson.map((item, index) => {
  //console.log(item)
  let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
  //console.log(pizzaItem)
  //document.querySelector('.pizza-area').append(pizzaItem)
  seleciona('.pizza-area').append(pizzaItem)

  // preencher os dados de cada pizza
  preencheDadosDasPizzas(pizzaItem, item, index)

  // pizza clicada
  pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
    e.preventDefault()
    console.log('Clicou na pizza')

    let chave = pegarKey(e)
    
    // abrir janela modal
    abrirModal()

    // preenchimento dos dados
    preencheDadosModal(item)

    // pegar tamanho selecionado
    preencherTamanhos(chave)

    // definir quantidade inicial como 1
    seleciona('.pizzaInfo--qt').innerHTML = quantPizzas

    // selecionar o tamanho e preco com o clique no botao
    escolherTamanhoPreco(chave)

  })

  botoesFechar()

}) // fim do MAPEAR pizzaJson para gerar lista de pizzas
