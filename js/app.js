const cotizador = new API('a2cf05c763b1ca3dc61baf82ec6fc49996c633ebb81ebb2416109d3ad039b129');
const ui = new Interfaz();

cotizador.obtenerMonedasAPI();

// leer el formulario
const formulario = document.querySelector('#formulario');

//eventListener
formulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    // leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    // leer la criptomoneda seleccionada
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    //comprobar que ambos campos tengan algo seleccionado
    if (monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        //arrojar una alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    }else{
        //todo bien, consultar la api
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
            })
    }
})