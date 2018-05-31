{
    let calculadora = {
    'botonCalcular': '',

    'acumulado': 0,

    'campoResultado': undefined,

    'iniciarCalculadora': function () {

        let arrayBotones = ['CE', 'C', '%', '+', 7, 8, 9, '-', 4, 5, 6, 'x', 1, 2, 3, '/', 0, '+/-', '.', '='];

        let divPadre = document.createElement('div');
        divPadre.setAttribute('id', 'divPadre');

        calculadora.campoResultado = document.getElementById('campoResultado');
        calculadora.campoResultado = document.createElement('input');
        calculadora.campoResultado.setAttribute('type', 'text');
        calculadora.campoResultado.setAttribute('id', 'campoResultado');
        calculadora.campoResultado.setAttribute('disabled', '');
        calculadora.campoResultado.value = 0;
        
        divPadre.appendChild(calculadora.campoResultado);

        let divBotones = document.createElement('div');
        divBotones.setAttribute('id', 'divBotones');

        let boton;
        for (let i = 0; i < arrayBotones.length; i++) {
            boton = document.createElement('button');
            boton.appendChild(document.createTextNode(arrayBotones[i]));
            boton.addEventListener('click', calculadora.clickButtoncalculadora, false);
            divBotones.appendChild(boton);
        }

        divPadre.appendChild(divBotones);
        document.body.appendChild(divPadre);
    },

    'clickButtoncalculadora': function () {
        let botonPulsado = this.innerText;

        switch (botonPulsado) {
            case 'CE': 
                calculadora.campoResultado.value = '0';
                calculadora.botonCalcular = '';
                calculadora.acumulado = 0;
                break;

            case 'C': 
                if (calculadora.campoResultado.value.length <= 1)
                    calculadora.campoResultado.value = 0;
                else
                    calculadora.campoResultado.value = calculadora.campoResultado.value.substring(0, calculadora.campoResultado.value.length-1);
                break;
            case '%': 
                if (calculadora.campoResultado.value != '')
                    calculadora.campoResultado.value = parseFloat(calculadora.campoResultado.value) / 100;
                break;
            case '+/-': 
                calculadora.campoResultado.value = calculadora.campoResultado.value - calculadora.campoResultado.value *2;
                break;
            case '.':
                if (calculadora.campoResultado.value != '' && calculadora.campoResultado.value.match(/\./g) != '.') { 
                    calculadora.campoResultado.value = calculadora.campoResultado.value + '.';
                }
                break;

            case '=':
                if (calculadora.botonCalcular != '' && calculadora.campoResultado.value.length > 0) {
                    calculadora.acumulado = calculadora.calcularAcumulado(calculadora, calculadora.campoResultado);
                    calculadora.campoResultado.value = calculadora.acumulado;
                    calculadora.botonCalcular = '';
                } else {
                    calculadora.botonCalcular = '';
                    calculadora.campoResultado.value = calculadora.acumulado;
                }

                break;

            case '+':
            case '-':
            case 'x':
            case '/':
                if (calculadora.campoResultado.value != '') {
                    if (calculadora.botonCalcular != '') {
                        calculadora.acumulado = calculadora.calcularAcumulado(calculadora, calculadora.campoResultado);
                        calculadora.botonCalcular = botonPulsado;
                        calculadora.campoResultado.value = calculadora.acumulado;
                    } else {
                        calculadora.acumulado = parseFloat(calculadora.campoResultado.value);
                        calculadora.botonCalcular = botonPulsado;
                        calculadora.campoResultado.value = calculadora.acumulado;
                    }
                }    
                break;    
            default:

                if (calculadora.campoResultado.value == '0' || calculadora.botonCalcular != '')
                    calculadora.campoResultado.value = botonPulsado;
                else
                    calculadora.campoResultado.value += botonPulsado;

                break;


        }

    },

    
    'calcularAcumulado': (calculadora, campoResultado) => {

        switch (calculadora.botonCalcular) { 
            case '+':
                return calculadora.sumar(parseFloat(calculadora.acumulado), parseFloat(campoResultado.value));
            case '-':
                return calculadora.restar(parseFloat(calculadora.acumulado), parseFloat(campoResultado.value));
            case 'x':
                return calculadora.multiplicar(parseFloat(calculadora.acumulado), parseFloat(campoResultado.value));
            case '/':
                return calculadora.dividir(parseFloat(calculadora.acumulado), parseFloat(campoResultado.value));
        }
    },

    'sumar': (numero1, numero2) => {
        return numero1 + numero2;
    },

    'restar': (numero1, numero2) => {
        return numero1 - numero2;
    },

    'multiplicar': (numero1, numero2) => {
        return numero1 * numero2;
    },

    'dividir': (numero1, numero2) => {
        return numero1 / numero2;
    },

};

calculadora.iniciarCalculadora();

}