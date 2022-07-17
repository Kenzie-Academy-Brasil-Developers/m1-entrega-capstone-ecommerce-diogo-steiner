
const listaVitrine = document.querySelector(".lista-vitrine")
const listaCarrinho = document.querySelector(".lista-carrinho")
const carrinhoQuantidade = document.getElementById("quantidade-produtos")
const carrinhoTotal = document.getElementById("total-produtos")
const quantidadePrecoCarrinho = document.querySelector(".quantidade-preco")
const carrinhoVazioText = document.querySelector(".carrinho-vazio-text")
let cartTotProdutos = 0
let cartQtProdutos = 0
let arrayCarrinho = []


function listandoProdutos (arrayProdutos = data, tagUl = listaVitrine) {

    for (let i = 0; i < arrayProdutos.length; i++) {
        let produto = arrayProdutos[i]
        let card = criandoCard(produto)
        tagUl.appendChild(card)
    }
}
listandoProdutos()





function criandoCard(produto) {

    //Capturando informações do produto
    let produtoId = produto.id
    let produtoImg = produto.img
    let produtoNome = produto.nameItem
    let produtoDescricao = produto.description
    let produtoValor = produto.value
    let produtoAddCart = produto.addCart
    let produtoTag = produto.tag
    


    //Criando Tags
    const tagLi = document.createElement("li")
    const divImg = document.createElement("div")
    const imgProduto = document.createElement("img")
    const divImformacoes = document.createElement("div") 
    const divCategoriaTitle = document.createElement("div")
    const spanCategoria = document.createElement("span")
    const nomeProduto = document.createElement("h2")
    const divDescricao = document.createElement("div")
    const pDescricao = document.createElement("p")
    const divPrecoBtn = document.createElement("div")
    const spanPreco = document.createElement("span")
    const btnAddCart = document.createElement("button")


    //Adicionando Classes
    tagLi.classList.add("card")
    divImg.classList.add("img")
    divImformacoes.classList.add("informacoes")
    divCategoriaTitle.classList.add("categoria-title")
    divDescricao.classList.add("descricao")
    divPrecoBtn.classList.add("preco-btn")
    spanPreco.classList.add("preco")


    //Adicionando Conteúdo
    imgProduto.setAttribute("src", produtoImg)
    spanCategoria.innerText = produtoTag
    nomeProduto.innerText = produtoNome
    pDescricao.innerText = produtoDescricao
    spanPreco.innerText = `R$ ${produtoValor.toFixed(2).replace(".", ",")}`
    btnAddCart.innerText = produtoAddCart
    tagLi.setAttribute("id", produtoId)


    //Pendurando elementos
    divImg.appendChild(imgProduto)
    divImformacoes.append(divCategoriaTitle, divDescricao, divPrecoBtn)
    divCategoriaTitle.append(spanCategoria,nomeProduto)
    divDescricao.appendChild(pDescricao)
    divPrecoBtn.append(spanPreco, btnAddCart)
    tagLi.append(divImg, divImformacoes)

    return tagLi
}





listaVitrine.addEventListener("click", adcicionandoCarrinho)
function adcicionandoCarrinho (event, arrayProdutos = data) {
    
    elementoClicado = event.target

    if (elementoClicado.tagName == "BUTTON") {    
        let produto = elementoClicado.parentNode.parentNode.parentNode.cloneNode(true)
        produto.classList.add("produto-carrinho")
        let id = produto.id
        produto.querySelector("button").innerText = "Remover do carrinho"
        listaCarrinho.appendChild(produto)

        arrayCarrinho.push(produto)
        for (let i = 0; i < arrayProdutos.length; i++) {
            let produto = arrayProdutos[i]
            if (produto.id == id) {
                cartTotProdutos += arrayProdutos[i].value
            }
        }
        quantidadeTotalCarrinho(arrayCarrinho.length ,cartTotProdutos)
    }
}





listaCarrinho.addEventListener("click", removendoCarrinho)
function removendoCarrinho (event) {

    elementoClicado = event.target

    if (elementoClicado.tagName == "BUTTON") {
        let produto = elementoClicado.parentNode.parentNode.parentNode
        let index = produto.id
        produto.remove()
        arrayCarrinho.pop()
        cartTotProdutos -= data[index - 1].value
        quantidadeTotalCarrinho(arrayCarrinho.length, cartTotProdutos)
    }
}





function quantidadeTotalCarrinho (quantidade, total) {
    if (listaCarrinho.childElementCount > 0) {
        quantidadePrecoCarrinho.classList.remove("esconder")
        carrinhoVazioText.classList.add("esconder")
    } else {
        quantidadePrecoCarrinho.classList.add("esconder")
        carrinhoVazioText.classList.remove("esconder")
    }
    carrinhoQuantidade.innerText = quantidade
    carrinhoTotal.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`
}
















//Modelo CArrinho
{/* <li class="card produto-carrinho">
    <div class="img">
        <img src="img/jaqueta.svg" alt="">
    </div>
    <div class="informacoes">
        <div class="categoria-title">
            <span>Camisetas</span>
            <h2>Lightweight Jacket</h2>
        </div>
        <div class="descricao">
            <p>Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...</p>
        </div>
        <div class="preco-btn">
            <span>R$ 100.00</span>
            <button>Adicionar ao carrinho</button>
        </div>
    </div>
</li> */}



//Modelo vitrine
{/* <li class="card">
    <div class="img">
        <img src="img/jaqueta.svg" alt="">
    </div>   
    <div class="informacoes">
        <div class="categoria-title">
            <span>Camisetas</span>
            <h2>Lightweight Jacket</h2>
        </div>
        <div class="descricao">
            <p>Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...</p>
        </div>
        <div class="preco-btn">
            <span>R$ 100.00</span>
            <button>Adicionar ao carrinho</button>
        </div>
    </div>
</li> */}