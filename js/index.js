
const listaVitrine = document.querySelector(".lista-vitrine")
const listaCarrinho = document.querySelector(".lista-carrinho")




function listandoProdutos (arrayProdutos, tagUl = listaVitrine) {

    for (let i = 0; i < arrayProdutos.length; i++) {
        let produto = arrayProdutos[i]
        let card = criandoCard(produto)
        tagUl.appendChild(card)

    }
}

listandoProdutos(data)




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
    divCategoriaTitle.appendChild(spanCategoria,nomeProduto)
    divDescricao.appendChild(pDescricao)
    divPrecoBtn.append(spanPreco, btnAddCart)
    tagLi.append(divImg, divImformacoes)

    return tagLi
}



listaVitrine.addEventListener("click", adcicionandoCarrinho)

function adcicionandoCarrinho (event) {
    
    elementoClicado = event.target
    console.log(elementoClicado);

    if (elementoClicado.tagName == "BUTTON") {
        
        let produto = elementoClicado.parentNode.parentNode.parentNode.cloneNode(true)
        produto.classList.add("produto-carrinho")
        console.log(produto);
        listaCarrinho.appendChild(produto)
    }
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