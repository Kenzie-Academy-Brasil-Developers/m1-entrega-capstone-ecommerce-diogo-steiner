//Capturando elementos
const listaProdutosOn = document.getElementById("produtos-lista")
const listaProdutosOff = document.getElementById("produtos-sem-estoque-lista")
const listaProdutosCarrinho = document.getElementById("produtos-carrinho-lista")
const textCarrinhoVazio = document.getElementById("carrinho-vazio-text")
const resumoCarrinho = document.getElementById("carrinho-resumo")
const quantidadeCarrinhoSpan = document.getElementById("carrinho-quantidade")
const totalCarrinhoSpan = document.getElementById("carrinho-total")
const inputPesquisa = document.getElementById("inputPesquisa")
const btnPesquisa = document.getElementById("btn-pesquisa")
const menuCategorias = document.getElementById("menu-categorias")

let quantidadeCarrinho = 0
let totalCarrinho = 0
let arrayCarrinho = []




function listandoProdutos (arrayProdutos = data, tagUl = listaProdutosOn) {

    tagUl.innerHTML = ""
    listaProdutosOff.innerHTML = ""
    for (let i = 0; i < arrayProdutos.length; i++) {
        let produto = arrayProdutos[i]
        let card = criandoCard (produto)
        if (card.produtoEstoque) {
            tagUl.appendChild(card.tagLi)
        } else {
            card.tagLi.querySelector("button").innerText = "Produto Esgotado"
            listaProdutosOff.appendChild(card.tagLi)
        }
    }
}
listandoProdutos()


function criandoCard (produto) {

    let produtoId = produto.id
    let produtoImg = produto.img
    let produtoNome = produto.nameItem
    let produtoDescricao = produto.description
    let produtoValor = produto.value
    let produtoBtnText = produto.addCart
    let produtoCategoria = produto.tag

    let produtoEstoque = produto.estoque
    let produtoOferta = produto.oferta
    let produtoDeconto = produto.porcentagemDesconto


    const tagLi = document.createElement("li")
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const divInformacoes = document.createElement("div")
    const main = document.createElement("main")
    const h2Nome = document.createElement("h2")
    const pDescricao = document.createElement("p")
    const footer = document.createElement("footer")
    const divPreco = document.createElement("div")
    const spanPreco = document.createElement("span")
    const buttonCart = document.createElement("button")



    if (produtoOferta) {
        const spanPrecoOferta = document.createElement("span")
        let valorFinal = produtoValor - ((produtoValor * produtoDeconto)/100)
        spanPrecoOferta.innerText = `R$ ${valorFinal.toFixed(2).replace(".", ",")}`
        divPreco.appendChild(spanPreco)
        divPreco.appendChild(spanPrecoOferta)
        tagLi.classList.add("oferta")
    } else {
        divPreco.appendChild(spanPreco)
    }



    tagLi.classList.add("produtos-card")
    divInformacoes.classList.add("informacoes")
    divPreco.classList.add("preco")



    img.src = `${produtoImg.replace("..", "src")}`
    img.alt = `${produtoNome}`
    img.title = `${produtoNome} - ${produtoCategoria}`


    for (let i = 0; i < produtoCategoria.length; i++) {
        let spanCategoria = document.createElement("span")
        spanCategoria.innerText = produtoCategoria[i]
        main.appendChild(spanCategoria)
    }


    h2Nome.innerText = produtoNome
    pDescricao.innerText = produtoDescricao
    spanPreco.innerText = `R$ ${produtoValor.toFixed(2).replace(".", ",")}`
    buttonCart.innerText = produtoBtnText
    buttonCart.id = produtoId



    figure.appendChild(img)
    divInformacoes.appendChild(main)
    divInformacoes.appendChild(footer)
    main.appendChild(h2Nome)
    main.appendChild(pDescricao)
    footer.appendChild(divPreco)
    footer.appendChild(buttonCart)
    tagLi.append(figure, divInformacoes)

    if (produtoEstoque == false) {
        tagLi.classList.add("produto-fora-estoque")
    }

    return {
        tagLi,
        produtoEstoque
    }

}



