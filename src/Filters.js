
function EsconderMasc(catalogoProd)
{
    const ProdMasc = 
    Array.from(catalogoProd.getElementsByClassName('masculino'));

    for (const Masc of ProdMasc)
        Masc.classList.add('hid');

    const ProdFem = 
        Array.from(catalogoProd.getElementsByClassName('feminino'));
    
        for (const Fem of ProdFem)
            Fem.classList.remove('hid');
}



function EsconderFem(catalogoProd)
{
    const ProdFem = 
    Array.from(catalogoProd.getElementsByClassName('feminino'));

    for (const Fem of ProdFem)
        Fem.classList.add('hid');

    const ProdMasc = 
        Array.from(catalogoProd.getElementsByClassName('masculino'));
    
        for (const Masc of ProdMasc)
            Masc.classList.remove('hid');
}


function ShowTodos(catalogoProd)
{
    const Todos = 
    Array.from(catalogoProd.getElementsByClassName('bord'));
    //Array.from(catalogoProd.getElementsByClassName('hid'));
    //ou somente child of chidren

    for (const Node of Todos)
        Node.classList.remove('hid');
}

export function inicializaFiltros()
{
    const catalogoProd = document.getElementById('container-produto');

    document.getElementById('exFem')
    .addEventListener('click', ()=>EsconderMasc(catalogoProd))

    document.getElementById('exMasc')
    .addEventListener('click', ()=>EsconderFem(catalogoProd))

    document.getElementById('exTodos')
    .addEventListener('click', ()=>ShowTodos(catalogoProd))
}