import { catalogo, salvarLocalstorage, SalvedbyFilter, SalvedFilterM, SalvedFilterF } from "../src/utilidades.js";
import { RenderCatalogo } from "../src/RenderizarCatalogo.js";
//import { add_to_Cart } from "../src/AddCart.js";
import { idProdQuantia } from "../src/utilidades.js";
import { inicializaFiltros } from "../src/Filters.js";

function RemoverdoCart(id)
{
    const ContainerProdutosCarrinho = document.getElementById("produtos-carrinho");

    ContainerProdutosCarrinho.removeChild(document.getElementById(`Art-${id}`));

    //idProdQuantia[id] = null; //nao funfa so poe 1 no campo 6:'';
    delete idProdQuantia[id];
    //console.log(idProdQuantia)

    /******/
    salvarLocalstorage('carrinho', idProdQuantia);

    AtualizaPrecoTotal(id)
    //document.getElementById("produtos-carrinho").removeChild(document.getElementById(`Art-${id}`))
}

function incrementaCartmain(id)
{
    const card_to_Increment = document.getElementById(`quantia-${id}`); //<p>quantia</p>
    const Increment_Price = document.getElementById(`ID-Price-${id}`); //<p>quantia</p>
    
    //Quantia
    let num = parseInt(card_to_Increment.textContent);
    //console.log(card_to_Increment.textContent)
    //console.log(Increment_Price.textContent)
    card_to_Increment.textContent = num+1;
    //console.log((card_to_Increment.textContent));

    //Preco
    let Price = parseFloat(Increment_Price.textContent);

    Increment_Price.textContent = (Price+Price/(num)).toFixed(2);

    /******/
    salvarLocalstorage('carrinho', idProdQuantia);

    AtualizaPrecoTotal(id)
}

function decrementer(id)
{
    const card_to_Increment = document.getElementById(`quantia-${id}`); //<p>quantia</p>
    const Increment_Price = document.getElementById(`ID-Price-${id}`); //<p>quantia</p>
    
    idProdQuantia[id]--;
    //console.log(idProdQuantia[id]);
    
    let num = parseInt(card_to_Increment.textContent);
    if(num)  //evitar numeros negativos
        card_to_Increment.textContent = num-1;

    let Price = parseFloat(Increment_Price.textContent);
    //if(num == 0) num =1; //avoid infinity
    Increment_Price.textContent = (Price-Price/(num)).toFixed(2); 


    //Na verdade tem é que remover do carrinho::
    if(num==1)
        RemoverdoCart(id);

        /******/
    if(num!=1)//pra n salvar 2x
        salvarLocalstorage('carrinho', idProdQuantia);

    AtualizaPrecoTotal(id)
}


function AtualizaPrecoTotal(id)
{
    //console.log(idProdQuantia)
    let num = 0;

    for (const ids in idProdQuantia)   
        num += parseFloat(document.getElementById(`ID-Price-${ids}`).textContent);

        //console.log('num: '+ num);

    //Atualiza no fim::
    document.getElementById("preco-total").textContent = `Total: $${num.toFixed(2)}`;
    salvarLocalstorage('TotalPrice',num.toFixed(2));
    //window.location.reload('http://localhost:5500/Checkout.html');
}

const add_to_Cart = (id) =>
{
    if(idProdQuantia[id] == null)
        idProdQuantia[id] = 1;

    else
    {
        idProdQuantia[id]++;
        incrementaCartmain(id);
        return;
    }

    /******/
    desenhaCard(id);

    salvarLocalstorage('carrinho', idProdQuantia);

    AtualizaPrecoTotal(id)
}

RenderCatalogo(catalogo);

for (const produto of catalogo)
{
   const aa = document.getElementById(`add-${produto.id}`)
   aa.addEventListener("click", 
    ()=>add_to_Cart(produto.id));
}