listaProdutosOn.addEventListener("click", adicionarCarrinho)
function adicionarCarrinho (event, arrayProdutos = data) {
    let btnClicado = event.target

    if (btnClicado.tagName ==  "BUTTON") {
        let produtoId = btnClicado.id
        
        let produtoCard = btnClicado.closest("li").cloneNode(true)
        produtoCard.classList.add("produto-carrinho")
        produtoCard.querySelector("button").innerText = "Remover produto"

        listaProdutosCarrinho.appendChild(produtoCard)


        arrayCarrinhoAddRemove(produtoId, "add")
    }
}



listaProdutosCarrinho.addEventListener("click", removerCarrinho)
function removerCarrinho(event) {
    
    btnClicado = event.target

    if (btnClicado.tagName == "BUTTON") {
        let produto = btnClicado.closest("li").remove()
        let produtId = btnClicado.id
        arrayCarrinhoAddRemove(produtId, "remove")
    }

}



function arrayCarrinhoAddRemove (id, funcao, arrayProdutos = data, array = arrayCarrinho) {

    if (funcao == "add") {
        for (let i = 0; i < arrayProdutos.length; i++) {
            if (arrayProdutos[i].id == id) {
                let produto = arrayProdutos[i]
                array.push(produto)
            }
        }
    } else if (funcao == "remove") {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == id) {
                array.splice(i, 1)
                break
            }
        }
    }
    atualizaResumoCarrinho(array)
}



function atualizaResumoCarrinho (carrinho) {

    quantidadeCarrinho = carrinho.length
    totalCarrinho = 0

    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].oferta) {
            totalCarrinho += carrinho[i].value - ((carrinho[i].value * carrinho[i].porcentagemDesconto) /100)
        } else {
            totalCarrinho += carrinho[i].value
        }
    }

    quantidadeCarrinhoSpan.innerText = quantidadeCarrinho
    totalCarrinhoSpan.innerText = `R$ ${totalCarrinho.toFixed(2).replace(".", ",")}`

    if (listaProdutosCarrinho.childElementCount > 0) {
        textCarrinhoVazio.classList.add("esconder")
        resumoCarrinho.classList.remove("esconder")
        listaProdutosCarrinho.classList.remove("esconder")
    } else {
        textCarrinhoVazio.classList.remove("esconder")
        resumoCarrinho.classList.add("esconder")
        listaProdutosCarrinho.classList.add("esconder")
    }
}



btnPesquisa.addEventListener("click", pesquisa)
inputPesquisa.addEventListener("keypress", pesquisa)
function pesquisa (event, arrayProdutos = data) {

    if (event.type == "click" || event.type == "keypress" && event.keyCode == 13) {
        let pesquisa = inputPesquisa.value
        pesquisa = pesquisa.toLowerCase().trim()

        if (pesquisa != "") {
            let arrayPesquisa = []

            for (let i = 0; i < arrayProdutos.length; i++) {
                let produto = arrayProdutos[i]
                let nomeProduto = produto.nameItem.toLowerCase()
                if (nomeProduto.includes(pesquisa)) {
                    arrayPesquisa.push(produto)
                }
            }
            listandoProdutos(arrayPesquisa)

        } else {
            listandoProdutos()
        }
    }     
}



menuCategorias.addEventListener("click", listandoCategoria)
function listandoCategoria (event, arrayProdutos = data) {
    
    btnClicado = event.target
    if (btnClicado.tagName == "BUTTON") {
        let categoria = btnClicado.innerText.toLowerCase()
        let arrayCategoria = []

        if (categoria != "todos") {
            for (let i = 0; i < arrayProdutos.length; i++) {
                let produto = arrayProdutos[i]
                if (produto.tag.join(" ").toLowerCase().includes(categoria)) {
                    arrayCategoria.push(produto)
                }
            }

            listandoProdutos(arrayCategoria)
        } else {
            listandoProdutos()
        }
    }
}
