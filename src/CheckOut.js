import { ApagarDoLocalStorage, desenharProdutoFinalSimples, RecoverLocalStorage, salvarLocalstorage } from "./utilidades.js";


function desenharProdutosCheckout()
{
    //console.log(RecoverLocalStorage('TotalPrice'));
    const idProdCart = RecoverLocalStorage("carrinho");
    for(const id in idProdCart)
        desenharProdutoFinalSimples(id,"container-produtos-checkout", idProdCart[id]);

    document.getElementById('total-REV').textContent = `Total: $${RecoverLocalStorage('TotalPrice')}`;
}

desenharProdutosCheckout();

//document.getElementById('ICC').addEventListener('click', ()=>window.location.reload());

function addNews()
{
    const Container = document.getElementById('container-produtos-checkout');

    let Child = Container.children[0];
    let tmp=Child
    
    while(tmp)
    {
        if(Child==null)
            break;

        tmp=Child;
        Child = Child.nextElementSibling;
        Container.removeChild(tmp);
    }

    desenharProdutosCheckout();
}

//document.getElementById('ICC').addEventListener('click', ()=>desenharProdutosCheckout());
document.getElementById('ICC').addEventListener('click', ()=>addNews());



function finalizarcompra(evento)
{
    evento.preventDefault();

    const idProdQuanty = RecoverLocalStorage('carrinho') ?? {};

    if(Object.keys(idProdQuanty).length == 0)
        return;

        const DataAtual = new Date();
    
    const PedidoFeito = {
        dataPedido: DataAtual,
        pedido: idProdQuanty, //objeto dentro do outro
    }

    const HistoricoPedidos = RecoverLocalStorage('historico') ?? [];
    const historicoAtualizado = [PedidoFeito, ...HistoricoPedidos];

    ApagarDoLocalStorage('carrinho');
    salvarLocalstorage('historico', historicoAtualizado)

    //window.open('http://localhost:5500/Pedidos.html');
    window.location.href = window.location.origin + '/Project-Store'+'/Pedidos.html';

}

//document.addEventListener("submit", finalizarcompra)

document.addEventListener("submit", (evt) => finalizarcompra(evt))
