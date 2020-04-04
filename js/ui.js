class Interfaz{

    constructor(){
        this.init();
    }
    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas => {

                //crear un select de opciones
                const select = document.querySelector('#criptomoneda');

                //iterar por los resultados de la api
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    //añadir el Symbol y el nombre como optiones
                    const option = document.createElement('option');
                    option.value = value.Symbol;
                    option.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(option);
                }
            })
    }

    mostrarMensaje(mensaje, clases){
        const div= document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        //seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        //Mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    //Imprime el resultado de la cotizacion
    mostrarResultado(resultado, moneda, cryto){
        const datosMoneda = resultado[cryto][moneda];
        //recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2),
        procentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
        actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');

        //Construir el template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                    <p>Variacion último día: % ${procentaje}</p>
                    <p>Última Actualizacion: ${actualizado}</p>
                </div>

            </div>
        `;
        //Insertar el resultado
        document.querySelector('#resultado').innerHTML = templateHTML;
    }
}