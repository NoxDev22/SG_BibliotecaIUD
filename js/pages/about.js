// --- REDIRECCIÓN DE BOTONES DE RESERVA ---
// Seleccionamos el botón de la introducción y el botón de asistencia al final
const botonReservaIntro = document.querySelector('.reserve_button');
const botonAsistencia = document.querySelector('.asistance_button');

// Función única para redirigir a la página de reservas
const redirigirAReserva = () => {
    window.location.href = './reserva.html';
};

// Asignamos el evento de clic a ambos botones si existen en la página
if (botonReservaIntro) {
    botonReservaIntro.addEventListener('click', redirigirAReserva);
}

if (botonAsistencia) {
    botonAsistencia.addEventListener('click', redirigirAReserva);
}


// --- DESPLAZAMIENTO SUAVE A "NUESTRA MISIÓN" ---
const botonMision = document.querySelector('.mission_button');
// Buscamos el contenedor de la sección misión para hacer el foco ahí
const seccionMision = document.querySelector('.target .mission');

if (botonMision && seccionMision) {
    botonMision.addEventListener('click', () => {
        // Lleva al usuario suavemente hasta la sección
        seccionMision.scrollIntoView({ 
            behavior: 'smooth', // Hace que el movimiento sea fluido y no un salto brusco
            block: 'center'     // Centra la sección en la pantalla al terminar el scroll
        });
    });
}
