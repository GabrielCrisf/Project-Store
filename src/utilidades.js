export const catalogo =  [
    {  
        id: 1, marca: 'Zara',
        nome: 'Camisa Larga com Bolsos',
        preco: 70,
        imagem: 'product-1.jpg',
        feminino: false,
    },

    {   id: 2, 
        marca: 'Zara', 
        nome: 'Casaco Reto com Lã', 
        preco: 85, 
        imagem: 'product-2.jpg', 
        feminino: true, 
    }, 

    {   id: 3, 
        marca: 'Zara', 
        nome: 'Jaqueta com Efeito Camurça', 
        preco: 60, 
        imagem: 'product-3.jpg', 
        feminino: false, 
    }, 

    {   id: 4, 
        marca: 'Zara', 
        nome: 'Sobretudo em Mescla de Lã', 
        preco: 160, 
        imagem: 'product-4.jpg', 
        feminino: false, 
    }, 
    {   id: 5, 
        marca: 'Zara', 
        nome: 'Camisa Larga Acolchoada de Veludo Cotelê', 
        preco: 110, 
        imagem: 'product-5.jpg', 
        feminino: false, 
    }, 
    {   id: 6, 
        marca: 'Zara', 
        nome: 'Casaco de Lã com Botões', 
        preco: 170, 
        imagem: 'product-6.jpg', 
        feminino: true,
     },
    
     {  id: 7, 
        marca: 'Zara', 
        nome: 'Casaco com Botões', 
        preco: 75, 
        imagem: 'product-7.jpg', 
        feminino: true, 
    }, 
    {   id: 8, 
        marca: 'Zara', 
        nome: 'Colete Comprido com Cinto', 
        preco: 88, 
        imagem: 'product-8.jpg', 
        feminino: true, 
    }];





export const idProdQuantia = //Objeto (dicionario), se [] => lista
        RecoverLocalStorage("carrinho") ?? {}; 
        // o operador ?? informa: caso o 1 der merda e n retornar valido, 
        //joga o da direita {}

    /*     "1":0,
        "2":0,
        "3":0,
        "4":0,
        "5":0,
        "6":0,
        "7":0,
        "8":0, */
    
export function salvarLocalstorage(chave, info)
{
    localStorage.setItem(chave,JSON.stringify(info))
}

export function RecoverLocalStorage(chave)
{
    return JSON.parse(localStorage.getItem(chave));
}

export function ApagarDoLocalStorage (chave)
{
    localStorage.removeItem(chave);
}

export let SalvedbyFilter = {};
export let controlFilter = '';


export let SalvedFilterF = [];
export let SalvedFilterM = [];


export function desenharProdutoFinalSimples(id, idContainerHtml, quantidade)
{
    const prod = catalogo.find((p) => p.id == id); //find p tal que p.id === id
    const ContainerProdutosCarrinho = document.getElementById(idContainerHtml)

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
        <p id = "ID-Price-${prod.id}" class="Cart-Price">${prod.preco*quantidade}.00</p>
    </div>
    <div class = "ADD_REM_B">
    <p id = "quantia-${prod.id}">${quantidade}</p>
</div>`;

    Article.innerHTML += CardProduto;
    ContainerProdutosCarrinho.appendChild(Article);
}