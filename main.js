//2 ACCEDEMOS AL FORMULARIO Y A TODOS LOS INPUTS DEL FORMULARIO, SON TOMADOS COMO ARREGLO, el ultimo elemento de un objeto no lleva coma
//LA COMPROBACION DE CADA INPUT ES AL DAR CLIC DENTRO PERO TAMBIEN AL DAR CLIC AFUERA POR ESO EL EVENTO BLUR
const formulario = document.getElementById('formulario');
//accedemos a todos los inputs del id formulario
const inputs = document.querySelectorAll('#formulario input');
//1 EL OBJETO DE LAS EXPRESIONES CON VARIAS PROPIEDADES
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

//de inicio todos los campos son ivalidos
//porque si se da clic en enviar sin rellenar los campos se debe marcar error por eso todos inician en falso
const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	//usamos e para .target.name para acceder por el nombre a los inputs
	//la comparacion se hace con las expresiones regulares
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		//accedemos al objeto campos y validamos el elemento q se le pasa, en este caso al  q hace referencia la palabra campo
		//cuando evaluamos q todo esta correcto debe estar en true, ya que cuando la validacion de la expresion en el if  es correcta
		//en cada una de las validaciones, campo que se refiere a cada input cambia a true, siguiendo la logica de la validacion que se hace con el if 
		campos[campo] = true;
		//como campos inicia con todos sus elementos en false par que no se envien mal tiene q cambiarse aqui a true pero de manera dinamica
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		//cuando esta incorrecto es false
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		//aqui no tenemos un campo y directamente se cambia a false password si es incorrecta
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		//y  aqui cambia a true porque la password es verdadero
		campos['password'] = true;
	}
}
//por cada uno de los inputs se ejecuttan los eventos keyup y blur
inputs.forEach((input) => {
    //llamado a las funciones desde los eventos, los eventos son al presionar tecla
	//la linea de abajo significa que por cada inputle agregamos un evento en este caso dos
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
//cuando se de clic al boton de submit se validaran los campos. 
formulario.addEventListener('submit', (e) => {
	//aqui se empieza por asegurar que no se envie el formulario si esta erroneo
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	//aqui otra vez usamos el objeto campos con sus atributos para hacer referencia a cada input del formulario
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		//si todos los campos estan correctos el formulario se resetea
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		//agregamos el mensaje de exito y luego le ponemos un intervalo de tiempo para q desaparezca
		setTimeout(() => {
			//removemos la clase en el setTimeout
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 3000);
		//para quitar todos los iconos despues de enviar el formulario
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
		//aqui removemos el mensaje de error
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');


	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});

