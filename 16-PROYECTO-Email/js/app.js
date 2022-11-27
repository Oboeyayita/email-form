//Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector ('#resetBtn');

const formulario = document.querySelector('#enviar-mail');

//Variables for each id
const email = document.querySelector('#email');
const subject = document.querySelector('#asunto');
const message = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventListeners();
function eventListeners() {
    //cuando la app arranca
    document.addEventListener('DOMcontentLoaded', inicirApp);

    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //to reset form listener
    resetBtn.addEventListener('click', resetearFormulario); 

    //enviar email 
    formulario.addEventListener('submit', enviarEmail);

}


//function
function inicirApp() {
    btnEnviar.disabled = true; 
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//valida el formulario
function validarFormulario(e) {

    if(e.target.value.length > 0) {

        //elimina los errores
        const error = document.querySelector('p.error');
        if (error){
        error.remove();
        }
        


        
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        //console.log('Si hay algo')
    } else {
        //e.target.style.borderBottomColor = 'red';
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        //const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        if (er.test(e.target.value) ){
//pase from previous
            const error = document.querySelector('p.error');

            if (error){ 
                error.remove();
                }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
            console.log('Email is valid')
         } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email is not valid');
            
         }
        //console.log('Es email, hay que validarlo diferente');
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false; 
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

//funcion para monstrar error

function mostrarError(mensaje) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
  
  const errores = document.querySelectorAll('.error');
  if(errores.length ===0) {
  formulario.appendChild(mensajeError);
    }
  }

  //ENVIA EL EMAL

  function enviarEmail(e) {
    e.preventDefault();
    //console.log('enviando..')

    //mostrar spinner

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    //despues de 3 segundo ocultar el spinner y mostrar el mensaje

    setTimeout(() => {
        spinner.style.display = 'none';
        //console.log('Esta funcion se ejecuta despues de 3 segundos')
         
        const paragraph = document.createElement('p');
        //mensaje de que se envio
        paragraph.textContent = 'Message was sent Succesfully';
        paragraph.classList.add('tex-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold',  'uppercase')
        formulario.insertBefore(paragraph, spinner); 

        setTimeout (()=> {
            paragraph.remove();//to delete message
            resetearFormulario();
        }, 3000);
    }, 3000);
  }

  //funcion para reseat the form 

  function resetearFormulario() {
    formulario.reset();
    iniciarApp();
  }