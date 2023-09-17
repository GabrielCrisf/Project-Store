// import { add_to_Cart } from "./AddCart.js";
import { catalogo } from "./utilidades.js";

export function RenderCatalogo (){

    for (const produto of catalogo)
{                                                  //OPERADOR TERNÁRIO: É TIPO UM IF: 'CONDIÇÃO' SE VERDADEIRO A CONDIÇÃO COLOCA O PRIMEIRO ?--
                                                                                    // SE FALSO : COLOCA O SEGUNDO;
    const  cartaoProduto = `
    <div id="card-produto-${produto.id}" class = "bord ${produto.feminino ? 'feminino' : 'masculino'} ">
                <img src="./assets/img/${produto.imagem}" 
                    alt="Produto 1 do Magazine HashTag."
                    style="height: 300px;">

                <p class = "marca">${produto.marca}</p> <!-- Marca -->
                <p class = "nome" >${produto.nome}</p> <!-- Nome da roupa -->
                <p class = "preco">${produto.preco}</p> <!--Preco -->
                <button id = "add-${produto.id}"class = "ADDB">
                    <i class="fa-solid fa-cart-plus"></i>
                </button> <!-- Add ao carrinho -->
    </div>`;
    document.getElementById("container-produto").innerHTML += cartaoProduto; 
    //add Envent Listener para o Botao
   /* const aa = document.getElementById(`add-${produto.id}`)
   aa.addEventListener("click", 
    ()=>add_to_Cart(produto.id)); */
}
}