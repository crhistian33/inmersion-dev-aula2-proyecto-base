let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDetalleGastos = [];
let nombreGasto = document.getElementById('nombreGasto');
let valorGasto = document.getElementById('valorGasto');
let detalleGasto = document.getElementById('detalleGasto');
const totalGastos = document.getElementById('totalGastos');
const listaGastos = document.getElementById('listaDeGastos');
let textoBoton = document.getElementById('textoBoton');
let tituloModal = document.getElementById('tituloModal');
let isEdit = false;
let gPosicion = 0;

function clickBoton() {
    const modal = bootstrap.Modal.getInstance(addModal);
    if(!isEdit) {
        listaNombresGastos.push(nombreGasto.value);
        listaValoresGastos.push(valorGasto.value);
        listaDetalleGastos.push(detalleGasto.value);
        actualizarListaGastos();
        modal.hide();
    } else {
        listaNombresGastos[gPosicion] = nombreGasto.value;
        listaValoresGastos[gPosicion] = valorGasto.value;
        listaDetalleGastos[gPosicion] = detalleGasto.value;
        actualizarListaGastos();
        modal.hide();
        isEdit = false;
        gPosicion = 0;
        textoBoton.innerText = 'Agregar';
        tituloModal.innerText = 'Agregar gasto';
    }
}

function actualizarListaGastos() {
    let htmlLista = '';
    let htmlTotalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const detalle = listaDetalleGastos[posicion];
        htmlLista += `
                <div class="row align-items-center border-bottom gx-0 bg-light">
                    <div class="col-3 p-2">${elemento}</div>
                    <div class="col-5 p-2">${detalle}</div>
                    <div class="col-2 p-2 text-center">${valorGasto.toFixed(2)}</div>
                    <div class="col-2 p-2 text-center"><button class="icon icon-edit" data-bs-toggle="modal" data-bs-target="#addModal" onclick="editarGasto(${posicion})"></button><button class="icon icon-delete" onclick="eliminarGasto(${posicion});"></button></div>
                </div>`;
        htmlTotalGastos += Number(valorGasto);
    })
    totalGastos.innerHTML = htmlTotalGastos.toFixed(2);
    if(htmlLista !== '')
        listaGastos.innerHTML = htmlLista;
    else
        listaGastos.innerHTML = '<div class="bg-light text-center p-2">No hay gastos registrados</div>';
    limpiar();
}

function editarGasto(posicion) {
    isEdit = true;
    gPosicion = posicion;
    textoBoton.innerText = 'Actualizar';
    tituloModal.innerText = 'Actualizar gasto';
    nombreGasto.value = listaNombresGastos[posicion]
    valorGasto.value = listaValoresGastos[posicion]
    detalleGasto.value = listaDetalleGastos[posicion]
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDetalleGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function limpiar() {
    nombreGasto.value = '';
    valorGasto.value = '';
    detalleGasto.value = '';
}