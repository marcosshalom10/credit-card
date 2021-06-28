const tarjeta = document.querySelector('#tarjeta'),
      btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
      formulario = document.querySelector('#formulario-tarjeta'),
      numeroTarjeta = document.querySelector('#tarjeta .numero'),
      nombreTarjeta = document.querySelector('#tarjeta .nombre'),
      logoMarca = document.querySelector('#logo-marca'),
      firma = document.querySelector('#tarjeta .firma p'),
      mesExpiracion = document.querySelector('#tarjeta .mes'),
      yearExpiracion = document.querySelector('#tarjeta .year'),
      ccv = document.querySelector('#tarjeta .ccv');


// ----- VOLTEAMOS LA TARJETA PARA MOSTRAR EL FRENTE
const mostrarFrente = () => {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active');
    }
} 

// ----- ROTACIÓN DE LA TARJETA
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

// ----- BOTÓN DE ABRIR FORMULARIO
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

// ----- SELECT DEL MES GENERADO DINÁMICAMENTE
for (let i = 1; i <= 12; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;    
    formulario.selectMes.appendChild(opcion);
}

// ----- SELECT DEL AÑO GENERADO DINÁMICAMENTE
const actualYear = new Date().getFullYear();
for (let i = actualYear; i <= actualYear + 10; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

// ----- INPUT NÚMERO DE TARJETA

formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
    // Eliminamos espacios en blanco
    .replace(/\s/g, '')
    // Eliminamos las letras
    .replace(/\D/g, '')
    // Un espacio cada 4 números
    .replace(/([0-9]{4})/g, '$1 ')
    // Elimamos el último espaciado
    .trim();

    numeroTarjeta.textContent = valorInput;

    if (valorInput == '') {
        numeroTarjeta.textContent = '#### #### #### ####';

        logoMarca.innerHTML = '';
    }

    if (valorInput[0] == 4) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../img/visa.png';
        logoMarca.appendChild(imagen);
    } else if (valorInput[0] == 5) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../img/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    // Voletamos la tarjeta para que el usuario vea el frente
    mostrarFrente();
});

// ----- INPUT NOMBRE DE TARJETA
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if (valorInput == '') {
        nombreTarjeta.textContent = 'JOHN DOE';
    }

    mostrarFrente();

});

// ----- SELECT MES
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
})

// ----- SELECT AÑO
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

// ----- CCV
formulario.inputCCV.addEventListener('keyup', (e) => {
    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active');
    }

    formulario.inputCCV.value = formulario.inputCCV.value
    .replace(/\s/g, '')
    .replace(/\D/g, '');

    ccv.textContent = formulario.inputCCV.value;
})