const desenhaCard = (id) =>
{
    const prod = catalogo.find((p) => p.id == id); //find p tal que p.id === id
    const ContainerProdutosCarrinho = document.getElementById("produtos-carrinho")

    const Article = 
    document.createElement('article'); //<article></article>
    
    Article.id = `Art-${prod.id}`;
    Article.classList.add('Articlee');
    
    const CardProduto = `         
    <img 
        src="./assets/img/${prod.imagem}" 
        alt="Carrinho: ${prod.nome}" 
        class="ImgArticlee"
    >

    <div class="Texts-div">
        <p class="Cart-Title">${prod.nome}</p>
        <p class="Cart-Tam">Tamanho: M</p>
        <p id = "ID-Price-${prod.id}" class="Cart-Price">${prod.preco*idProdQuantia[id]}.00</p>
    </div>

    <i id="ExcluirProduto" class="fa-solid fa-circle-xmark ExcluiProdBy-${id}"></i>

    <!-- Botao de ADDREM -->

    <div class = "ADD_REM_B">
        <button id="lessQuant-${prod.id}" class = "B-">-</button>
        <p id = "quantia-${prod.id}">${idProdQuantia[id]}</p>
        <button id="plusQuant-${prod.id}" class = "Bp">+</button>
    </div>`;

    Article.innerHTML += CardProduto;
    ContainerProdutosCarrinho.appendChild(Article);

    const BotMais = document.getElementById(`plusQuant-${prod.id}`);
    const BotMenos = document.getElementById(`lessQuant-${prod.id}`);

    //BotMais.addEventListener('click', ()=>incrementaCartmain(id));
    BotMais.addEventListener('click', ()=>add_to_Cart(prod.id)); 
    BotMenos.addEventListener('click', ()=>decrementer(prod.id));

    const BotExcluir = document.querySelector(`.ExcluiProdBy-${prod.id}`);
    BotExcluir.addEventListener('click', ()=>RemoverdoCart(prod.id));
}

function desenhadorInitial()
{
    for(const id in idProdQuantia)
    {
        desenhaCard(id);
    }

    AtualizaPrecoTotal('');
}

desenhadorInitial();

const MainSec = document.getElementById("container-produto");
/* for (const child of MainSec.children){
    if(child.classList.contains('feminino'))
        console.log(child)
} */

const removeFromMain = (card) =>
{
    SalvedFilterF.push(card);

}

function selectGender(atributter)
{
    const MainSec = document.getElementById("container-produto");

    if(atributter === 'Alles')
    {
        for (const child of MainSec.children)
            child.classList.remove('Exluir_do_Cart');
        
        return;
    }


    for (const child of MainSec.children){

        if(child.classList.contains(atributter))
            child.classList.remove('Exluir_do_Cart');
        else
            child.classList.add('Exluir_do_Cart');  
    }
}

//OPC2----------------------------------------------------------------

function selectGender2(atributter)
{
    const MainSec = document.getElementById("container-produto");
    //console.log(atributter)

    if(atributter == 'Alles')
    {
        for(const Node of SalvedFilterF)
        {
            MainSec.appendChild(Node);

            if(SalvedFilterF.indexOf(Node)!= -1)
                SalvedFilterF.splice(SalvedFilterF.indexOf(Node));
        }
        
        for(const Node of SalvedFilterM)
        {
            MainSec.appendChild(Node);

            if(SalvedFilterM.indexOf(Node)!= -1)
                SalvedFilterM.splice(SalvedFilterM.indexOf(Node));
        }


        console.log(SalvedFilterF, SalvedFilterM)
        return;
    }
let child = MainSec.children[0];
let tmp ="";

    if(atributter == 'feminino')
    {
        while(child)
        {
            tmp = child;
            child = child.nextElementSibling;

            if(tmp.classList.contains('masculino'))
            {
                SalvedFilterM.push(tmp);
                MainSec.removeChild(tmp);
            } 
        }

        for(const Node of SalvedFilterF)
        {
            console.log("FFFF");
            MainSec.appendChild(Node);

            if(SalvedFilterF.indexOf(Node)!= -1)
                SalvedFilterF.splice(SalvedFilterF.indexOf(Node));

            console.log(Node)
        }
        console.log('Aqui')
        console.log(SalvedFilterF, SalvedFilterM)

        // console.log(SalvedFilterF, SalvedFilterM)
        return;
    }

    else
    {
        while(child)
        {
            tmp = child;
            child = child.nextElementSibling;

            if(tmp.classList.contains('feminino'))
            {
                SalvedFilterF.push(tmp);
                MainSec.removeChild(tmp);
            } 
        }

        for(const Node of SalvedFilterM)
        {
            MainSec.appendChild(Node);

            if(SalvedFilterM.indexOf(Node)!= -1)
                SalvedFilterM.splice(SalvedFilterM.indexOf(Node));
        }

        console.log(SalvedFilterF, SalvedFilterM)
        return;
    }
}

//document.getElementById('BF').addEventListener('click', ()=>selectGender('feminino'));
//document.getElementById('BM').addEventListener('click', ()=>selectGender('masculino'));
//document.getElementById('Alles').addEventListener('click', ()=>selectGender('Alles'));

inicializaFiltros();