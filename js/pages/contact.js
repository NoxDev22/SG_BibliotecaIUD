document.addEventListener('DOMContentLoaded', () => {

    
    const formulario = document.querySelector('.formulario-contacto form');
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const txtMensaje = document.getElementById('tu-mensaje');

    // Comprobamos que el formulario exista en esta página para evitar errores en otras
    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            // Evitamos que la página se recargue por defecto al presionar enviar
            evento.preventDefault(); 

            // Creamos una variable de control
            let formularioValido = true;

            // Limpiar alertas previas si existieran
            removerErrores();

            // VALIDACIÓN DEL CAMPO NOMBRE
            if (inputNombre.value.trim() === '') {
                mostrarError(inputNombre, 'Por favor, ingresa tu nombre completo.');
                formularioValido = false;
            }

            // VALIDACIÓN DEL CAMPO EMAIL
            if (inputEmail.value.trim() === '') {
                mostrarError(inputEmail, 'El correo electrónico es obligatorio.');
                formularioValido = false;
            } else if (!validarFormatoEmail(inputEmail.value)) {
                mostrarError(inputEmail, 'Por favor, ingresa un correo válido (ejemplo@correo.com).');
                formularioValido = false;
            }

            // VALIDACIÓN DEL MENSAJE
            if (txtMensaje.value.trim() === '') {
                mostrarError(txtMensaje, 'El cuerpo del mensaje no puede estar vacío.');
                formularioValido = false;
            }

            // SI TODO ESTÁ BIEN SIMULAMOS EL ENVÍO
            if (formularioValido) {
                // Cambia el boton
                const boton = formulario.querySelector('.btn__blue');
                boton.textContent = 'Enviando...';
                boton.disabled = true;

                // Simulación de envío exitoso tras 1.5 segundos
                setTimeout(() => {
                    alert(`¡Gracias ${inputNombre.value}! Tu mensaje ha sido enviado con éxito. Te responderemos pronto.`);
                    
                    // Reseteamos el formulario y restauramos el botón
                    formulario.reset();
                    boton.textContent = 'Enviar';
                    boton.disabled = false;
                }, 1500);
            }
        });
    }


    // Función para validar la estructura del e-mail usando expresiones regulares
    function validarFormatoEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Función para inyectar un mensaje de error visual debajo del input correspondiente
    function mostrarError(elemento, mensaje) {
        elemento.style.borderColor = '#e74c3c'; 
        
        const errorMensaje = document.createElement('span');
        errorMensaje.className = 'error-text';
        errorMensaje.textContent = mensaje;
        errorMensaje.style.color = '#e74c3c';
        errorMensaje.style.fontSize = '0.85rem';
        errorMensaje.style.marginTop = '4px';
        errorMensaje.style.display = 'block';

        // Insertamos el mensaje justo debajo del input dañado
        elemento.insertAdjacentElement('afterend', errorMensaje);
    }

    // Función para borrar los mensajes de error anteriores y restablecer los bordes
    function removerErrores() {
        const erroresActivos = document.querySelectorAll('.error-text');
        erroresActivos.forEach(error => error.remove());

        const inputsAfectados = document.querySelectorAll('.formulario-contacto input, .formulario-contacto textarea');
        inputsAfectados.forEach(input => input.style.borderColor = '');
    }
});