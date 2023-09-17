// import { idProdQuantia } from "../src/utilidades";

const abrirCarrinho = (target) =>
{
    target.classList.remove('fecharCarrinho','Vis')
    target.classList.add('abrirCarrinho');

    setTimeout (() =>
    {
        //target.classList.add('Vis');
        target.style.right = "0px";
    }, 1300);
}

let tmp;

const fecharCarrinho = (target) =>
{
    tmp = target;
    const dd=document.createElement('div')
    console.log(target)
    // console.log("Entrou aqui")
    target.classList.remove('abrirCarrinho')
    target.classList.add('fecharCarrinho');
   // dd.style.visibility = "hidden"
   //dd.style.right = "-360px";

    setTimeout (() =>
    {
        //target.classList.add('Vis');
        target.style.right = "-430px";
    }, 1300);
}

const BotaoFecharCarrinho = document.getElementById("fechar-carrinho");

BotaoFecharCarrinho.addEventListener('click', 
()=>fecharCarrinho(BotaoFecharCarrinho.parentElement.parentElement)); //ele é neto de carrinho

const iconCarrinho = document.querySelector('.Cart');

iconCarrinho.addEventListener('click', 
()=>abrirCarrinho(BotaoFecharCarrinho.parentElement.parentElement));


const IrParaCheckOut = () =>
{
    if(document.getElementById('preco-total').textContent != 'Total: $0.00')
        window.location.href = window.location.origin + '/Project-Store'+ '/Checkout.html';   
        //window.open('http://localhost:5500/Checkout.html');
        //if(Object.keys(idProdQuantia).length!=0)
        // console.log('Tudo Certo')
    //else
    // console.log('preco zerado')
}

const Finalizar = document.getElementById('ButEnd')
      .addEventListener("click",IrParaCheckOut);






