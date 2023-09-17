import { desenharProdutoFinalSimples, RecoverLocalStorage } from "./utilidades.js";

function criarPedidoHistorico(pedidoComData)
{
    const elementoPedido = 
    `<p class = "Date">Data do Pedido: ${new Date(pedidoComData.dataPedido).toLocaleDateString()} às ${new Date(pedidoComData.dataPedido).toLocaleTimeString()}</p>
        <section id="container-pedidos-${pedidoComData.dataPedido}" class = "Pedidos-SEC"></section>` 

        const main = document.getElementsByTagName('main')[0];

        main.innerHTML += elementoPedido;


        for(const id in pedidoComData.pedido)
            desenharProdutoFinalSimples(id, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[id]);
}

function RenderizarHistoricoPedidos()
{
    const historico = RecoverLocalStorage('historico');

    for(const pedidoComData of historico)
        criarPedidoHistorico(pedidoComData);
}

RenderizarHistoricoPedidos();